import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface ExtendedSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions) as ExtendedSession | null;
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    console.log("Received formData:", Array.from(formData.entries()));

    const image = formData.get("profileImage") as File | null;
    const nss = formData.get("socialSecurityNumber") as string | null;
    const id = formData.get("id") as string;
    let imageUrl: string | null = null;
    if (image && nss) {
      const uploadForm = new FormData();
      uploadForm.append("image", image);
      uploadForm.append("nss", nss);

      const response = await fetch(`${process.env.LOCAL_IP}/upload`, {
        method: "POST",
        body: uploadForm,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error uploading image:", errorText);
        return NextResponse.json({ error: `Failed to upload image: ${errorText}` }, { status: response.status });
      }

      const uploadResult = await response.json();
      imageUrl = uploadResult.imageUrl;
    }

    const updateData: Record<string, any> = Object.fromEntries(formData.entries());

    delete updateData.id;

    if (imageUrl) {
      updateData.profileImageUrl = imageUrl;
    }

    // Actualiza las relaciones correctamente
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        name: updateData.name,
        socialSecurityNumber: updateData.socialSecurityNumber,
        CURP: updateData.CURP,
        RFC: updateData.RFC,
        address: updateData.address,
        phoneNumber: updateData.phoneNumber,
        email: updateData.email,
        birthDate: new Date(updateData.birthDate),
        hireDate: new Date(updateData.hireDate),
        emergencyContact: updateData.emergencyContact,
        emergencyPhone: updateData.emergencyPhone,
        maritalStatus: updateData.maritalStatus,
        nationality: updateData.nationality,
        educationLevel: updateData.educationLevel,
        gender: updateData.gender,
        bloodType: updateData.bloodType,
        profileImageUrl: updateData.profileImageUrl,
        company: {
          connect: { id: updateData.companyId },
        },
        role: {
          connect: { id: updateData.roleId },
        },
        department: {
          connect: { id: updateData.departmentId },
        },
        jobTitle: {
          connect: { id: updateData.jobTitleId },
        },
        workShift: {
          connect: { id: updateData.workShiftId },
        },
        contractType: {
          connect: { id: updateData.contractTypeId },
        },
      },
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

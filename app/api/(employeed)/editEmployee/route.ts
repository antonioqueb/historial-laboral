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

    if (!updateData.profileImage || Object.keys(updateData.profileImage).length === 0) {
      delete updateData.profileImage;
    }

    if (typeof updateData.birthDate === 'string' && updateData.birthDate) {
      updateData.birthDate = new Date(updateData.birthDate).toISOString();
    }
    if (typeof updateData.hireDate === 'string' && updateData.hireDate) {
      updateData.hireDate = new Date(updateData.hireDate).toISOString();
    }

    delete updateData.company;
    delete updateData.description;
    delete updateData.bankAccountNumber;
    delete updateData.clabeNumber;

    const updatedEmployee = await prisma.employee.update({
      where: { id: id as string },
      data: {
        ...updateData,
        jobTitle: { connect: { id: updateData.jobTitle } },
        workShift: { connect: { id: updateData.workShift } },
        contractType: { connect: { id: updateData.contractType } },
        role: { connect: { id: updateData.role } },
        department: { connect: { id: updateData.department } },
      },
    });

    console.log("Updated employee:", updatedEmployee);

    return NextResponse.json({ employee: updatedEmployee }, { status: 200 });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

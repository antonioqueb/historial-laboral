import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Define the type for the session with the user ID
interface ExtendedSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  companyId: string;
  socialSecurityNumber: string;
  CURP: string;
  RFC: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  hireDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  maritalStatus: string;
  nationality: string;
  educationLevel: string;
  gender: string;
  bloodType: string;
  jobTitle: {
    id: string;
    name: string;
  };
  workShift: {
    id: string;
    name: string;
  };
  contractType: {
    id: string;
    name: string;
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
      console.log("Image URL from upload:", imageUrl);
    }

    const updateData: Record<string, any> = Object.fromEntries(formData.entries());
    console.log("Initial updateData:", updateData);
    
    delete updateData.id; // Remove id from update data as it should not be updated

    if (imageUrl) {
      updateData.profileImageUrl = imageUrl;
    }

    // Remove profileImage if it is empty or invalid
    if (!updateData.profileImage || Object.keys(updateData.profileImage).length === 0) {
      delete updateData.profileImage;
    }

    // Convertir fechas a ISO 8601 asegurando que son strings
    if (typeof updateData.birthDate === 'string' && updateData.birthDate) {
      updateData.birthDate = new Date(updateData.birthDate).toISOString();
    }
    if (typeof updateData.hireDate === 'string' && updateData.hireDate) {
      updateData.hireDate = new Date(updateData.hireDate).toISOString();
    }

    console.log("Processed updateData before deleting unwanted fields:", updateData);

    // Eliminar campos que no deberían ser actualizados
    delete updateData.company;
    delete updateData.description; // Eliminar description del objeto de actualización
    delete updateData.bankAccountNumber; // Eliminar bankAccountNumber del objeto de actualización
    delete updateData.clabeNumber; // Eliminar clabeNumber del objeto de actualización

    console.log("Final updateData to be sent to Prisma:", updateData);

    const updatedEmployee = await prisma.employee.update({
      where: { id: id as string },
      data: updateData,
    });

    console.log("Updated employee:", updatedEmployee);

    return NextResponse.json({ employee: updatedEmployee }, { status: 200 });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

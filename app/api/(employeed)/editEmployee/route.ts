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

    // Subida de la imagen si existe
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

    // Convertir y preparar los datos de actualización
    const updateData: Record<string, any> = Object.fromEntries(formData.entries());

    // Conversión de fechas
    if (updateData.birthDate) updateData.birthDate = new Date(updateData.birthDate);
    if (updateData.hireDate) updateData.hireDate = new Date(updateData.hireDate);

    const {
      role,
      department,
      jobTitle,
      workShift,
      contractType,
      companyId,
      profileImage, // Excluir el archivo de la actualización en Prisma
      ...restUpdateData
    } = updateData;

    const dataToUpdate: any = {
      ...restUpdateData,
      profileImageUrl: imageUrl || null,  // Asignación de la URL de la imagen o null
      company: {
        connect: { id: companyId }
      }
    };

    // Conexión de las relaciones
    if (role) dataToUpdate.role = { connect: { id: role } };
    if (department) dataToUpdate.department = { connect: { id: department } };
    if (jobTitle) dataToUpdate.jobTitle = { connect: { id: jobTitle } };
    if (workShift) dataToUpdate.workShift = { connect: { id: workShift } };
    if (contractType) dataToUpdate.contractType = { connect: { id: contractType } };

    // Realización de la actualización en Prisma
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

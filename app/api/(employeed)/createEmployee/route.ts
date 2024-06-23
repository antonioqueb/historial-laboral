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

export async function POST(req: Request) {
  const session = await getServerSession(authOptions) as ExtendedSession | null;
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const nss = formData.get("socialSecurityNumber") as string | null;

    console.log("Form Data:", formData);
    console.log("Image:", image);
    console.log("NSS:", nss);

    let imageUrl: string | null = null;
    if (image && nss) {
      const uploadForm = new FormData();
      uploadForm.append("image", image);
      uploadForm.append("nss", nss);

      const response = await fetch("http://192.168.1.69:3008/upload", {
        method: "POST",
        body: uploadForm,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json({ error: `Failed to upload image: ${errorText}` }, { status: response.status });
      }

      const uploadResult = await response.json();
      imageUrl = uploadResult.imageUrl;
      console.log("Image URL from upload:", imageUrl);
    }

    const {
      name,
      role,
      department,
      description,
      companyId,
      CURP,
      RFC,
      address,
      phoneNumber,
      email,
      birthDate,
      hireDate,
      emergencyContact,
      emergencyPhone,
      bankAccountNumber,
      clabeNumber,
      maritalStatus,
      nationality,
      educationLevel,
      gender,
      bloodType,
      jobTitle,
      workShift,
      contractType,
    } = Object.fromEntries(formData.entries());

    console.log("Profile Image URL to be saved:", imageUrl);

    // Crear el empleado
    const employee = await prisma.employee.create({
      data: {
        name: name as string,
        role: role as string,
        department: department as string,
        description: description as string,
        companyId: companyId as string,
        socialSecurityNumber: nss as string,
        CURP: CURP as string,
        RFC: RFC as string,
        address: address as string,
        phoneNumber: phoneNumber as string,
        email: email as string,
        birthDate: new Date(birthDate as string),
        hireDate: new Date(hireDate as string),
        emergencyContact: emergencyContact as string,
        emergencyPhone: emergencyPhone as string,
        bankAccountNumber: bankAccountNumber as string,
        clabeNumber: clabeNumber as string,
        maritalStatus: maritalStatus as string,
        nationality: nationality as string,
        educationLevel: educationLevel as string,
        gender: gender as string,
        bloodType: bloodType as string,
        jobTitle: jobTitle as string,
        workShift: workShift as string,
        contractType: contractType as string,
        profileImageUrl: imageUrl as string, // Guardar la URL de la imagen
      },
    });

    return NextResponse.json({ employee }, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

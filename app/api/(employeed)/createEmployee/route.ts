import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import FormData from "form-data";

// Define the type for the session with the user ID
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
    const image = formData.get("image") as File;
    const nss = formData.get("socialSecurityNumber") as string;

    // Subir la imagen al servidor
    const form = new FormData();
    form.append("image", image);
    form.append("nss", nss);

    const response = await fetch("http://192.168.1.69:3008/upload", {
      method: "POST",
      body: form,
    });

    const { imageUrl } = await response.json();

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
        profileImageUrl: imageUrl,
      },
    });

    return NextResponse.json({ employee }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

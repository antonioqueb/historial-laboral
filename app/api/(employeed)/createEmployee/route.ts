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
    console.log("Received form data:", Object.fromEntries(formData));
    const image = formData.get("profileImage") as File | null;
    const nss = formData.get("socialSecurityNumber") as string | null;

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
        return NextResponse.json({ error: `Failed to upload image: ${errorText}` }, { status: response.status });
      }

      const uploadResult = await response.json();
      imageUrl = uploadResult.imageUrl;
    }

    const {
      name,
      role,
      department,
      description, // description opcional
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

    // Verificar que jobTitle exista
    const jobTitleExists = await prisma.jobTitle.findUnique({
      where: { id: jobTitle as string },
    });

    if (!jobTitleExists) {
      return NextResponse.json({ error: `JobTitle with id ${jobTitle} does not exist` }, { status: 400 });
    }

    // Verificar que workShift exista
    const workShiftExists = await prisma.workShift.findUnique({
      where: { id: workShift as string },
    });

    if (!workShiftExists) {
      return NextResponse.json({ error: `WorkShift with id ${workShift} does not exist` }, { status: 400 });
    }

    // Verificar que contractType exista
    const contractTypeExists = await prisma.contractType.findUnique({
      where: { id: contractType as string },
    });

    if (!contractTypeExists) {
      return NextResponse.json({ error: `ContractType with id ${contractType} does not exist` }, { status: 400 });
    }

    const employeeData: any = {
      name: name as string,
      role: role as string,
      department: department as string,
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
      jobTitle: { connect: { id: jobTitle as string } },
      workShift: { connect: { id: workShift as string } },
      contractType: { connect: { id: contractType as string } },
      profileImageUrl: imageUrl as string, // Guardar la URL de la imagen...
      company: {
        connect: {
          id: companyId as string,
        }
      }
    };

    if (description) {
      employeeData.description = description as string;
    }
    console.log("Employee data to be created:", employeeData);
    const employee = await prisma.employee.create({
      data: employeeData,
    });

    return NextResponse.json({ employee }, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

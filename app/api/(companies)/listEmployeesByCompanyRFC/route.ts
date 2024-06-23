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

export async function GET(req: Request) {
  const session = await getServerSession(authOptions) as ExtendedSession | null;
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const companyRFC = url.searchParams.get("rfc");

  if (!companyRFC) {
    return NextResponse.json({ error: "RFC is required" }, { status: 400 });
  }

  try {
    // Obtener los empleados de la empresa por RFC
    const employees = await prisma.employee.findMany({
      where: {
        company: {
          rfc: companyRFC
        }
      },
      select: {
        id: true,
        name: true,
        role: true,
        department: true,
        description: true,
        companyId: true,
        socialSecurityNumber: true,
        CURP: true,
        RFC: true,
        address: true,
        phoneNumber: true,
        email: true,
        birthDate: true,
        hireDate: true,
        emergencyContact: true,
        emergencyPhone: true,
        bankAccountNumber: true,
        clabeNumber: true,
        maritalStatus: true,
        nationality: true,
        educationLevel: true,
        gender: true,
        bloodType: true,
        jobTitle: true,
        workShift: true,
        contractType: true,
        profileImageUrl: true, // Añadir el campo profileImageUrl
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json({ employees }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

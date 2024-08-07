// app\api\(employeed)\getEmployeeByNss\route.ts
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
  const socialSecurityNumber = url.searchParams.get("nss");

  if (!socialSecurityNumber) {
    return NextResponse.json({ error: "Social Security Number is required" }, { status: 400 });
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        socialSecurityNumber: socialSecurityNumber,
      },
      select: {
        id: true,
        name: true,
        role: {
          select: {
            id: true,
            name: true
          }
        },
        department: {
          select: {
            id: true,
            name: true
          }
        },
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
        maritalStatus: true,
        nationality: true,
        educationLevel: true,
        gender: true,
        bloodType: true,
        jobTitle: {
          select: {
            id: true,
            name: true
          }
        },
        workShift: {
          select: {
            id: true,
            name: true
          }
        },
        contractType: {
          select: {
            id: true,
            name: true
          }
        },
        profileImageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    const headers = new Headers();
    headers.append('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    headers.append('Surrogate-Control', 'no-store');

    return new NextResponse(JSON.stringify({ employee }), { headers });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message || "Internal Server Error" }, { status: 500 });
  }
}

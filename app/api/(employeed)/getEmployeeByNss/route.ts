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
  console.log("Starting GET request for employee details");

  const session = await getServerSession(authOptions) as ExtendedSession | null;
  console.log("Session:", session);

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const socialSecurityNumber = url.searchParams.get("nss");
  console.log("Social Security Number:", socialSecurityNumber);

  if (!socialSecurityNumber) {
    console.log("Social Security Number is missing in request");
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
      console.log("Employee not found");
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    console.log("Employee data:", employee);

    const headers = new Headers();
    headers.append('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    headers.append('Surrogate-Control', 'no-store');

    return new NextResponse(JSON.stringify({ 
      employee: {
        id: employee.id,
        name: employee.name,
        role: employee.role ? employee.role.name : null,
        department: employee.department ? employee.department.name : null,
        companyId: employee.companyId,
        socialSecurityNumber: employee.socialSecurityNumber,
        CURP: employee.CURP,
        RFC: employee.RFC,
        address: employee.address,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
        birthDate: employee.birthDate,
        hireDate: employee.hireDate,
        emergencyContact: employee.emergencyContact,
        emergencyPhone: employee.emergencyPhone,
        maritalStatus: employee.maritalStatus,
        nationality: employee.nationality,
        educationLevel: employee.educationLevel,
        gender: employee.gender,
        bloodType: employee.bloodType,
        jobTitle: employee.jobTitle ? employee.jobTitle.name : null,
        workShift: employee.workShift ? employee.workShift.name : null,
        contractType: employee.contractType ? employee.contractType.name : null,
        profileImageUrl: employee.profileImageUrl,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt
      } 
    }), { headers });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json({ error: (error as any).message || "Internal Server Error" }, { status: 500 });
  }
}

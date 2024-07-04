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

    // Disable caching by adding cache-control headers
    const headers = new Headers();
    headers.append('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    headers.append('Surrogate-Control', 'no-store');

    return new NextResponse(JSON.stringify({ employee }), { headers });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

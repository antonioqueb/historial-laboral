// app\api\(employeed)\listEmployeesByCompanyRFC
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
  console.log("Starting GET request");

  const session = await getServerSession(authOptions) as ExtendedSession | null;
  console.log("Session:", session);

  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const companyRFC = url.searchParams.get("rfc");
  console.log("Company RFC:", companyRFC);

  if (!companyRFC) {
    console.log("RFC is missing in request");
    return NextResponse.json({ error: "RFC is required" }, { status: 400 });
  }

  try {
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
        profileImageUrl: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    console.log("Employees data:", employees);

    // Disable caching by adding cache-control headers
    const headers = new Headers();
    headers.append('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    headers.append('Surrogate-Control', 'no-store');

    return new NextResponse(JSON.stringify({ employees }), { headers });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

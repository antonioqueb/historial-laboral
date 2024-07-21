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

  // Obtener la sesión actual
  const session = await getServerSession(authOptions) as ExtendedSession | null;
  console.log("Session:", session);

  // Verificar si la sesión es válida
  if (!session || !session.user || !session.user.id) {
    console.log("Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Obtener el NSS (Número de Seguridad Social) de los parámetros de consulta
  const url = new URL(req.url);
  const socialSecurityNumber = url.searchParams.get("nss");
  console.log("Social Security Number:", socialSecurityNumber);

  // Validar que el NSS esté presente
  if (!socialSecurityNumber) {
    console.log("Social Security Number is missing in request");
    return NextResponse.json({ error: "Social Security Number is required" }, { status: 400 });
  }

  try {
    // Buscar el empleado en la base de datos
    const employee = await prisma.employee.findUnique({
      where: {
        socialSecurityNumber: socialSecurityNumber,
      },
      select: {
        id: true,
        name: true,
        role: true,
        department: true,
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

    // Si no se encuentra el empleado, retornar un error 404
    if (!employee) {
      console.log("Employee not found");
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    console.log("Employee data:", employee);

    // Deshabilitar la caché añadiendo encabezados de control de caché
    const headers = new Headers();
    headers.append('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    headers.append('Surrogate-Control', 'no-store');

    // Retornar los datos del empleado
    return new NextResponse(JSON.stringify({ employee }), { headers });
  } catch (error) {
    // Manejo de errores con más detalles
    console.error("Error fetching employee:", error);
    return NextResponse.json({ error: (error as any).message || "Internal Server Error" }, { status: 500 });
  }
}

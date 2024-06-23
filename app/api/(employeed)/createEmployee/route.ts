// app\api\(employed)\createEmployee\route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


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
          const body = await req.json();
          const {
              name,
              role,
              department,
              description,
              companyId,
              socialSecurityNumber,
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
            
          } = body;
  
          // Crear el empleado
          const employee = await prisma.employee.create({
              data: {
                  name,
                  role,
                  department,
                  description,
                  companyId,
                  socialSecurityNumber,
                  CURP,
                  RFC,
                  address,
                  phoneNumber,
                  email,
                  birthDate: new Date(birthDate),
                  hireDate: new Date(hireDate),
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
              },
          });
  
          return NextResponse.json({ employee }, { status: 201 });
      } catch (error) {
          return NextResponse.json({ error: (error as any).message }, { status: 500 });
      }
  }
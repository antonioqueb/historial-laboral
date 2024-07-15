import { NextResponse } from 'next/server'; // Importa NextResponse para manejar respuestas en Next.js
import { PrismaClient } from '@prisma/client'; // Importa PrismaClient para interactuar con la base de datos

const prisma = new PrismaClient(); // Crea una instancia de PrismaClient para realizar consultas a la base de datos

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Extrae los parámetros de búsqueda de la URL de la solicitud
  const nss = searchParams.get('nss'); // Obtiene el número de seguro social (NSS) del parámetro de búsqueda

  // Verifica si el NSS fue proporcionado
  if (!nss) {
    return NextResponse.json({ error: 'Número de seguro social (NSS) es requerido' }, { status: 400 }); // Responde con un error si el NSS no está presente
  }

  try {
    // Busca el empleado en la base de datos utilizando el NSS proporcionado
    const employee = await prisma.employee.findUnique({
      where: { socialSecurityNumber: nss }, // Condición de búsqueda por NSS
      include: { // Incluye relaciones y campos adicionales en la consulta
        reviewsReceived: {
          include: {
            company: true, // Incluye la información de la empresa en cada reseña recibida
          }
        },
        jobTitle: true, // Incluye la información del puesto de trabajo del empleado
        workShift: true, // Incluye la información del turno de trabajo del empleado
        contractType: true, // Incluye la información del tipo de contrato del empleado
        company: true, // Incluye la información de la empresa a la que pertenece el empleado
        employeeDepartments: true // Incluye la relación del empleado con los departamentos
      }
    });

    // Verifica si el empleado fue encontrado
    if (!employee) {
      return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 }); // Responde con un error si el empleado no fue encontrado
    }

    // Responde con los datos completos del empleado
    return NextResponse.json({ 
      employee: {
        name: employee.name,
        role: employee.role,
        department: employee.department,
        birthDate: employee.birthDate,
        hireDate: employee.hireDate,
        nationality: employee.nationality,
        educationLevel: employee.educationLevel,
        gender: employee.gender,
        jobTitle: employee.jobTitle,
        workShift: employee.workShift,
        profileImageUrl: employee.profileImageUrl,
        reviewsReceived: employee.reviewsReceived,
        employeeDepartments: employee.employeeDepartments
      }
    }, { status: 200 }); // Responde con un objeto JSON que contiene todos los datos del empleado
  } catch (error) {
    console.error(error); // Imprime el error en la consola para depuración
    return NextResponse.json({ error: 'Error al obtener los datos del empleado' }, { status: 500 }); // Responde con un error en caso de fallo en la consulta
  }
}

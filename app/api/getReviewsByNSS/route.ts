import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nss = searchParams.get('nss');

  if (!nss) {
    return NextResponse.json({ error: 'Número de seguro social (NSS) es requerido' }, { status: 400 });
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: { socialSecurityNumber: nss },
      include: {
        reviewsReceived: {
          include: {
            company: true, // Incluir la información de la empresa en la reseña
          }
        }
      }
    });

    if (!employee) {
      return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ reviews: employee.reviewsReceived }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener las reseñas' }, { status: 500 });
  }
}

// app\api\(cat)\WorkShift\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler para crear un nuevo turno de trabajo
export async function POST(req: NextRequest) {
  try {
    const rfc = req.nextUrl.searchParams.get('rfc');
    const { name } = await req.json();

    if (!rfc) {
      return NextResponse.json({ error: 'RFC is required' }, { status: 400 });
    }

    const company = await prisma.company.findUnique({
      where: { rfc: rfc as string },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const newWorkShift = await prisma.workShift.create({
      data: {
        name,
        companies: {
          connect: { id: company.id },
        },
      },
    });
    return NextResponse.json(newWorkShift, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating work shift' }, { status: 500 });
  }
}

// Handler para editar un turno de trabajo existente
export async function PUT(req: NextRequest) {
  try {
    const rfc = req.nextUrl.searchParams.get('rfc');
    const { id, name } = await req.json();

    if (!rfc) {
      return NextResponse.json({ error: 'RFC is required' }, { status: 400 });
    }

    const company = await prisma.company.findUnique({
      where: { rfc: rfc as string },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const updatedWorkShift = await prisma.workShift.updateMany({
      where: { id, companies: { some: { id: company.id } } },
      data: { name },
    });

    if (updatedWorkShift.count === 0) {
      return NextResponse.json({ error: 'Work shift not found for the specified RFC' }, { status: 404 });
    }

    return NextResponse.json(updatedWorkShift, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating work shift' }, { status: 500 });
  }
}

// Handler para eliminar un turno de trabajo existente
export async function DELETE(req: NextRequest) {
  try {
    const rfc = req.nextUrl.searchParams.get('rfc');
    const { id } = await req.json();

    if (!rfc) {
      return NextResponse.json({ error: 'RFC is required' }, { status: 400 });
    }

    const company = await prisma.company.findUnique({
      where: { rfc: rfc as string },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const deletedWorkShift = await prisma.workShift.deleteMany({
      where: { id, companies: { some: { id: company.id } } },
    });

    if (deletedWorkShift.count === 0) {
      return NextResponse.json({ error: 'Work shift not found for the specified RFC' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Work shift deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting work shift' }, { status: 500 });
  }
}

// Handler para obtener todos los turnos de trabajo de una empresa
export async function GET(req: NextRequest) {
  try {
    const rfc = req.nextUrl.searchParams.get('rfc');

    if (!rfc) {
      return NextResponse.json({ error: 'RFC is required' }, { status: 400 });
    }

    const company = await prisma.company.findUnique({
      where: { rfc: rfc as string },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const workShifts = await prisma.workShift.findMany({
      where: { companies: { some: { id: company.id } } },
    });

    return NextResponse.json(workShifts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching work shifts' }, { status: 500 });
  }
}

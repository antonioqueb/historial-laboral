// app\api\(cat)\Department\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler para crear un nuevo departamento
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

    const newDepartment = await prisma.department.create({
      data: {
        name,
        companies: {
          connect: { id: company.id },
        },
      },
    });
    return NextResponse.json(newDepartment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating department' }, { status: 500 });
  }
}

// Handler para editar un departamento existente
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

    const updatedDepartment = await prisma.department.updateMany({
      where: { id, companies: { some: { id: company.id } } },
      data: { name },
    });

    if (updatedDepartment.count === 0) {
      return NextResponse.json({ error: 'Department not found for the specified RFC' }, { status: 404 });
    }

    return NextResponse.json(updatedDepartment, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating department' }, { status: 500 });
  }
}

// Handler para eliminar un departamento existente
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

    const deletedDepartment = await prisma.department.deleteMany({
      where: { id, companies: { some: { id: company.id } } },
    });

    if (deletedDepartment.count === 0) {
      return NextResponse.json({ error: 'Department not found for the specified RFC' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Department deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting department' }, { status: 500 });
  }
}

// Handler para obtener todos los departamentos de una empresa
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

    const departments = await prisma.department.findMany({
      where: { companies: { some: { id: company.id } } },
    });

    return NextResponse.json(departments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching departments' }, { status: 500 });
  }
}

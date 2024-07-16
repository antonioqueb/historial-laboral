// app\api\(cat)\JobTitle\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler para crear un nuevo título de trabajo
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

    const newJobTitle = await prisma.jobTitle.create({
      data: {
        name,
        companies: {
          connect: { id: company.id },
        },
      },
    });
    return NextResponse.json(newJobTitle, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating job title' }, { status: 500 });
  }
}

// Handler para editar un título de trabajo existente
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

    const updatedJobTitle = await prisma.jobTitle.updateMany({
      where: { id, companies: { some: { id: company.id } } },
      data: { name },
    });

    if (updatedJobTitle.count === 0) {
      return NextResponse.json({ error: 'Job title not found for the specified RFC' }, { status: 404 });
    }

    return NextResponse.json(updatedJobTitle, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating job title' }, { status: 500 });
  }
}

// Handler para eliminar un título de trabajo existente
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

    const deletedJobTitle = await prisma.jobTitle.deleteMany({
      where: { id, companies: { some: { id: company.id } } },
    });

    if (deletedJobTitle.count === 0) {
      return NextResponse.json({ error: 'Job title not found for the specified RFC' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Job title deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting job title' }, { status: 500 });
  }
}

// Handler para obtener todos los títulos de trabajo de una empresa
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

    const jobTitles = await prisma.jobTitle.findMany({
      where: { companies: { some: { id: company.id } } },
    });

    return NextResponse.json(jobTitles, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching job titles' }, { status: 500 });
  }
}

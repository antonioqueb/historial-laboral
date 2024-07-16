// app\api\(cat)\ContractType\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler para crear un nuevo tipo de contrato
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

    const newContractType = await prisma.contractType.create({
      data: {
        name,
        companies: {
          connect: { id: company.id },
        },
      },
    });
    return NextResponse.json(newContractType, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating contract type' }, { status: 500 });
  }
}

// Handler para editar un tipo de contrato existente
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

    const updatedContractType = await prisma.contractType.updateMany({
      where: { id, companies: { some: { id: company.id } } },
      data: { name },
    });

    if (updatedContractType.count === 0) {
      return NextResponse.json({ error: 'Contract type not found for the specified RFC' }, { status: 404 });
    }

    return NextResponse.json(updatedContractType, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating contract type' }, { status: 500 });
  }
}

// Handler para eliminar un tipo de contrato existente
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

    const deletedContractType = await prisma.contractType.deleteMany({
      where: { id, companies: { some: { id: company.id } } },
    });

    if (deletedContractType.count === 0) {
      return NextResponse.json({ error: 'Contract type not found for the specified RFC' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Contract type deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting contract type' }, { status: 500 });
  }
}

// Handler para obtener todos los tipos de contrato de una empresa
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

    const contractTypes = await prisma.contractType.findMany({
      where: { companies: { some: { id: company.id } } },
    });

    return NextResponse.json(contractTypes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching contract types' }, { status: 500 });
  }
}

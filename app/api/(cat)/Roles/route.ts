import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler to create a new role
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

    const newRole = await prisma.role.create({
      data: {
        name,
        companies: {
          connect: { rfc: rfc as string },
        },
      },
    });
    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating role' }, { status: 500 });
  }
}

// Handler to edit an existing role
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

    const updatedRole = await prisma.role.updateMany({
      where: { id, companies: { some: { rfc: rfc as string } } },
      data: { name },
    });

    if (updatedRole.count === 0) {
      return NextResponse.json({ error: 'Role not found for the specified RFC' }, { status: 404 });
    }

    return NextResponse.json(updatedRole, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating role' }, { status: 500 });
  }
}

// Handler to delete an existing role
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

    const deletedRole = await prisma.role.deleteMany({
      where: { id, companies: { some: { rfc: rfc as string } } },
    });

    if (deletedRole.count === 0) {
      return NextResponse.json({ error: 'Role not found for the specified RFC' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Role deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting role' }, { status: 500 });
  }
}

// Handler to get all roles of a company
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

    const roles = await prisma.role.findMany({
      where: { companies: { some: { rfc: rfc as string } } },
    });

    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching roles' }, { status: 500 });
  }
}
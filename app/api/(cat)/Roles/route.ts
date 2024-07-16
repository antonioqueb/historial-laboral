import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler para crear un nuevo rol
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    const newRole = await prisma.role.create({
      data: {
        name,
      },
    });
    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating role' }, { status: 500 });
  }
}

// Handler para editar un rol existente
export async function PUT(req: NextRequest) {
  try {
    const { id, name } = await req.json();
    const updatedRole = await prisma.role.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(updatedRole, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating role' }, { status:500 });
  }
}

// Handler para eliminar un rol existente
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.role.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Role deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting role' }, { status: 500 });
  }
}

// Handler para obtener todos los roles
export async function GET() {
  try {
    const roles = await prisma.role.findMany();
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching roles' }, { status: 500 });
  }
}

// app\api\employees\route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions, request);
    
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;
    const { name, role, department, description } = await request.json();

    const newEmployee = await prisma.employee.create({
      data: {
        name,
        role,
        department,
        description,
        userId,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ message: 'Error creating employee', error: error.message }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, email, name } = await request.json();

    if (!userId || !email || !name) {
      return NextResponse.json({ message: 'User ID, email, and name are required' }, { status: 400 });
    }

    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { email, name },
      });

      return NextResponse.json({ message: 'User data updated successfully', user });
    } catch (prismaError: any) {
      console.error('Error updating user data in Prisma', prismaError);
      return NextResponse.json({ message: 'Error updating user data in Prisma', error: prismaError.message }, { status: 500 });
    }
  } catch (jsonError: any) {
    console.error('Error parsing JSON', jsonError);
    return NextResponse.json({ message: 'Error parsing JSON', error: jsonError.message }, { status: 400 });
  }
}

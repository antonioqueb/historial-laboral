import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, imageUrl } = await request.json();

    if (!userId || !imageUrl) {
      return NextResponse.json({ message: 'User ID and Image URL are required' }, { status: 400 });
    }

    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { profileImageUrl: imageUrl },
      });

      return NextResponse.json({ message: 'Profile image URL updated successfully', user });
    } catch (prismaError: any) {
      console.error('Error updating profile image URL in Prisma', prismaError);
      return NextResponse.json({ message: 'Error updating profile image URL in Prisma', error: prismaError.message }, { status: 500 });
    }
  } catch (jsonError: any) {
    console.error('Error parsing JSON', jsonError);
    return NextResponse.json({ message: 'Error parsing JSON', error: jsonError.message }, { status: 400 });
  }
}

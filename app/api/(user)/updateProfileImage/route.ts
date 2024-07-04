import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
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
  } catch (error) {
    console.error('Error updating profile image URL', error);
    return NextResponse.json({ message: 'Error updating profile image URL' }, { status: 500 });
  }
}

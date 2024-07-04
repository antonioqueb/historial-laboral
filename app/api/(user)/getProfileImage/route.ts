import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserId } from '@/utils/fetchData';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { id: userId } = await getUserId();

    if (!userId) {
      return NextResponse.json({ message: 'User ID not found' }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileImageUrl: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ profileImageUrl: user.profileImageUrl }, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile image URL:', error);
    return NextResponse.json({ message: 'Error fetching profile image URL' }, { status: 500 });
  }
}

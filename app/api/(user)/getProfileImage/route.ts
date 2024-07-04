import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserId } from '@/utils/fetchData';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("Fetching user ID...");
    const { id: userId } = await getUserId();

    console.log("User ID fetched:", userId);
    
    if (!userId) {
      console.log("User ID not found");
      return NextResponse.json({ message: 'User ID not found' }, { status: 404 });
    }

    console.log("Fetching user data from database...");
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileImageUrl: true },
    });

    if (!user) {
      console.log("User not found in database");
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log("User data fetched:", user);
    return NextResponse.json({ profileImageUrl: user.profileImageUrl }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching profile image URL:', error);
    return NextResponse.json({ message: 'Error fetching profile image URL', error: error.message }, { status: 500 });
  }
}
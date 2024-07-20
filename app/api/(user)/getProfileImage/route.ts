import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Parsear los parámetros de consulta
    const url = new URL(req.url);
    const userId = url.searchParams.get('id');
    
    if (!userId) {
      return NextResponse.json({ message: 'User ID not found' }, { status: 404 });
    }

    // console.log("Fetching user data from database...");
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileImageUrl: true },
    });

    if (!user) {
      // console.log("User not found in database");
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // console.log("User data fetched:", user);
    return NextResponse.json({ profileImageUrl: user.profileImageUrl }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching profile image URL:', error);
    return NextResponse.json({ message: 'Error fetching profile image URL', error: error.message }, { status: 500 });
  }
}

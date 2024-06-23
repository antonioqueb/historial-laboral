// app/api/(employed)/editEmployee/route.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Define the type for the session with the user ID
interface ExtendedSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions) as ExtendedSession | null;
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        const updatedEmployee = await prisma.employee.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ employee: updatedEmployee }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as any).message }, { status: 500 });
    }
}

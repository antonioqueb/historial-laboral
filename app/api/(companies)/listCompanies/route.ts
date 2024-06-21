// app/api/listCompanies/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../(auth)/auth/[...nextauth]/authOptions";
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

export async function GET(req: Request) {
    const session = await getServerSession(authOptions) as ExtendedSession | null;
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        // Obtener las empresas del usuario
        const companies = await prisma.company.findMany({
            where: { userId: userId },
        });

        return NextResponse.json({ companies }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

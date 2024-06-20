// app/api/createCompany/route.ts
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

export async function POST(req: Request) {
    const session = await getServerSession(authOptions) as ExtendedSession | null;
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Obtener los datos del cuerpo de la solicitud
    const { name } = await req.json();

    // Crear la empresa en la base de datos
    const company = await prisma.company.create({
        data: {
            name: name,
            userId: userId,
        },
    });

    return NextResponse.json({ company }, { status: 201 });
}

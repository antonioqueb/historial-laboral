// app/api/createCompany/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, userId } = await req.json();

    // Crear la empresa en la base de datos
    const company = await prisma.company.create({
        data: {
            name: name,
            userId: userId,
        },
    });

    return NextResponse.json({ company }, { status: 201 });
}

import { getServerSession } from "next-auth";
import { authOptions } from "../../(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Company, Employee } from "@/interfaces/types";

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
            select: { rfc: true } // Seleccionar solo el campo RFC
        });
        type Company = {
            rfc: string;
            // Otros campos que tenga la interfaz de Company
          };

        // Extraer solo los RFCs de las empresas
        const rfcs = companies.map((company: Company) => company.rfc);

        return NextResponse.json({ rfcs }, { status: 200 });
    } catch (error) {
        // Convertir 'error' a tipo 'any'
        return NextResponse.json({ error: (error as any).message }, { status: 500 });
    }
}

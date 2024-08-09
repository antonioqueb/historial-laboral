// app\api\(companies)\getCompanyRFC\route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Company } from "@/interfaces/types";

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
        const companies = await prisma.company.findMany({
            where: { userId: userId },
            select: { 
                id: true,  // Añadir el ID aquí
                rfc: true,
                name: true, 
                domicilioFiscalCalle: true,
                domicilioFiscalNumero: true,
                domicilioFiscalColonia: true,
                domicilioFiscalMunicipio: true,
                domicilioFiscalEstado: true,
                domicilioFiscalCodigoPostal: true,
                nombreComercial: true,
                representanteLegalNombre: true,
                logoUrl: true
            }
        });

        return NextResponse.json({ companies }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as any).message }, { status: 500 });
    }
}

// app\api\(employeed)\createReviews\route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "@/utils/fetchData"; // Asegúrate de ajustar la ruta de acuerdo a tu estructura

const prisma = new PrismaClient();

export async function POST(req: Request) {
    // Crear un objeto "NextAuth" compatible con la request y el response
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Obtener el userId utilizando la función getUserId
    let userId: string;
    try {
        const userIdResponse = await getUserId();
        userId = userIdResponse.id;
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user ID" }, { status: 500 });
    }

    const {
        employeeId,
        companyId,
        title,
        description,
        rating,
        positive,
        documentation
    } = await req.json();

    // Validar que la compañía del usuario que hace la petición sea la misma que está dejando la review
    const userCompany = await prisma.company.findFirst({
        where: {
            id: companyId,
            userId: userId
        }
    });

    if (!userCompany) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Crear la revisión en la base de datos
    const review = await prisma.review.create({
        data: {
            employeeId,
            companyId,
            title,
            description,
            rating,
            positive,
            documentation
        },
    });

    return NextResponse.json({ review }, { status: 201 });
}

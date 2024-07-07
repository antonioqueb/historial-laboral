// /app/api/(companies)/editCompany/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData(); // Obtener los datos del cuerpo de la solicitud
    const rfc = formData.get('rfc'); // Separar el RFC de los datos a actualizar

    if (!rfc) {
        return NextResponse.json({ error: "RFC required" }, { status: 400 });
    }

    const updateData: any = {};
    formData.forEach((value, key) => {
        if (key !== 'logo') {
            updateData[key] = value;
        }
    });

    if (formData.has('logo')) {
        const logo = formData.get('logo') as File;
        const imageData = new FormData();
        imageData.append("image", logo);
        imageData.append("rfc", rfc.toString());
        imageData.append("docType", "logo");

        const response = await fetch("https://cdn-company-images.historiallaboral.com/upload_rfc", {
            method: "POST",
            body: imageData,
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to upload logo" }, { status: 500 });
        }

        const result = await response.json();
        updateData.logoUrl = result.imageUrl;
    }

    try {
        // Buscar la empresa por RFC
        const company = await prisma.company.findUnique({
            where: { rfc: rfc.toString() }
        });

        if (!company) {
            return NextResponse.json({ error: "Company not found" }, { status: 404 });
        }

        // Actualizar la empresa en la base de datos
        const updatedCompany = await prisma.company.update({
            where: { rfc: rfc.toString() },
            data: updateData,
        });

        return NextResponse.json({ company: updatedCompany }, { status: 200 });
    } catch (error) {
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: "Update failed", details: errorMessage }, { status: 500 });
    }
}

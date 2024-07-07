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

    const formData = await req.formData();
    const data: Record<string, FormDataEntryValue> = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const rfc = data.rfc as string;
    if (!rfc) {
        return NextResponse.json({ error: "RFC required" }, { status: 400 });
    }

    const updateData: Record<string, any> = { ...data };
    updateData.capitalSocial = parseFloat(updateData.capitalSocial as string);
    if (typeof updateData.certificaciones === 'string') {
        updateData.certificaciones = (updateData.certificaciones as string).split(',').map(cert => cert.trim());
    }

    if (updateData.logo instanceof File) {
        // Implement your logic to handle file upload and get the URL
        const logoUrl = await uploadFileAndGetUrl(updateData.logo); // Implement this function
        updateData.logoUrl = logoUrl;
        delete updateData.logo;
    }

    delete updateData.rfc;

    try {
        const company = await prisma.company.findUnique({
            where: { rfc }
        });

        if (!company) {
            return NextResponse.json({ error: "Company not found" }, { status: 404 });
        }

        const updatedCompany = await prisma.company.update({
            where: { rfc },
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

// Implementa la función uploadFileAndGetUrl para manejar la subida del archivo
async function uploadFileAndGetUrl(file: File): Promise<string> {
    // Lógica para subir el archivo y obtener la URL
    // Este es un ejemplo placeholder, deberías implementar la lógica real
    return 'https://cdn-company-images.historiallaboral.com/uploads/' + file.name;
}

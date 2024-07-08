// app\api\editCompany\route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadCompanyImage } from "@/utils/fetchData"; // Asegúrate de importar la función correcta

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
        const uploadResult = await uploadCompanyImage(updateData.logo, rfc);
        if (uploadResult.error) {
            return NextResponse.json({ error: `Error uploading image: ${uploadResult.error}` }, { status: 500 });
        }
        updateData.logoUrl = uploadResult.imageUrl;
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

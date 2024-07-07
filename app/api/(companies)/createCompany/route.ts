// /app/api/companies/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const session = await getServerSession({ req, ...authOptions });
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
        name,
        userId,
        razonSocial,
        rfc,
        domicilioFiscalCalle,
        domicilioFiscalNumero,
        domicilioFiscalColonia,
        domicilioFiscalMunicipio,
        domicilioFiscalEstado,
        domicilioFiscalCodigoPostal,
        nombreComercial,
        objetoSocial,
        representanteLegalNombre,
        representanteLegalCurp,
        capitalSocial,
        registrosImss,
        registrosInfonavit,
        giroActividadEconomica,
        certificaciones,
        logo // Nuevo campo para la imagen del logo
    } = await req.json();

    let logoUrl = "";

    if (logo) {
        const formData = new FormData();
        formData.append("image", logo);
        formData.append("rfc", rfc);
        formData.append("docType", "logo");

        const response = await fetch("https://cdn-company-images.historiallaboral.com/upload_rfc", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to upload logo" }, { status: 500 });
        }

        const result = await response.json();
        logoUrl = result.imageUrl;
    }

    const company = await prisma.company.create({
        data: {
            name,
            userId,
            razonSocial,
            rfc,
            domicilioFiscalCalle,
            domicilioFiscalNumero,
            domicilioFiscalColonia,
            domicilioFiscalMunicipio,
            domicilioFiscalEstado,
            domicilioFiscalCodigoPostal,
            nombreComercial,
            objetoSocial,
            representanteLegalNombre,
            representanteLegalCurp,
            capitalSocial,
            registrosImss,
            registrosInfonavit,
            giroActividadEconomica,
            certificaciones,
            logoUrl // Guardamos la URL del logo en la base de datos
        },
    });

    return NextResponse.json({ company }, { status: 201 });
}

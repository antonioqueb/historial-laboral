// /app/api/(companies)/getCompany/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rfc = searchParams.get("rfc");

  if (!rfc) {
    return NextResponse.json({ error: "RFC required" }, { status: 400 });
  }

  try {
    const company = await prisma.company.findUnique({
      where: { rfc }
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: "Failed to fetch company", details: errorMessage }, { status: 500 });
  }
}

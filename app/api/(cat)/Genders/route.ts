// app/api/genders/route.ts
import { NextResponse } from "next/server";

// GET handler para obtener la lista de géneros
export async function GET() {
  const genders = [
    "Masculino",
    "Femenino",
    "No binario",
    "Otro",
    "Agénero",
    "Bigénero",
    "Genderqueer",
    "Pangénero"
  ];

  return NextResponse.json({ genders });
}

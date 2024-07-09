// app/api/CivilStatus/route.ts
import { NextResponse } from "next/server";

// GET handler para obtener la lista de estados civiles
export async function GET() {
  const civilStatuses = [
    "Soltero(a)",
    "Casado(a)",
    "Divorciado(a)",
    "Viudo(a)",
    "Separado(a)",
    "Unión libre",
    "Concubinato"
  ];

  return NextResponse.json({ civilStatuses });
}

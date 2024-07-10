// app/api/EducationLevels/route.ts
import { NextResponse } from "next/server";

// GET handler para obtener la lista de niveles educativos internacionales
export async function GET() {
  const educationLevels = [
    "Preescolar",
    "Educación primaria",
    "Educación secundaria",
    "Educación media superior",
    "Educación superior",
    "Técnico medio",
    "Técnico superior",
    "Licenciatura",
    "Maestría",
    "Doctorado",
    "Posdoctorado"
  ];

  return NextResponse.json({ educationLevels });
}

// app/api/generate-code/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const codigo = generateUniqueCode();
  return NextResponse.json({ codigo });
}

function generateUniqueCode(): string {
  // Implementa tu lógica de generación de código aquí
  return 'abc123'; // Ejemplo de código generado
}

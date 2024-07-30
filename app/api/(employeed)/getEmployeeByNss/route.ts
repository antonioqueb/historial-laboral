import { NextResponse } from 'next/server';

// Maneja la solicitud GET y devuelve un JSON con el mensaje "Hello, World!"
export async function GET() {
  return NextResponse.json({ message: 'Hello, World!' });
}

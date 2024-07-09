// app\api\(cat)\route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const bloodTypes = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ];

  return NextResponse.json({ bloodTypes });
}

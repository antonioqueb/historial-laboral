// app/api/getUserName/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../(auth)/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";

// Define the type for the session with the user name
interface ExtendedSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export async function GET() {
    const session = await getServerSession(authOptions) as ExtendedSession | null;
    if (!session || !session.user || !session.user.name) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const fullName = session.user.name;
    const firstName = fullName.split(" ").slice(0, 2).join(" ");

    return NextResponse.json({ name: firstName }, { status: 200 });
}

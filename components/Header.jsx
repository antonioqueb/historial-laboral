'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Login from '@/components/Login';

export default function Header() {
  const [imageError, setImageError] = useState(false);
  const { data: session } = useSession();
  console.log(session); // Verifica que la sesión contenga el ID del usuario

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link className="flex items-center gap-2" href="/">
        <h2 className="font-bold text-xl lg:text-2xl">Historial Laboral</h2>
      </Link>
      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-2">
            {imageError || !session.user.image ? (
              <div className="w-10 h-10 flex items-center justify-center bg-zinc-300 rounded-full text-xl text-white">
                {session.user.name.charAt(0)}
              </div>
            ) : (
              <Image
                src={session.user.image}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
                onError={handleImageError}
              />
            )}
          </div>
        ) : null}

        <Button className="rounded-full" size="icon" variant="ghost">
          <ModeToggle />
        </Button>

        <Button>
          <Link href={session ? "/tablero" : "/login"}>
            {session ? "Tablero" : "Comenzar"}
          </Link>
        </Button>
      </div>
    </header>
  );
}

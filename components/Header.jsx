'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [imageError, setImageError] = useState(false);
  const { data: session } = useSession();
  console.log(session); // Verifica que la sesión contenga el ID del usuario


  const handleImageError = () => {
    setImageError(true);
  };

  const getFirstNameAndSurname = (name) => {
    const names = name.split(' ');
    return `${names[0]} ${names[1]}`;
  };

  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link className="flex items-center gap-2" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Historial Laboral</span>
      </Link>
      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-2">
            {imageError || !session.user.image ? (
              <div className="w-10 h-10 flex items-center justify-center bg-zinc-300 rounded-full text-xl text-white">
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
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-zinc-300 rounded-full text-xl text-white">
              NA
            </div>
            <span className="dark:text-zinc-100">Usuario</span>
          </div>
        )}

        <Button className="rounded-full" size="icon" variant="ghost">
          <ModeToggle />
        </Button>
        {!session && (
          <>
            <Button variant="outline">
              <Link href="/registrarse">Registrate</Link>
            </Button>
            <Button>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

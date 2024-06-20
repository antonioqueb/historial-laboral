'use client';

import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 dark:bg-zinc-950">
      <div className="max-w-xl w-full bg-white dark:bg-zinc-800 rounded-lg shadow-xl p-12 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-zinc-800 dark:text-white">Acceso Seguro</h1>
        <p className="text-2xl text-zinc-600 dark:text-zinc-400 mb-8">Administra el historial laboral de tus candidatos en un sólo lugar.</p>
        <Button className="w-full py-6 text-2xl font-bold bg-primary text-white rounded-lg hover:bg-primary/95 focus:outline-none focus:ring-4 focus:ring-primary/95 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950 transition duration-300" onClick={() => signIn('google')}>
          <ChromeIcon className="mr-4 h-8 w-8" />
          Continuar con Google
        </Button>
      </div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

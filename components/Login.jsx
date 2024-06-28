"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/tablero');
    }
  }, [status, router]);

  return (
    <div className="flex justify-center items-center h-screen w-full ">
      {status === 'loading' ? (
        <p className="px-6 py-4">Loading....</p>
      ) : (
        <Button 
          onClick={() => signIn("keycloak")} 
          className="px-6 py-4 text-lg bg-primary text-white font-bold rounded-md shadow-md hover:bg-primary/98"
        >
          Comenzar
        </Button>
      )}
    </div>
  );
}

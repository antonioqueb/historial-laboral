'use client';
// pages/list-companies.tsx
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";

interface Company {
  id: string;
  name: string;
}

export default function ListCompanies() {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (session) {
      const fetchUserIdAndCompanies = async () => {
        try {
          const userIdRes = await fetch("/api/getUserId");
          if (!userIdRes.ok) {
            setMessage("Failed to fetch user ID.");
            return;
          }
          const { id: userId } = await userIdRes.json();

          const companiesRes = await fetch(`/api/listCompanies`);
          if (companiesRes.ok) {
            const data = await companiesRes.json();
            setCompanies(data.companies);
          } else {
            setMessage("Failed to fetch companies.");
          }
        } catch (error) {
          setMessage("An error occurred while fetching companies.");
        }
      };
      fetchUserIdAndCompanies();
    }
  }, [session]);

  return (
    <div className="min-h-screen p-6">
      {!session && (
        <div className="flex flex-col items-center justify-center h-full">
          <Alert variant="warning">You are not signed in</Alert>
          <Button onClick={() => signIn()} className="mt-4">Sign in</Button>
        </div>
      )}
      {session && (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            {companies.length > 1 ? "Compañías" : "Compañía"}
          </h1>
          {message && <Alert variant="error" className="mb-4">{message}</Alert>}
          <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">
            {companies.length > 0 ? (
              companies.map((company) => (
                <div key={company.id} className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
                  <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                    <span className="sr-only">Ver detalles</span>
                  </Link>
                  <div className="p-4 bg-background">
                    <h3 className="text-xl font-bold">{company.name}</h3>
                    <p className="text-sm text-muted-foreground">Descripción de la empresa</p>
                  </div>
                  <div className="p-4 bg-muted">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <EyeIcon className="h-4 w-4" />
                        <span className="sr-only">Ver detalles</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <FilePenIcon className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No companies found.</p>
            )}
          </div>
          <Button onClick={() => signOut()} className="mt-6">Sign out</Button>
        </div>
      )}
    </div>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FilePenIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

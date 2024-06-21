'use client';
// pages/list-companies.tsx
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Alert} from "@/components/ui/alert";

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
    <div className="min-h-screen bg-gray-100 p-6">
      {!session && (
        <div className="flex flex-col items-center justify-center h-full">
          <Alert variant="warning">You are not signed in</Alert>
          <Button onClick={() => signIn()} className="mt-4">Sign in</Button>
        </div>
      )}
      {session && (
        <div>
          <h1 className="text-2xl font-bold mb-4">My Companies</h1>
          {message && <Alert variant="error" className="mb-4">{message}</Alert>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {companies.length > 0 ? (
              companies.map((company) => (
                <Card key={company.id} className="p-4 bg-white shadow-lg rounded-lg">
                  <h2 className="text-xl font-semibold">{company.name}</h2>
                </Card>
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

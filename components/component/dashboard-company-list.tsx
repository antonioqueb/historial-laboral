'use client';
// pages/list-companies.tsx
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

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
          // Fetch the user ID
          const userIdRes = await fetch("/api/getUserId");
          if (!userIdRes.ok) {
            setMessage("Failed to fetch user ID.");
            return;
          }
          const { id: userId } = await userIdRes.json();

          // Fetch the companies using the user ID
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
    <div>
      {!session && (
        <>
          <p>You are not signed in</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <h1>My Companies</h1>
          {companies.length > 0 ? (
            <ul>
              {companies.map((company) => (
                <li key={company.id}>{company.name}</li>
              ))}
            </ul>
          ) : (
            <p>No companies found.</p>
          )}
          <p>{message}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}

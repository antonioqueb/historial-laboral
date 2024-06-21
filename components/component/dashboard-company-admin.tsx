'use client';
// pages/create-company.tsx
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function CreateCompany() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (session) {
      const fetchUserId = async () => {
        const res = await fetch("http://192.168.1.69:108/api/getUserId");
        if (res.ok) {
          const data = await res.json();
          setUserId(data.id);
        } else {
          setMessage("Failed to fetch user ID.");
        }
      };
      fetchUserId();
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setMessage("You must be logged in to create a company.");
      return;
    }

    if (!userId) {
      setMessage("Failed to fetch user ID.");
      return;
    }

    const res = await fetch("/api/createCompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, userId }),
    });

    if (res.ok) {
      const data = await res.json();
      setMessage(`Company created: ${data.company.name}`);
      setName("");
    } else {
      const errorData = await res.json();
      setMessage(`Failed to create company: ${errorData.error}`);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <label>
              Company Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <button type="submit">Create Company</button>
          </form>
          <p>{message}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}

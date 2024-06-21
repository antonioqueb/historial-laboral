'use client';

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {!session && (
        <div className="text-center">
          <p className="text-lg font-medium">You are not signed in</p>
          <button
            onClick={() => signIn()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign in
          </button>
        </div>
      )}
      {session && (
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                Company Name:
              </label>
              <input
                id="companyName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Create Company
            </button>
          </form>
          {message && (
            <p className="text-center text-red-500 text-xs italic">{message}</p>
          )}
          <div className="text-center mt-4">
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

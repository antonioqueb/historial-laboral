'use client';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { getCompaniesList, getUserId } from "@/utils/fetchData";
import CompanyCard, { Company } from "./CompanyCard";

export default function ListCompany() {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [message, setMessage] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  useEffect(() => {
    if (session) {
      const fetchUserIdAndCompanies = async () => {
        try {
          const userIdData = await getUserId();
          if (!userIdData.id) {
            setMessage("Failed to fetch user ID.");
            return;
          }

          const companiesData = await getCompaniesList();
          if (companiesData.companies) {
            setCompanies(companiesData.companies);
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
          <Alert variant="destructive">You are not signed in</Alert>
        </div>
      )}
      {session && (
        <div className="mb-20">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {companies.length > 1 ? "Empresas" : "Empresa"}
            </h1>
            <div>
              <Button variant="outline" onClick={() => setViewMode("list")}>Lista</Button>
              <Button className="ml-4" variant="outline" onClick={() => setViewMode("grid")}>Cuadrícula</Button>
            </div>
          </div>
          {message && <Alert variant="destructive" className="mb-4">{message}</Alert>}
          {viewMode === "list" ? (
            <div className="space-y-4">
              {companies.length > 0 ? (
                companies.map((company) => (
                  <CompanyCard key={company.id} company={company} viewMode={viewMode} />
                ))
              ) : (
                <p className="text-zinc-900 dark:text-zinc-100">Ops... No has registrado ninguna empresa aún.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {companies.length > 0 ? (
                companies.map((company) => (
                  <CompanyCard key={company.id} company={company} viewMode={viewMode} />
                ))
              ) : (
                <p className="text-zinc-900 dark:text-zinc-100">Ops... No has registrado ninguna empresa aún.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// components\component\dashboard-company-list.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";

interface Company {
  id: string;
  name: string;
  razonSocial: string;
  rfc: string;
  domicilioFiscalCalle: string;
  domicilioFiscalNumero: string;
  domicilioFiscalColonia: string;
  domicilioFiscalMunicipio: string;
  domicilioFiscalEstado: string;
  domicilioFiscalCodigoPostal: string;
  nombreComercial: string;
  objetoSocial: string;
  representanteLegalNombre: string;
  representanteLegalCurp: string;
  capitalSocial: number;
  registrosImss: string;
  registrosInfonavit: string;
  giroActividadEconomica: string;
  certificaciones: string[];
}

export default function ListCompanies() {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [message, setMessage] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

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
          <Alert variant="destructive">You are not signed in</Alert>
          <Button onClick={() => signIn()} className="mt-4">Sign in</Button>
        </div>
      )}
      {session && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              {companies.length > 1 ? "Empresas" : "Empresa"}
            </h1>
            <div>
              <Button variant="outline" onClick={() => setViewMode("list")}>Lista</Button>
              <Button variant="outline" onClick={() => setViewMode("grid")}>Cuadrícula</Button>
            </div>
          </div>
          {message && <Alert variant="destructive" className="mb-4">{message}</Alert>}
          {viewMode === "list" ? (
            <div className="space-y-4">
              {companies.length > 0 ? (
                companies.map((company) => (
                  <div key={company.id} className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row">
                    <div className="flex-grow">
                      <Link href={`/tablero/empresas/editar?rfc=${company.rfc}`}>
                        <h3 className="text-xl font-bold mb-2">{company.name}</h3>
                      </Link>
                      <p className="mb-1"><span className="font-semibold">Razón Social:</span> {company.razonSocial}</p>
                      <p className="mb-1"><span className="font-semibold">RFC:</span> {company.rfc}</p>
                      <p className="mb-1"><span className="font-semibold">Domicilio Fiscal:</span> {company.domicilioFiscalCalle}, {company.domicilioFiscalNumero}, {company.domicilioFiscalColonia}, {company.domicilioFiscalMunicipio}, {company.domicilioFiscalEstado}, {company.domicilioFiscalCodigoPostal}</p>
                      <p className="mb-1"><span className="font-semibold">Nombre Comercial:</span> {company.nombreComercial}</p>
                      <p className="mb-1"><span className="font-semibold">Objeto Social:</span> {company.objetoSocial}</p>
                      <p className="mb-1"><span className="font-semibold">Representante Legal:</span> {company.representanteLegalNombre} (CURP: {company.representanteLegalCurp})</p>
                      <p className="mb-1"><span className="font-semibold">Capital Social:</span> {company.capitalSocial}</p>
                      <p className="mb-1"><span className="font-semibold">Registros IMSS:</span> {company.registrosImss}</p>
                      <p className="mb-1"><span className="font-semibold">Registros Infonavit:</span> {company.registrosInfonavit}</p>
                      <p className="mb-1"><span className="font-semibold">Actividad Económica:</span> {company.giroActividadEconomica}</p>
                      <p className="mb-1"><span className="font-semibold">Certificaciones:</span> {company.certificaciones.join(", ")}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Ops... No has registrado ninguna empresa aún.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {companies.length > 0 ? (
                companies.map((company) => (
                  <div key={company.id} className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-md group hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-full">
                    <Link href={`/tablero/empresas/editar?rfc=${company.rfc}`} className="absolute inset-0 z-10" prefetch={false}>
                      <span className="sr-only">Ver detalles</span>
                    </Link>
                    <div className="p-4 bg-white flex-grow">
                      <h3 className="text-xl font-bold mb-2">{company.name}</h3>
                      <p className="text-sm mb-1">{company.razonSocial}</p>
                      <p className="text-sm mb-1">{company.rfc}</p>
                      <p className="text-sm mb-1">{company.domicilioFiscalCalle}, {company.domicilioFiscalNumero}, {company.domicilioFiscalColonia}, {company.domicilioFiscalMunicipio}, {company.domicilioFiscalEstado}, {company.domicilioFiscalCodigoPostal}</p>
                    </div>
                    <div className="p-4 bg-gray-100 flex justify-end gap-2">
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
                ))
              ) : (
                <p>Ops... No has registrado ninguna empresa aún.</p>
              )}
            </div>
          )}
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

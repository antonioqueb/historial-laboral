'use client';

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCompaniesList, getUserId } from "@/utils/fetchData";

export interface Company {
  id: string;
  name: string;
  userId: string;
  razonSocial: string;
  rfc: string;
  domicilioFiscalCalle: string;
  domicilioFiscalNumero: string;
  domicilioFiscalColonia: string;
  domicilioFiscalMunicipio: string;
  domicilioFiscalEstado: string;
  domicilioFiscalCodigoPostal: string;
  nombreComercial?: string;
  objetoSocial: string;
  representanteLegalNombre: string;
  representanteLegalCurp: string;
  capitalSocial: number;
  registrosImss?: string;
  registrosInfonavit?: string;
  giroActividadEconomica: string;
  certificaciones: string[];
  employees?: Employee[];
  reviewsGiven?: Review[];
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  description: string;
  companyId: string;
  socialSecurityNumber: string;
  CURP: string;
  RFC: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthDate: Date;
  hireDate: Date;
  emergencyContact: string;
  emergencyPhone: string;
  bankAccountNumber: string;
  clabeNumber: string;
  maritalStatus: string;
  nationality: string;
  educationLevel: string;
  gender: string;
  bloodType: string;
  jobTitle: string;
  workShift: string;
  contractType: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  reviewsReceived?: Review[];
}

export interface Review {
  id: string;
  employeeId: string;
  companyId: string;
  title: string;
  description: string;
  rating: number;
  positive: boolean;
  documentation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ListCompany() {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [message, setMessage] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const pathname = usePathname();

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
        <div>
          <div className="flex justify-between items-center mb-4">
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
                  <div key={company.id} className="p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md flex flex-col sm:flex-row">
                    <div className="flex-grow">
                      <Link href={`/tablero/empresas/editar?rfc=${company.rfc}`}>
                        <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">{company.name}</h3>
                      </Link>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">Razón Social:</span> {company.razonSocial}</p>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">RFC:</span> {company.rfc}</p>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">Domicilio Fiscal:</span> {company.domicilioFiscalCalle}, {company.domicilioFiscalNumero}, {company.domicilioFiscalColonia}, {company.domicilioFiscalMunicipio}, {company.domicilioFiscalEstado}, {company.domicilioFiscalCodigoPostal}</p>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">Nombre Comercial:</span> {company.nombreComercial}</p>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">Objeto Social:</span> {company.objetoSocial}</p>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">Representante Legal:</span> {company.representanteLegalNombre} (CURP: {company.representanteLegalCurp})</p>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">Capital Social:</span> {company.capitalSocial}</p>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">Registros IMSS:</span> {company.registrosImss}</p>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">Registros Infonavit:</span> {company.registrosInfonavit}</p>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">Actividad Económica:</span> {company.giroActividadEconomica}</p>
                      <p className="mb-1"><span className="font-semibold text-zinc-700 dark:text-zinc-300">Certificaciones:</span> {company.certificaciones.join(", ")}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-900 dark:text-zinc-100">Ops... No has registrado ninguna empresa aún.</p>
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
                    <div className="p-4 bg-white dark:bg-zinc-800 flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">{company.name}</h3>
                      <p className="text-sm mb-1 text-zinc-700 dark:text-zinc-300">{company.razonSocial}</p>
                      <p className="text-sm mb-1 text-zinc-700 dark:text-zinc-300">{company.rfc}</p>
                      <p className="text-sm mb-1 text-zinc-700 dark:text-zinc-300">{company.domicilioFiscalCalle}, {company.domicilioFiscalNumero}, {company.domicilioFiscalColonia}, {company.domicilioFiscalMunicipio}, {company.domicilioFiscalEstado}, {company.domicilioFiscalCodigoPostal}</p>
                    </div>
                    <div className="p-4 bg-gray-100 dark:bg-zinc-700 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <FilePenIcon className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                    </div>
                  </div>
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
      <path d="M14 2v4 a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

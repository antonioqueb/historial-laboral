import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Company {
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
  nombreComercial?: string;
  objetoSocial: string;
  representanteLegalNombre: string;
  representanteLegalCurp: string;
  capitalSocial: number;
  registrosImss?: string;
  registrosInfonavit?: string;
  giroActividadEconomica: string;
  certificaciones: string[];
  logoUrl?: string;
}

interface CompanyCardProps {
  company: Company;
  viewMode: "list" | "grid" | "card";
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, viewMode }) => {
  if (viewMode === "card") {
    return (
      <Card className="w-full max-w-md">
        {company.logoUrl && (
          <img
            src={company.logoUrl}
            alt={`${company.name} Logo`}
            width={600}
            height={300}
            className="object-cover rounded-t-lg"
          />
        )}
        <CardContent className="p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">{company.name}</h3>
            <p className="text-muted-foreground">Razón Social: {company.razonSocial}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">RFC: {company.rfc}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Domicilio Fiscal:</p>
            <p>
              {company.domicilioFiscalCalle}, {company.domicilioFiscalNumero}, {company.domicilioFiscalColonia}, {company.domicilioFiscalMunicipio}, {company.domicilioFiscalEstado}, {company.domicilioFiscalCodigoPostal}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Nombre Comercial:</p>
            <p>{company.nombreComercial}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md ${viewMode === "list" ? "flex flex-col sm:flex-row" : "flex flex-col justify-between h-full"}`}>
      {company.logoUrl && (
        <img src={company.logoUrl} alt={`${company.name} Logo`} className="w-16 h-16 mr-4" />
      )}
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
      {viewMode === "grid" && (
        <div className="p-4 bg-gray-100 dark:bg-zinc-700 flex justify-end gap-2">
          <Button variant="outline" size="sm">
            <FilePenIcon className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
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

export default CompanyCard;

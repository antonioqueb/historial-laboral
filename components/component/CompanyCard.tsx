import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const logoSrc = company.logoUrl ? company.logoUrl : "/placeholder.svg";

  return (
    <Card className="w-full max-w-md">
      <div className="relative w-full h-48">
        <Image
          src={logoSrc}
          alt={`${company.name} Logo`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          unoptimized
        />
      </div>
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

export default CompanyCard;

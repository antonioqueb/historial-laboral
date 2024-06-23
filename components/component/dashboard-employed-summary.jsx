'use client';

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { PlusIcon, StarIcon, ReplyIcon, BuildingIcon, CogIcon, LayoutDashboardIcon, UsersIcon } from "@/icons"; // Asegúrate de tener estos íconos definidos/importados

export default function DashboardCompany() {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session) {
      const fetchCompanies = async () => {
        const res = await fetch("http://192.168.1.69:108/api/getCompanies");
        if (res.ok) {
          const data = await res.json();
          setCompanies(data.companies);
        } else {
          setMessage("Failed to fetch companies.");
        }
      };
      fetchCompanies();
    }
  }, [session]);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  return (
    <div className="flex min-h-screen">
      {!session && (
        <div className="text-center">
          <p className="text-lg font-medium text-black">You are not signed in</p>
          <button
            onClick={() => signIn()}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Sign in
          </button>
        </div>
      )}
      {session && (
        <div className="flex-1 p-6">
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Empresas</h2>
            <div className="flex items-center gap-4">
              <Input className="max-w-xs" placeholder="Buscar empresas..." type="search" />
              <Button>
                <PlusIcon className="w-4 h-4 mr-2" />
                Nueva Empresa
              </Button>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {companies.map((company) => (
              <Card key={company.rfc} onClick={() => handleCompanySelect(company)}>
                <CardHeader className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-company.jpg" />
                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{company.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{company.razonSocial}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BuildingIcon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{company.domicilioFiscalEstado}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Ver Detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {selectedCompany && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Detalles de {selectedCompany.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Razón Social</Label>
                  <Input value={selectedCompany.razonSocial} readOnly />
                </div>
                <div>
                  <Label>RFC</Label>
                  <Input value={selectedCompany.rfc} readOnly />
                </div>
                <div>
                  <Label>Domicilio Fiscal</Label>
                  <Input value={selectedCompany.domicilioFiscalCalle} readOnly />
                </div>
                <div>
                  <Label>Número</Label>
                  <Input value={selectedCompany.domicilioFiscalNumero} readOnly />
                </div>
                <div>
                  <Label>Colonia</Label>
                  <Input value={selectedCompany.domicilioFiscalColonia} readOnly />
                </div>
                <div>
                  <Label>Municipio</Label>
                  <Input value={selectedCompany.domicilioFiscalMunicipio} readOnly />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Input value={selectedCompany.domicilioFiscalEstado} readOnly />
                </div>
                <div>
                  <Label>Código Postal</Label>
                  <Input value={selectedCompany.domicilioFiscalCodigoPostal} readOnly />
                </div>
                <div>
                  <Label>Nombre Comercial</Label>
                  <Input value={selectedCompany.nombreComercial} readOnly />
                </div>
                <div>
                  <Label>Objeto Social</Label>
                  <Input value={selectedCompany.objetoSocial} readOnly />
                </div>
                <div>
                  <Label>Representante Legal</Label>
                  <Input value={selectedCompany.representanteLegalNombre} readOnly />
                </div>
                <div>
                  <Label>CURP del Representante Legal</Label>
                  <Input value={selectedCompany.representanteLegalCurp} readOnly />
                </div>
                <div>
                  <Label>Capital Social</Label>
                  <Input value={selectedCompany.capitalSocial} readOnly />
                </div>
                <div>
                  <Label>Registros IMSS</Label>
                  <Input value={selectedCompany.registrosImss} readOnly />
                </div>
                <div>
                  <Label>Registros Infonavit</Label>
                  <Input value={selectedCompany.registrosInfonavit} readOnly />
                </div>
                <div>
                  <Label>Giro/Actividad Económica</Label>
                  <Input value={selectedCompany.giroActividadEconomica} readOnly />
                </div>
                <div>
                  <Label>Certificaciones</Label>
                  <Input value={selectedCompany.certificaciones.join(", ")} readOnly />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

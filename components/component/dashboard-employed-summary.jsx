'use client';

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FaPlus, FaStar, FaReply, FaBuilding, FaCog, FaThLarge, FaUsers } from 'react-icons/fa';

export default function DashboardCompany() {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState([]);
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
                <FaPlus className="w-4 h-4 mr-2" />
                Nueva Empresa
              </Button>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {companies.map((company) => (
              <Card key={company.rfc}>
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
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FaBuilding className="w-4 h-4" />
                      <span className="text-sm font-semibold">{company.domicilioFiscalEstado}</span>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    <p><strong>RFC:</strong> {company.rfc}</p>
                    <p><strong>Dirección:</strong> {company.domicilioFiscalCalle}, {company.domicilioFiscalNumero}, {company.domicilioFiscalColonia}, {company.domicilioFiscalMunicipio}, {company.domicilioFiscalEstado}, {company.domicilioFiscalCodigoPostal}</p>
                    <p><strong>Nombre Comercial:</strong> {company.nombreComercial}</p>
                    <p><strong>Objeto Social:</strong> {company.objetoSocial}</p>
                    <p><strong>Representante Legal:</strong> {company.representanteLegalNombre} (CURP: {company.representanteLegalCurp})</p>
                    <p><strong>Capital Social:</strong> {company.capitalSocial}</p>
                    <p><strong>Registros IMSS:</strong> {company.registrosImss}</p>
                    <p><strong>Registros Infonavit:</strong> {company.registrosInfonavit}</p>
                    <p><strong>Giro/Actividad Económica:</strong> {company.giroActividadEconomica}</p>
                    <p><strong>Certificaciones:</strong> {company.certificaciones.join(", ")}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {message && (
            <p className="text-center text-red-600 text-md italic mt-4">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}

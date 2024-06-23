'use client';

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function EditCompany({ initialRfc }: { initialRfc: string }) {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  // Nuevos campos
  const [razonSocial, setRazonSocial] = useState("");
  const [rfc, setRfc] = useState(initialRfc);
  const [domicilioFiscalCalle, setDomicilioFiscalCalle] = useState("");
  const [domicilioFiscalNumero, setDomicilioFiscalNumero] = useState("");
  const [domicilioFiscalColonia, setDomicilioFiscalColonia] = useState("");
  const [domicilioFiscalMunicipio, setDomicilioFiscalMunicipio] = useState("");
  const [domicilioFiscalEstado, setDomicilioFiscalEstado] = useState("");
  const [domicilioFiscalCodigoPostal, setDomicilioFiscalCodigoPostal] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [objetoSocial, setObjetoSocial] = useState("");
  const [representanteLegalNombre, setRepresentanteLegalNombre] = useState("");
  const [representanteLegalCurp, setRepresentanteLegalCurp] = useState("");
  const [capitalSocial, setCapitalSocial] = useState(0.0);
  const [registrosImss, setRegistrosImss] = useState("");
  const [registrosInfonavit, setRegistrosInfonavit] = useState("");
  const [giroActividadEconomica, setGiroActividadEconomica] = useState("");
  const [certificaciones, setCertificaciones] = useState("");

  const [companies, setCompanies] = useState<string[]>([]);

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

      const fetchCompanies = async () => {
        const res = await fetch("http://192.168.1.69:108/api/getCompanyRFC");
        if (res.ok) {
          const data = await res.json();
          setCompanies(data.rfcs);
        } else {
          setMessage("Failed to fetch companies.");
        }
      };
      fetchCompanies();

      if (initialRfc) {
        fetchCompanyData(initialRfc);
      }
    }
  }, [session, initialRfc]);

  const fetchCompanyData = async (rfc: string) => {
    const res = await fetch(`/api/getCompany?rfc=${rfc}`);
    if (res.ok) {
      const data = await res.json();
      setName(data.name);
      setRazonSocial(data.razonSocial);
      setRfc(data.rfc);
      setDomicilioFiscalCalle(data.domicilioFiscalCalle);
      setDomicilioFiscalNumero(data.domicilioFiscalNumero);
      setDomicilioFiscalColonia(data.domicilioFiscalColonia);
      setDomicilioFiscalMunicipio(data.domicilioFiscalMunicipio);
      setDomicilioFiscalEstado(data.domicilioFiscalEstado);
      setDomicilioFiscalCodigoPostal(data.domicilioFiscalCodigoPostal);
      setNombreComercial(data.nombreComercial);
      setObjetoSocial(data.objetoSocial);
      setRepresentanteLegalNombre(data.representanteLegalNombre);
      setRepresentanteLegalCurp(data.representanteLegalCurp);
      setCapitalSocial(data.capitalSocial);
      setRegistrosImss(data.registrosImss);
      setRegistrosInfonavit(data.registrosInfonavit);
      setGiroActividadEconomica(data.giroActividadEconomica);
      setCertificaciones(data.certificaciones.join(", "));
    } else {
      setMessage("Failed to fetch company data.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setMessage("You must be logged in to edit a company.");
      return;
    }

    if (!userId) {
      setMessage("Failed to fetch user ID.");
      return;
    }

    const res = await fetch("/api/editCompany", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        userId,
        razonSocial,
        rfc,
        domicilioFiscalCalle,
        domicilioFiscalNumero,
        domicilioFiscalColonia,
        domicilioFiscalMunicipio,
        domicilioFiscalEstado,
        domicilioFiscalCodigoPostal,
        nombreComercial,
        objetoSocial,
        representanteLegalNombre,
        representanteLegalCurp,
        capitalSocial,
        registrosImss,
        registrosInfonavit,
        giroActividadEconomica,
        certificaciones: certificaciones.split(',').map(cert => cert.trim())
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setMessage(`Company updated: ${data.company.name}`);
    } else {
      const errorData = await res.json();
      setMessage(`Failed to update company: ${errorData.error}`);
    }
  };

  const handleCompanySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRfc = e.target.value;
    setRfc(selectedRfc);
    fetchCompanyData(selectedRfc);
  };

  return (
    <div className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
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
        <>
          <h1 className="text-3xl font-bold mb-8">Editar Empresa</h1>
          <div className="mb-4">
            <Label htmlFor="companySelect" className="text-2xl font-bold text-blue-600">Seleccionar Empresa</Label>
            <select
              id="companySelect"
              value={rfc}
              onChange={handleCompanySelect}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Seleccionar...</option>
              {companies.map((companyRfc) => (
                <option key={companyRfc} value={companyRfc}>
                  {companyRfc}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Información General */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Información General</h2>
              <div>
                <Label htmlFor="companyName">Nombre</Label>
                <Input
                  id="companyName"
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="razonSocial">Razón Social*</Label>
                <Input
                  id="razonSocial"
                  type="text"
                  value={razonSocial}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRazonSocial(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rfc">RFC*</Label>
                <Input
                  id="rfc"
                  type="text"
                  value={rfc}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRfc(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nombreComercial">Nombre Comercial</Label>
                <Input
                  id="nombreComercial"
                  type="text"
                  value={nombreComercial}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombreComercial(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="objetoSocial">Objeto Social</Label>
                <Input
                  id="objetoSocial"
                  type="text"
                  value={objetoSocial}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setObjetoSocial(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Domicilio Fiscal */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Domicilio Fiscal</h2>
              <div>
                <Label htmlFor="domicilioFiscalCalle">Calle</Label>
                <Input
                  id="domicilioFiscalCalle"
                  type="text"
                  value={domicilioFiscalCalle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDomicilioFiscalCalle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="domicilioFiscalNumero">Número</Label>
                <Input
                  id="domicilioFiscalNumero"
                  type="text"
                  value={domicilioFiscalNumero}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDomicilioFiscalNumero(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="domicilioFiscalColonia">Colonia</Label>
                <Input
                  id="domicilioFiscalColonia"
                  type="text"
                  value={domicilioFiscalColonia}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDomicilioFiscalColonia(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="domicilioFiscalMunicipio">Municipio</Label>
                <Input
                  id="domicilioFiscalMunicipio"
                  type="text"
                  value={domicilioFiscalMunicipio}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDomicilioFiscalMunicipio(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="domicilioFiscalEstado">Estado</Label>
                <Input
                  id="domicilioFiscalEstado"
                  type="text"
                  value={domicilioFiscalEstado}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDomicilioFiscalEstado(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="domicilioFiscalCodigoPostal">Código Postal</Label>
                <Input
                  id="domicilioFiscalCodigoPostal"
                  type="text"
                  value={domicilioFiscalCodigoPostal}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDomicilioFiscalCodigoPostal(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Información del Representante Legal */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Representante Legal</h2>
              <div>
                <Label htmlFor="representanteLegalNombre">Nombre</Label>
                <Input
                  id="representanteLegalNombre"
                  type="text"
                  value={representanteLegalNombre}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepresentanteLegalNombre(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="representanteLegalCurp">CURP</Label>
                <Input
                  id="representanteLegalCurp"
                  type="text"
                  value={representanteLegalCurp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepresentanteLegalCurp(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Información Adicional */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Información Adicional</h2>
              <div>
                <Label htmlFor="capitalSocial">Capital Social</Label>
                <Input
                  id="capitalSocial"
                  type="number"
                  value={capitalSocial}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCapitalSocial(parseFloat(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="registrosImss">Registros IMSS</Label>
                <Input
                  id="registrosImss"
                  type="text"
                  value={registrosImss}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegistrosImss(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="registrosInfonavit">Registros Infonavit</Label>
                <Input
                  id="registrosInfonavit"
                  type="text"
                  value={registrosInfonavit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegistrosInfonavit(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="giroActividadEconomica">Actividad Económica</Label>
                <Input
                  id="giroActividadEconomica"
                  type="text"
                  value={giroActividadEconomica}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGiroActividadEconomica(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="certificaciones">Certificaciones</Label>
                <Input
                  id="certificaciones"
                  type="text"
                  value={certificaciones}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCertificaciones(e.target.value)}
                  placeholder="Separar por comas"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-8 col-span-1 md:col-span-2 lg:col-span-3">
              <Button type="submit">Editar Empresa</Button>
            </div>
          </form>
          {message && (
            <p className="text-center text-green-600 text-md italic mt-4">{message}</p>
          )}
        </>
      )}
    </div>
  );
}

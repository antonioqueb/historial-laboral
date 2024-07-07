'use client';
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getUserId, getCompanyByRfc, editCompany, getCompaniesRFC } from "@/utils/fetchData";
import { z } from "zod";
import { editCompanySchema } from "@/schemas/editCompanySchema";

export default function EditCompany() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const searchParams = useSearchParams();
  const initialRfc = searchParams.get("rfc");

  const [razonSocial, setRazonSocial] = useState("");
  const [rfc, setRfc] = useState(initialRfc || "");
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
  const [logo, setLogo] = useState<File | null>(null);

  const [companies, setCompanies] = useState<string[]>([]);

  const loadUserId = async () => {
    try {
      const data = await getUserId();
      setUserId(data.id);
    } catch (error) {
      setMessage("Failed to fetch user ID.");
    }
  };

  const loadCompanies = async () => {
    const data = await getCompaniesRFC();
    setCompanies(data.rfcs);
  };

  const fetchCompanyData = async (rfc: string) => {
    try {
      const data = await getCompanyByRfc(rfc);
      if (data) {
        setName(data.name || "");
        setRazonSocial(data.razonSocial || "");
        setRfc(data.rfc || "");
        setDomicilioFiscalCalle(data.domicilioFiscalCalle || "");
        setDomicilioFiscalNumero(data.domicilioFiscalNumero || "");
        setDomicilioFiscalColonia(data.domicilioFiscalColonia || "");
        setDomicilioFiscalMunicipio(data.domicilioFiscalMunicipio || "");
        setDomicilioFiscalEstado(data.domicilioFiscalEstado || "");
        setDomicilioFiscalCodigoPostal(data.domicilioFiscalCodigoPostal || "");
        setNombreComercial(data.nombreComercial || "");
        setObjetoSocial(data.objetoSocial || "");
        setRepresentanteLegalNombre(data.representanteLegalNombre || "");
        setRepresentanteLegalCurp(data.representanteLegalCurp || "");
        setCapitalSocial(data.capitalSocial || 0.0);
        setRegistrosImss(data.registrosImss || "");
        setRegistrosInfonavit(data.registrosInfonavit || "");
        setGiroActividadEconomica(data.giroActividadEconomica || "");
        setCertificaciones(data.certificaciones ? data.certificaciones.join(", ") : "");
      } else {
        setMessage("Failed to fetch company data.");
      }
    } catch (error) {
      setMessage("Failed to fetch company data.");
    }
  };

  useEffect(() => {
    if (session) {
      loadUserId();
      loadCompanies();

      if (initialRfc) {
        fetchCompanyData(initialRfc);
      }
    }
  }, [session, initialRfc]);

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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("userId", userId);
    formData.append("razonSocial", razonSocial);
    formData.append("rfc", rfc);
    formData.append("domicilioFiscalCalle", domicilioFiscalCalle);
    formData.append("domicilioFiscalNumero", domicilioFiscalNumero);
    formData.append("domicilioFiscalColonia", domicilioFiscalColonia);
    formData.append("domicilioFiscalMunicipio", domicilioFiscalMunicipio);
    formData.append("domicilioFiscalEstado", domicilioFiscalEstado);
    formData.append("domicilioFiscalCodigoPostal", domicilioFiscalCodigoPostal);
    formData.append("nombreComercial", nombreComercial);
    formData.append("objetoSocial", objetoSocial);
    formData.append("representanteLegalNombre", representanteLegalNombre);
    formData.append("representanteLegalCurp", representanteLegalCurp);
    formData.append("capitalSocial", capitalSocial.toString());
    formData.append("registrosImss", registrosImss);
    formData.append("registrosInfonavit", registrosInfonavit);
    formData.append("giroActividadEconomica", giroActividadEconomica);
    formData.append("certificaciones", certificaciones);

    const parsedData = {
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
      capitalSocial: parseFloat(capitalSocial.toString()), // Asegurar que sea un número
      registrosImss,
      registrosInfonavit,
      giroActividadEconomica,
      certificaciones: certificaciones.split(',').map(cert => cert.trim()), // Convertir a array de strings
      logo // Este campo no se enviará a Zod
    };

    try {
      editCompanySchema.parse(parsedData); // Validar datos con Zod
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors.map(err => err.message).join(", "));
        return;
      }
    }

    const result = await editCompany(formData);

    if (result.company.name) {
      setMessage(`Company updated: ${result.company.name}`);
    } else {
      setMessage(result.error ?? "Failed to update company");
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
            <Label htmlFor="companySelect">Seleccionar Empresa</Label>
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
                />
              </div>
              <div>
                <Label htmlFor="registrosInfonavit">Registros Infonavit</Label>
                <Input
                  id="registrosInfonavit"
                  type="text"
                  value={registrosInfonavit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegistrosInfonavit(e.target.value)}
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
              <div>
                <Label htmlFor="logo">Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogo(e.target.files?.[0] ?? null)}
                  accept="image/*"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-8 col-span-1 md:col-span-2 lg:col-span-3">
              <Button type="submit">Editar Empresa</Button>
              <Link href="/tablero/empresas" className="ml-2">
                <Button type="button">Cancelar</Button>
              </Link>
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

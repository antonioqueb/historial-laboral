'use client';

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateCompany() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  // Nuevos campos
  const [razonSocial, setRazonSocial] = useState("");
  const [rfc, setRfc] = useState("");
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
      setMessage(`Company created: ${data.company.name}`);
      setName("");
    } else {
      const errorData = await res.json();
      setMessage(`Failed to create company: ${errorData.error}`);
    }
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
          <h1 className="text-3xl font-bold mb-8">Registrar Empresa</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nombre de la Empresa</Label>
                <Input
                  id="companyName"
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="razonSocial">Razón Social</Label>
                <Input
                  id="razonSocial"
                  type="text"
                  value={razonSocial}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRazonSocial(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rfc">RFC</Label>
                <Input
                  id="rfc"
                  type="text"
                  value={rfc}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRfc(e.target.value)}
                  required
                />
              </div>
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
                <Textarea
                  id="objetoSocial"
                  value={objetoSocial}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setObjetoSocial(e.target.value)}
                  required
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="representanteLegalNombre">Representante Legal - Nombre</Label>
                <Input
                  id="representanteLegalNombre"
                  type="text"
                  value={representanteLegalNombre}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepresentanteLegalNombre(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="representanteLegalCurp">Representante Legal - CURP</Label>
                <Input
                  id="representanteLegalCurp"
                  type="text"
                  value={representanteLegalCurp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepresentanteLegalCurp(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="capitalSocial">Capital Social</Label>
                <Input
                  id="capitalSocial"
                  type="number"
                  step="0.01"
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
                <Label htmlFor="giroActividadEconomica">Giro o Actividad Económica</Label>
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
                <Textarea
                  id="certificaciones"
                  value={certificaciones}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCertificaciones(e.target.value)}
                  required
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <div className="flex justify-end mt-8 col-span-1 md:col-span-2 lg:col-span-3">
              <Button type="submit">Create Company</Button>
            </div>
          </form>
          {message && (
            <p className="text-center text-red-500 text-xs italic mt-4">{message}</p>
          )}
        </>
      )}
    </div>
  );
}

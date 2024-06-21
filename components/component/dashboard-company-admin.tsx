'use client';

import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

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
        certificaciones
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
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
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-300">
            <h2 className="text-2xl font-bold text-center text-black mb-6">Create Company</h2>
            
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="companyName">
                Company Name:
              </label>
              <input
                id="companyName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Nuevos campos */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="razonSocial">
                Razón Social:
              </label>
              <input
                id="razonSocial"
                type="text"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="rfc">
                RFC:
              </label>
              <input
                id="rfc"
                type="text"
                value={rfc}
                onChange={(e) => setRfc(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="domicilioFiscalCalle">
                Domicilio Fiscal - Calle:
              </label>
              <input
                id="domicilioFiscalCalle"
                type="text"
                value={domicilioFiscalCalle}
                onChange={(e) => setDomicilioFiscalCalle(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="domicilioFiscalNumero">
                Domicilio Fiscal - Número:
              </label>
              <input
                id="domicilioFiscalNumero"
                type="text"
                value={domicilioFiscalNumero}
                onChange={(e) => setDomicilioFiscalNumero(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="domicilioFiscalColonia">
                Domicilio Fiscal - Colonia:
              </label>
              <input
                id="domicilioFiscalColonia"
                type="text"
                value={domicilioFiscalColonia}
                onChange={(e) => setDomicilioFiscalColonia(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="domicilioFiscalMunicipio">
                Domicilio Fiscal - Municipio:
              </label>
              <input
                id="domicilioFiscalMunicipio"
                type="text"
                value={domicilioFiscalMunicipio}
                onChange={(e) => setDomicilioFiscalMunicipio(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="domicilioFiscalEstado">
                Domicilio Fiscal - Estado:
              </label>
              <input
                id="domicilioFiscalEstado"
                type="text"
                value={domicilioFiscalEstado}
                onChange={(e) => setDomicilioFiscalEstado(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="domicilioFiscalCodigoPostal">
                Domicilio Fiscal - Código Postal:
              </label>
              <input
                id="domicilioFiscalCodigoPostal"
                type="text"
                value={domicilioFiscalCodigoPostal}
                onChange={(e) => setDomicilioFiscalCodigoPostal(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="nombreComercial">
                Nombre Comercial:
              </label>
              <input
                id="nombreComercial"
                type="text"
                value={nombreComercial}
                onChange={(e) => setNombreComercial(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="objetoSocial">
                Objeto Social:
              </label>
              <input
                id="objetoSocial"
                type="text"
                value={objetoSocial}
                onChange={(e) => setObjetoSocial(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="representanteLegalNombre">
                Representante Legal - Nombre:
              </label>
              <input
                id="representanteLegalNombre"
                type="text"
                value={representanteLegalNombre}
                onChange={(e) => setRepresentanteLegalNombre(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="representanteLegalCurp">
                Representante Legal - CURP:
              </label>
              <input
                id="representanteLegalCurp"
                type="text"
                value={representanteLegalCurp}
                onChange={(e) => setRepresentanteLegalCurp(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="capitalSocial">
                Capital Social:
              </label>
              <input
                id="capitalSocial"
                type="number"
                step="0.01"
                value={capitalSocial}
                onChange={(e) => setCapitalSocial(parseFloat(e.target.value))}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="registrosImss">
                Registros IMSS:
              </label>
              <input
                id="registrosImss"
                type="text"
                value={registrosImss}
                onChange={(e) => setRegistrosImss(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="registrosInfonavit">
                Registros Infonavit:
              </label>
              <input
                id="registrosInfonavit"
                type="text"
                value={registrosInfonavit}
                onChange={(e) => setRegistrosInfonavit(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="giroActividadEconomica">
                Giro o Actividad Económica:
              </label>
              <input
                id="giroActividadEconomica"
                type="text"
                value={giroActividadEconomica}
                onChange={(e) => setGiroActividadEconomica(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="certificaciones">
                Certificaciones:
              </label>
              <input
                id="certificaciones"
                type="text"
                value={certificaciones}
                onChange={(e) => setCertificaciones(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Botón para enviar */}
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            >
              Create Company
            </button>
          </form>
          {message && (
            <p className="text-center text-red-500 text-xs italic">{message}</p>
          )}
          <div className="text-center mt-4">
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

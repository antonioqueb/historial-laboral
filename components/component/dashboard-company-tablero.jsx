'use client';

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "@/components/ui/card";
import { FaBuilding, FaMoneyBill, FaMapMarkedAlt, FaCertificate, FaClipboardList, FaHome } from 'react-icons/fa';
import Link from "next/link";

// Icon Component
const IconComponent = ({ IconComponent, className }) => <IconComponent className={className} />;

export default function DashboardCompany() {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session) {
      const fetchCompanies = async () => {
        const res = await fetch("https://historiallaboral.com/api/listCompanies");
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

  const totalCompanies = companies.length;
  const totalCapitalSocial = companies.reduce((acc, company) => acc + company.capitalSocial, 0);
  const uniqueStates = new Set(companies.map(company => company.domicilioFiscalEstado)).size;
  const totalCertificaciones = companies.reduce((acc, company) => acc + company.certificaciones.length, 0);
  const totalRegistrosImss = companies.reduce((acc, company) => acc + company.registrosImss.length, 0);
  const totalRegistrosInfonavit = companies.reduce((acc, company) => acc + company.registrosInfonavit.length, 0);

  const cardData = [
    {
      title: "Total de Empresas",
      description: "Número actual de empresas registradas",
      mainValue: totalCompanies,
      icon: FaBuilding,
    },
    {
      title: "Capital Social Total",
      description: "Capital social acumulado de todas las empresas",
      mainValue: `$${totalCapitalSocial.toLocaleString()}`,
      icon: FaMoneyBill,
    },
    {
      title: "Número de Estados",
      description: "Estados donde están registradas las empresas",
      mainValue: uniqueStates,
      icon: FaMapMarkedAlt,
    },
    {
      title: "Número de Certificaciones",
      description: "Total de certificaciones de todas las empresas",
      mainValue: totalCertificaciones,
      icon: FaCertificate,
    },
    {
      title: "Número de Registros IMSS",
      description: "Total de registros IMSS de todas las empresas",
      mainValue: totalRegistrosImss,
      icon: FaClipboardList,
    },
    {
      title: "Número de Registros Infonavit",
      description: "Total de registros Infonavit de todas las empresas",
      mainValue: totalRegistrosInfonavit,
      icon: FaHome,
    }
  ];

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
            <h2 className="text-2xl font-semibold">Resumen</h2>
      
          </header>
          <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5">
            {cardData.map(({ title, description, mainValue, icon }, index) => (
              <Card key={index} className="min-h-[200px] lg:min-h-[300px]">
                <div className="flex flex-col justify-between h-full">
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between mt-auto">
                    <div className="grid gap-1">
                      <div className="text-4xl font-bold">{mainValue}</div>
                    </div>
                    <IconComponent IconComponent={icon} className="h-12 w-12 text-zinc-400 ml-4" />
                  </CardFooter>
                </div>
              </Card>
            ))}
          </section>
          {message && (
            <p className="text-center text-red-600 text-md italic mt-4">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}

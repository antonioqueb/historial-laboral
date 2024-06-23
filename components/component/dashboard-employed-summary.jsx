'use client';

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { FaBuilding, FaMoneyBill, FaChartPie } from 'react-icons/fa';

export default function DashboardCompany() {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session) {
      const fetchCompanies = async () => {
        const res = await fetch("http://192.168.1.69:108/api/listCompanies");
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
  const companiesByState = companies.reduce((acc, company) => {
    acc[company.domicilioFiscalEstado] = (acc[company.domicilioFiscalEstado] || 0) + 1;
    return acc;
  }, {});

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
            <h2 className="text-2xl font-semibold">Dashboard de Empresas</h2>
            <div className="flex items-center gap-4">
              <Input className="max-w-xs" placeholder="Buscar empresas..." type="search" />
              <Button>
                <FaBuilding className="w-4 h-4 mr-2" />
                Nueva Empresa
              </Button>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex items-center gap-4">
                <FaBuilding className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Total de Empresas</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalCompanies}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center gap-4">
                <FaMoneyBill className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold">Capital Social Total</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${totalCapitalSocial.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center gap-4">
                <FaChartPie className="w-6 h-6 text-red-500" />
                <div>
                  <h3 className="text-lg font-semibold">Empresas por Estado</h3>
                </div>
              </CardHeader>
              <CardContent>
                {Object.keys(companiesByState).map((state) => (
                  <div key={state} className="flex items-center justify-between">
                    <span>{state}</span>
                    <span>{companiesByState[state]}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          {message && (
            <p className="text-center text-red-600 text-md italic mt-4">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}

'use client'; // Asegura que el código se ejecute en el cliente

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { getEmployeesByCompany, getCompaniesList, Employee, Company } from "@/utils/fetchData";
import Link from 'next/link';
import { Button } from "../ui/button";

export default function DashboardEmployedList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [authorizedNSS, setAuthorizedNSS] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompaniesList();
        console.log("Companies data:", data);
        setCompanies(data.companies);
        if (data.companies.length > 0) {
          setSelectedCompany(data.companies[0].id);
          console.log("Selected company set to:", data.companies[0].id);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const loadEmployees = async () => {
        try {
          console.log("Fetching employees for company ID:", selectedCompany);
          const filteredEmployees = await getEmployeesByCompany(selectedCompany);
          console.log("Filtered employees:", filteredEmployees);
          setEmployees(filteredEmployees);
          await validateNSS(filteredEmployees);
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      };

      loadEmployees();
    }
  }, [selectedCompany]);

  const validateNSS = async (employees: Employee[]) => {
    const authStatus: { [key: string]: boolean } = {};
    const fetchPromises = employees.map(async (employee) => {
      try {
        const response = await fetch(`http://upload-file-by-nss.historiallaboral.com/check-signature/${employee.socialSecurityNumber}`);
        const data = await response.json();
        authStatus[employee.socialSecurityNumber] = data.signature_exists;
      } catch (error) {
        console.error(`Error validating NSS ${employee.socialSecurityNumber}:`, error);
        authStatus[employee.socialSecurityNumber] = false;
      }
    });

    await Promise.all(fetchPromises);
    setAuthorizedNSS(authStatus);
  };

  const generateContractUrl = (employee: Employee) => {
    const uniqueCode = `${employee.id}-${Date.now()}`;
    const params = new URLSearchParams({
      nombre: employee.name,
      curp: employee.CURP,
      rfc: employee.RFC,
      nss: employee.socialSecurityNumber,
    });
    return `${window.location.origin}/contrato/${uniqueCode}?${params.toString()}`;
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copiada al portapapeles");
    }).catch((err) => {
      console.error("Error copiando la URL: ", err);
    });
  };

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12 mb-14">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Empleados</h1>
      </div>
      <div className="mb-4">
        <Label htmlFor="companySelect">Seleccionar Empresa</Label>
        <select
          id="companySelect"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Seleccionar...</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.razonSocial}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-square">
              <Image
                alt={`Foto de ${employee.name}`}
                className="w-full h-full object-cover"
                height={400}
                src={employee.profileImageUrl ? employee.profileImageUrl : "/placeholder.svg"}
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
                unoptimized
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <div className="flex items-center">
                {authorizedNSS[employee.socialSecurityNumber] ? (
                  <span className="text-green-500">✔️ Autorizado</span>
                ) : (
                  <span className="text-red-500">❌ No Autorizado</span>
                )}
              </div>
              <p className="text-zinc-500 dark:text-zinc-400">{employee.role}</p>
              <p className="text-sm line-clamp-2">{employee.description}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Departamento: {employee.department}</p>
              <div className="flex space-x-2 mt-2">
              <Button
                  variant="secondary"
                >
                <Link href={generateContractUrl(employee)}>
                Ver Contrato
                </Link>
                </Button>
                <Button
                  onClick={() => copyToClipboard(generateContractUrl(employee))}
                  variant="secondary"
                >
                  Copiar URL
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { getCompaniesRFC, getEmployeesByCompany } from "@/utils/fetchData";

// Definición de tipos para los datos esperados
interface Employee {
  id: string;
  name: string;
  profileImageUrl: string;
  role: string;
  description: string;
  department: string;
  company: {
    rfc: string;
  };
}

export default function EmployedList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  // Función para cargar las compañías
  const loadCompanies = async () => {
    const data = await getCompaniesRFC();
    setCompanies(data.rfcs);
    if (data.rfcs.length > 0) {
      setSelectedCompany(data.rfcs[0]); // Selecciona la primera compañía por defecto
    }
  };

  // Función para cargar los empleados
  const loadEmployees = async (company: string) => {
    const filteredEmployees = await getEmployeesByCompany(company);
    setEmployees(filteredEmployees);
  };

  // Cargar las compañías al montar el componente
  useEffect(() => {
    loadCompanies();
  }, []);

  // Cargar los empleados cuando se selecciona una compañía
  useEffect(() => {
    if (selectedCompany) {
      loadEmployees(selectedCompany);
    }
  }, [selectedCompany]);

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12">
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
          {companies.map((companyRfc) => (
            <option key={companyRfc} value={companyRfc}>
              {companyRfc}
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
                src={employee.profileImageUrl ? employee.profileImageUrl : "/placeholder.svg"} // Usar la URL de la imagen o un placeholder
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
              <p className="text-zinc-500 dark:text-zinc-400">{employee.role}</p>
              <p className="text-sm line-clamp-2">{employee.description}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Departamento: {employee.department}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

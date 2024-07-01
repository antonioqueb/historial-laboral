'use client';

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { getEmployeesByCompany, getCompaniesList, Employee, Company } from "@/utils/fetchData";

export default function DashboardEmployedList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompaniesList();
        console.log("Companies data:", data);
        setCompanies(data.companies);
        if (data.companies.length > 0) {
          setSelectedCompany(data.companies[0].id); // Selecciona el primer companyId por defecto...
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
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      };

      loadEmployees();
    }
  }, [selectedCompany]);

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

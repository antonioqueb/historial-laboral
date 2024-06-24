'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import Image from "next/image";

export default function DashboardEmployedList() {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await fetch("/api/getCompanyRFC");
        const data = await response.json();
        setCompanies(data.rfcs);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      async function fetchEmployees() {
        try {
          const response = await fetch("http://192.168.1.69:108/api/listAllEmployees");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const filteredEmployees = data.employees.filter(employee => employee.company.rfc === selectedCompany);
          setEmployees(filteredEmployees);
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      }

      fetchEmployees();
    }
  }, [selectedCompany]);

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Empleados</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 w-5 h-5" />
            <Input
              className="pl-10 pr-4 py-2 rounded-md bg-white shadow-sm dark:bg-zinc-800 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
              placeholder="Buscar empleados..."
              type="search"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2" variant="outline">
                <FilterIcon className="w-5 h-5" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name-filter">Nombre</Label>
                <Input className="w-full" id="name-filter" placeholder="Filtrar por nombre" type="text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-filter">Cargo</Label>
                <Select className="w-full" id="role-filter">
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="developer">Desarrollador</SelectItem>
                    <SelectItem value="designer">Diseñador</SelectItem>
                    <SelectItem value="hr">Recursos Humanos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department-filter">Departamento</Label>
                <Select className="w-full" id="department-filter">
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Ingeniería</SelectItem>
                    <SelectItem value="design">Diseño</SelectItem>
                    <SelectItem value="hr">Recursos Humanos</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

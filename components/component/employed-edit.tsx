'use client';
import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface Company {
  id: string;
  name: string;
  userId: string;
  razonSocial: string;
  rfc: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  companyId: string;
  socialSecurityNumber: string;
  CURP: string;
  RFC: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  hireDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  maritalStatus: string;
  nationality: string;
  educationLevel: string;
  gender: string;
  bloodType: string;
  jobTitle: string;
  workShift: string;
  contractType: string;
}

export default function DashboardEmployedEdit() {
  const [selectedCompanyRFC, setSelectedCompanyRFC] = useState<string | undefined>(undefined);
  const [selectedEmployeeNss, setSelectedEmployeeNss] = useState<string | undefined>(undefined);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch('/api/getUserId');
        if (res.ok) {
          const data = await res.json();
          return data.id;
        } else {
          setError('Failed to fetch user ID');
        }
      } catch (err) {
        setError('Failed to fetch user ID');
      }
    };

    const fetchCompanies = async (userId: string) => {
      try {
        const res = await fetch('/api/listCompanies');
        if (res.ok) {
          const data = await res.json();
          const userCompanies = data.companies.filter((company: Company) => company.userId === userId);
          setCompanies(userCompanies);
          return userCompanies;
        } else {
          setError('Failed to fetch companies');
        }
      } catch (err) {
        setError('Failed to fetch companies');
      }
    };

    const initializeData = async () => {
      const userId = await fetchUserId();
      if (userId) {
        await fetchCompanies(userId);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (selectedCompanyRFC) {
      const fetchEmployeesByCompanyRFC = async (rfc: string) => {
        try {
          const res = await fetch(`/api/listEmployeesByCompanyRFC?rfc=${rfc}`);
          if (res.ok) {
            const data = await res.json();
            setEmployees(data.employees);
          } else {
            setError('Failed to fetch employees');
          }
        } catch (err) {
          setError('Failed to fetch employees');
        }
      };

      fetchEmployeesByCompanyRFC(selectedCompanyRFC);
    }
  }, [selectedCompanyRFC]);

  useEffect(() => {
    if (selectedEmployeeNss) {
      const fetchEmployee = async () => {
        try {
          const res = await fetch(`/api/getEmployeeByNss?nss=${selectedEmployeeNss}`);
          if (res.ok) {
            const { employee } = await res.json();
            setEmployeeData(employee);
          } else {
            setError('Failed to fetch employee data');
          }
        } catch (err) {
          setError('Failed to fetch employee data');
        }
      };

      fetchEmployee();
    }
  }, [selectedEmployeeNss]);

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row items-start justify-start mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Editar Empleado</h1>
      </div>
      {!selectedCompanyRFC ? (
        <div>
          <Label className="mb-2" htmlFor="company">
            Seleccionar Empresa
          </Label>
          {companies.length > 0 ? (
            <Select 
              value={selectedCompanyRFC || ""}
              onValueChange={(value) => setSelectedCompanyRFC(value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar empresa" />
              </SelectTrigger>
              <SelectContent>
                {companies
                  .filter(company => company.rfc.trim() !== "") // Filtra empresas con rfc no vacíos
                  .map((company) => (
                    <SelectItem key={company.rfc} value={company.rfc}>
                      {company.razonSocial}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          ) : (
            <p>No hay empresas disponibles</p>
          )}
        </div>
      ) : !selectedEmployeeNss ? (
        <div>
          <Label className="mb-2" htmlFor="employee">
            Seleccionar Empleado
          </Label>
          {employees.length > 0 ? (
            <Select 
              value={selectedEmployeeNss || ""}
              onValueChange={(value) => setSelectedEmployeeNss(value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar empleado" />
              </SelectTrigger>
              <SelectContent>
                {employees
                  .filter(employee => employee.socialSecurityNumber.trim() !== "") // Filtra empleados con NSS no vacíos
                  .map((employee) => (
                    <SelectItem key={employee.socialSecurityNumber} value={employee.socialSecurityNumber}>
                      {employee.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          ) : (
            <p>No hay empleados disponibles</p>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
          <div className="grid gap-6 md:grid-cols-2 py-4">
            <div>
              <p><strong>Número de Seguridad Social:</strong> {employeeData?.socialSecurityNumber}</p>
              <p><strong>Nombre Completo:</strong> {employeeData?.name}</p>
              <p><strong>Fecha de Nacimiento:</strong> {employeeData?.birthDate}</p>
              <p><strong>Dirección:</strong> {employeeData?.address}</p>
              <p><strong>Número de Teléfono:</strong> {employeeData?.phoneNumber}</p>
              <p><strong>Correo Electrónico:</strong> {employeeData?.email}</p>
            </div>
            <div>
              <p><strong>Estado Civil:</strong> {employeeData?.maritalStatus}</p>
              <p><strong>Género:</strong> {employeeData?.gender}</p>
              <p><strong>Nacionalidad:</strong> {employeeData?.nationality}</p>
              <p><strong>Contacto de emergencia:</strong> {employeeData?.emergencyContact}</p>
              <p><strong>Teléfono de emergencia:</strong> {employeeData?.emergencyPhone}</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">Información Laboral</h2>
          <div className="grid gap-6 md:grid-cols-2 py-4">
            <div>
              <p><strong>Rol:</strong> {employeeData?.role}</p>
              <p><strong>Departamento:</strong> {employeeData?.department}</p>
              <p><strong>Empresa:</strong> {companies.find(company => company.id === employeeData?.companyId)?.razonSocial}</p>
              <p><strong>Título del Trabajo:</strong> {employeeData?.jobTitle}</p>
              <p><strong>Turno de Trabajo:</strong> {employeeData?.workShift}</p>
              <p><strong>Tipo de Contrato:</strong> {employeeData?.contractType}</p>
            </div>
            <div>
              <p><strong>Fecha de Contratación:</strong> {employeeData?.hireDate}</p>
              <p><strong>CURP:</strong> {employeeData?.CURP}</p>
              <p><strong>RFC:</strong> {employeeData?.RFC}</p>
              <p><strong>Nivel Educativo:</strong> {employeeData?.educationLevel}</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">Datos Sociales</h2>
          <div className="grid gap-6 md:grid-cols-2 py-4">
            <div>
              <p><strong>Tipo de Sangre:</strong> {employeeData?.bloodType}</p>
            </div>
            <div>
              <p><strong>Foto de Perfil:</strong></p>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

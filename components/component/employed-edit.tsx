import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { editEmployeeSchema } from '@/schemas/editEmployeeSchema';
import { z } from 'zod';
import { getEmployeeByNss, editEmployee, getCompaniesRFC, getUserId, getEmployeesByCompany } from '@/utils/fetchData';
import { Employee, SimpleRole, SimpleDepartment, SimpleJobTitle, SimpleWorkShift, SimpleContractType, Company } from '@/interfaces/types';

interface EditEmployeeData extends Omit<Employee, 'role' | 'department' | 'jobTitle' | 'workShift' | 'contractType'> {
  role: SimpleRole;
  department: SimpleDepartment;
  jobTitle: SimpleJobTitle;
  workShift: SimpleWorkShift;
  contractType: SimpleContractType;
}

export default function EditEmployee() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmployeeId = searchParams.get("id");

  const [employeeData, setEmployeeData] = useState<EditEmployeeData>({
    id: "",
    name: "",
    role: { id: "", name: "" },
    department: { id: "", name: "" },
    companyId: "",
    company: {
      id: "",
      name: "",
      userId: "",
      user: { id: "", email: "", name: "", companies: [] },
      employees: [],
      razonSocial: "",
      rfc: "",
      domicilioFiscalCalle: "",
      domicilioFiscalNumero: "",
      domicilioFiscalColonia: "",
      domicilioFiscalMunicipio: "",
      domicilioFiscalEstado: "",
      domicilioFiscalCodigoPostal: "",
      nombreComercial: "",
      objetoSocial: "",
      representanteLegalNombre: "",
      representanteLegalCurp: "",
      capitalSocial: 0,
      registrosImss: "",
      registrosInfonavit: "",
      giroActividadEconomica: "",
      certificaciones: [],
      reviewsGiven: [],
      logoUrl: "",
      roles: [],
      workShifts: [],
      departments: [],
      contractTypes: [],
      jobTitles: []
    },
    socialSecurityNumber: "",
    CURP: "",
    RFC: "",
    address: "",
    phoneNumber: "",
    email: "",
    birthDate: "",
    hireDate: "",
    emergencyContact: "",
    emergencyPhone: "",
    maritalStatus: "",
    nationality: "",
    educationLevel: "",
    gender: "",
    bloodType: "",
    jobTitle: { id: "", name: "" },
    workShift: { id: "", name: "" },
    contractType: { id: "", name: "" },
    profileImageUrl: null,
    createdAt: "",
    updatedAt: "",
    reviewsReceived: [],
    uploadedFiles: [],
    employeeDepartments: []
  });

  const [message, setMessage] = useState<string | null>(null);
  const [companies, setCompanies] = useState<{ id: string; name: string; rfc: string }[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getUserId();
        console.log("Fetched User ID:", userId);

        const companyRFCs = await getCompaniesRFC();
        console.log("Fetched Company RFCs:", companyRFCs);

        // Transformar los RFCs a objetos con id
        const companiesFormatted = companyRFCs.rfcs.map((rfc: string) => ({ id: rfc, name: rfc, rfc }));
        setCompanies(companiesFormatted);
      } catch (error) {
        console.error("Error fetching user data or companies:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (employeeData.company.rfc) {
      const fetchEmployees = async () => {
        try {
          console.log("Fetching employees for company RFC:", employeeData.company.rfc);

          const employeesData = await getEmployeesByCompany(employeeData.company.rfc);
          console.log("Fetched Employees Data:", employeesData);

          setEmployees(employeesData);
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      };

      fetchEmployees();
    }
  }, [employeeData.company.rfc]);

  useEffect(() => {
    if (selectedEmployee) {
      fetchEmployeeData(selectedEmployee);
    }
  }, [selectedEmployee]);

  const fetchEmployeeData = async (nss: string) => {
    try {
      console.log("Fetching data for employee NSS:", nss);
      const data = await getEmployeeByNss(nss); // Cambiado a getEmployeeByNss
      console.log("Fetched Employee Data:", data);

      if (data) {
        setEmployeeData({
          ...data,
          role: { id: data.role.id, name: data.role.name },
          department: { id: data.department.id, name: data.department.name },
          jobTitle: { id: data.jobTitle.id, name: data.jobTitle.name },
          workShift: { id: data.workShift.id, name: data.workShift.name },
          contractType: { id: data.contractType.id, name: data.contractType.name },
          birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : "",
          hireDate: data.hireDate ? new Date(data.hireDate).toISOString().split('T')[0] : "",
          profileImageUrl: data.profileImageUrl ?? null,
          companyId: data.company.id,
          company: data.company
        });
      } else {
        setMessage("Failed to fetch employee data.");
      }
    } catch (error) {
      setMessage("Failed to fetch employee data.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCompanyChange = (value: string) => {
    const selectedCompany = companies.find(company => company.rfc === value);
    console.log("Selected Company RFC:", value);
    setEmployeeData(prevState => ({
      ...prevState,
      companyId: selectedCompany?.id ?? "",
      company: {
        ...prevState.company,
        id: selectedCompany?.id ?? "", // Aseguramos que id se establece correctamente
        rfc: selectedCompany?.rfc ?? "",
        name: selectedCompany?.name ?? ""
      }
    }));
    setSelectedEmployee(""); // Reset the selected employee when company changes
    setEmployees([]); // Clear the employees list when company changes
  };

  const handleEmployeeChange = (value: string) => {
    console.log("Selected Employee NSS:", value);
    setSelectedEmployee(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      editEmployeeSchema.parse(employeeData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors.map(err => err.message).join(", "));
        return;
      }
    }

    const form = new FormData();
    Object.keys(employeeData).forEach(key => {
      const value = employeeData[key as keyof EditEmployeeData];
      if (value !== null && value !== undefined && value !== '') {
        form.append(key, value as any);
      }
    });

    try {
      const result = await editEmployee(form);

      if (result.success) {
        setMessage(`Employee updated successfully`);
        router.push('/tablero/empleados');
      } else {
        setMessage(result.error ?? "Failed to update employee");
      }
    } catch (error) {
      setMessage("Error updating employee.");
    }
  };

  return (
    <div className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <>
        <h1 className="text-3xl font-bold mb-8">Editar Empleado</h1>
        <div className="mb-4">
          <Label htmlFor="companySelect">Seleccionar Empresa</Label>
          <Select
            value={employeeData.company.rfc}
            onValueChange={handleCompanyChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar empresa" />
            </SelectTrigger>
            <SelectContent>
              {companies.map(company => (
                <SelectItem key={company.rfc} value={company.rfc}>
                  {company.name} - {company.rfc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {employeeData.company.rfc && (
          <div className="mb-4">
            <Label htmlFor="employeeSelect">Seleccionar Empleado</Label>
            <Select
              value={selectedEmployee}
              onValueChange={handleEmployeeChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar empleado" />
              </SelectTrigger>
              <SelectContent>
                {employees.map(employee => (
                  <SelectItem key={employee.socialSecurityNumber} value={employee.socialSecurityNumber}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Información General</h2>
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={employeeData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Rol</Label>
              <Input
                id="role"
                name="role"
                type="text"
                value={employeeData.role.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="department">Departamento</Label>
              <Input
                id="department"
                name="department"
                type="text"
                value={employeeData.department.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={employeeData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Información Adicional</h2>
            <div>
              <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={employeeData.birthDate ?? ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="hireDate">Fecha de Contratación</Label>
              <Input
                id="hireDate"
                name="hireDate"
                type="date"
                value={employeeData.hireDate ?? ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={employeeData.address ?? ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Número de Teléfono</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={employeeData.phoneNumber ?? ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-8 col-span-1 md:col-span-2 lg:grid-cols-3">
            <Button type="submit">Editar Empleado</Button>
            <Link href="/tablero/empleados" className="ml-2">
              <Button type="button">Cancelar</Button>
            </Link>
          </div>
        </form>
        {message && (
          <p className="text-center text-green-600 text-md italic mt-4">{message}</p>
        )}
      </>
    </div>
  );
}

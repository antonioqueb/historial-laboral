'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { editEmployeeSchema } from '@/schemas/editEmployeeSchema';
import { z } from 'zod';
import { getEmployeeByRfc, editEmployee, getCompaniesRFC, getUserId } from '@/utils/fetchData';

export default function EditEmployee() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmployeeId = searchParams.get("id");

  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
    role: { id: "", name: "" },
    department: { id: "", name: "" },
    companyId: "",
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
    profileImageUrl: null as string | null,
    createdAt: "",
    updatedAt: ""
  });

  const [message, setMessage] = useState<string | null>(null);
  const [companies, setCompanies] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await getUserId();
      const companyRFCs = await getCompaniesRFC();
      setCompanies(companyRFCs.rfcs);

      if (initialEmployeeId) {
        fetchEmployeeData(initialEmployeeId);
      }
    };

    fetchUserData();
  }, [initialEmployeeId]);

  const fetchEmployeeData = async (id: string) => {
    try {
      const data = await getEmployeeByRfc(id);
      if (data) {
        setEmployeeData({
          ...data,
          birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : "",
          hireDate: data.hireDate ? new Date(data.hireDate).toISOString().split('T')[0] : "",
          profileImageUrl: data.profileImageUrl ?? null, // Asegurarse de que sea null si es undefined
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      editEmployeeSchema.parse(employeeData); // Validar datos con Zod
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors.map(err => err.message).join(", "));
        return;
      }
    }

    const form = new FormData();
    Object.keys(employeeData).forEach(key => {
      const value = employeeData[key as keyof typeof employeeData];
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
            value={employeeData.companyId}
            onValueChange={value => setEmployeeData(prevState => ({ ...prevState, companyId: value }))}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar empresa" />
            </SelectTrigger>
            <SelectContent>
              {companies.map(companyRfc => (
                <SelectItem key={companyRfc} value={companyRfc}>
                  {companyRfc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                value={employeeData.birthDate}
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
                value={employeeData.hireDate}
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
                value={employeeData.address}
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
                value={employeeData.phoneNumber}
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

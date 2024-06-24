'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Company {
  id: string;
  razonSocial: string;
}

interface Employee {
  id: string;
  name: string;
}

export default function DashboardEmployedEdit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [employeeId, setEmployeeId] = useState<string | undefined>(undefined);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    department: '',
    description: '',
    companyId: '',
    socialSecurityNumber: '',
    CURP: '',
    RFC: '',
    address: '',
    phoneNumber: '',
    email: '',
    birthDate: '',
    hireDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    bankAccountNumber: '',
    clabeNumber: '',
    maritalStatus: '',
    nationality: '',
    educationLevel: '',
    gender: '',
    bloodType: '',
    jobTitle: '',
    workShift: '',
    contractType: '',
    profileImage: null as File | null,
  });

  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/listCompanies');
        if (res.ok) {
          const data = await res.json();
          setCompanies(data.companies);
        } else {
          setError('Failed to fetch companies');
        }
      } catch (err) {
        setError('Failed to fetch companies');
      }
    };

    const fetchEmployees = async () => {
      try {
        const res = await fetch('http://192.168.1.69:108/api/listAllEmployees');
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

    fetchCompanies();
    fetchEmployees();

    if (employeeId) {
      const fetchEmployee = async () => {
        try {
          const res = await fetch('http://192.168.1.69:108/api/listAllEmployees');
          if (res.ok) {
            const data = await res.json();
            const employee = data.employees.find((emp: any) => emp.id === employeeId);
            if (employee) {
              setFormData({
                ...employee,
                birthDate: employee.birthDate ? new Date(employee.birthDate).toISOString().split('T')[0] : '',
                hireDate: employee.hireDate ? new Date(employee.hireDate).toISOString().split('T')[0] : '',
                profileImage: null,
              });
            }
          } else {
            setError('Failed to fetch employee data');
          }
        } catch (err) {
          setError('Failed to fetch employee data');
        }
      };

      fetchEmployee();
    }
  }, [employeeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, companyId: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (value !== null && value !== undefined && value !== '') {
        form.append(key, value);
      }
    });

    try {
      const response = await fetch('/api/editEmployee', {
        method: 'PATCH',
        body: form,
      });

      if (response.ok) {
        setSuccess('Empleado actualizado exitosamente');
        router.push('/tablero/empleados/editar'); // Redireccionar a la lista de empleados
      } else {
        const data = await response.json();
        setError(data.error || 'Error al actualizar el empleado');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Administrar Empleados</h1>
      </div>
      {!employeeId ? (
        <div>
          <Label className="mb-2" htmlFor="employee">
            Seleccionar Empleado
          </Label>
          <Select value={employeeId ?? undefined} onValueChange={(value) => setEmployeeId(value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar empleado" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2 py-4">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="role">Rol</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="developer">Desarrollador</SelectItem>
                    <SelectItem value="designer">Diseñador</SelectItem>
                    <SelectItem value="hr">Recursos Humanos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="department">Departamento</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Ingeniería</SelectItem>
                    <SelectItem value="design">Diseño</SelectItem>
                    <SelectItem value="hr">Recursos Humanos</SelectItem>
                    <SelectItem value="marketing">Mercadotecnia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Ingrese una breve descripción del empleado" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="companyId">Empresa</Label>
                <Select value={formData.companyId} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.razonSocial}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="socialSecurityNumber">Número de Seguridad Social</Label>
                <Input id="socialSecurityNumber" name="socialSecurityNumber" value={formData.socialSecurityNumber} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="CURP">CURP</Label>
                <Input id="CURP" name="CURP" value={formData.CURP} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="RFC">RFC</Label>
                <Input id="RFC" name="RFC" value={formData.RFC} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="phoneNumber">Número de Teléfono</Label>
                <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <Input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="hireDate">Fecha de Contratación</Label>
                <Input type="date" id="hireDate" name="hireDate" value={formData.hireDate} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                <Input id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="emergencyPhone">Teléfono de Emergencia</Label>
                <Input id="emergencyPhone" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="bankAccountNumber">Número de Cuenta Bancaria</Label>
                <Input id="bankAccountNumber" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="clabeNumber">CLABE</Label>
                <Input id="clabeNumber" name="clabeNumber" value={formData.clabeNumber} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="maritalStatus">Estado Civil</Label>
                <Input id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="nationality">Nacionalidad</Label>
                <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="educationLevel">Nivel Educativo</Label>
                <Input id="educationLevel" name="educationLevel" value={formData.educationLevel} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="gender">Género</Label>
                <Input id="gender" name="gender" value={formData.gender} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="bloodType">Tipo de Sangre</Label>
                <Input id="bloodType" name="bloodType" value={formData.bloodType} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="jobTitle">Título del Trabajo</Label>
                <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="workShift">Turno de Trabajo</Label>
                <Input id="workShift" name="workShift" value={formData.workShift} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="contractType">Tipo de Contrato</Label>
                <Input id="contractType" name="contractType" value={formData.contractType} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="profileImage">Foto de Perfil</Label>
                <Input type="file" id="profileImage" name="profileImage" onChange={handleFileChange} />
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <Button type="submit">Actualizar</Button>
        </form>
      )}
    </div>
  );
  
}

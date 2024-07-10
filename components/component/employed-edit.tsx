'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import { editEmployeeSchema } from "@/schemas/editEmployeeSchema"; // Import the schema
import { z } from "zod";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [civilStatuses, setCivilStatuses] = useState<string[]>([]);
  const [bloodTypes, setBloodTypes] = useState<string[]>([]);
  const [selectedCompanyRFC, setSelectedCompanyRFC] = useState<string | undefined>(undefined);
  const [selectedEmployeeNss, setSelectedEmployeeNss] = useState<string | undefined>(undefined);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    department: '',
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
  const [nationalities, setNationalities] = useState<{ sigla: string; nombre: string; nombreIngles: string }[]>([]);
  const [filteredNationalities, setFilteredNationalities] = useState<{ sigla: string; nombre: string; nombreIngles: string }[]>([]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch('https://historiallaboral.com/api/getUserId');
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
        const res = await fetch('https://historiallaboral.com/api/listCompanies');
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
          const res = await fetch(`https://historiallaboral.com/api/listEmployeesByCompanyRFC?rfc=${rfc}`);
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
          const res = await fetch(`https://historiallaboral.com/api/getEmployeeByNss?nss=${selectedEmployeeNss}`);
          if (res.ok) {
            const { employee } = await res.json();
            console.log('Employee data fetched:', employee); // Debugging line
            setFormData({
              ...employee,
              birthDate: employee.birthDate ? new Date(employee.birthDate).toISOString().split('T')[0] : '',
              hireDate: employee.hireDate ? new Date(employee.hireDate).toISOString().split('T')[0] : '',
              profileImage: null,
            });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    try {
      editEmployeeSchema.parse(formData); // Validate formData with Zod
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map(err => err.message).join(", "));
        return;
      }
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (value !== null && value !== undefined && value !== '') {
        form.append(key, value);
      }
    });

    try {
      const response = await fetch('https://historiallaboral.com/api/editEmployee', {
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

  const loadBloodTypes = async () => {
    try {
      const response = await fetch('/api/bloodTypes');
      const data = await response.json();
      setBloodTypes(data.bloodTypes);
    } catch (error) {
      console.error('Error loading blood types:', error);
    }
  };

  const loadGenders = async () => {
    try {
      const response = await fetch('/api/Genders');
      const data = await response.json();
      setGenders(data.genders);
    } catch (error) {
      console.error('Error loading genders:', error);
    }
  };

  const loadCivilStatuses = async () => {
    try {
      const response = await fetch('/api/CivilStatus');
      const data = await response.json();
      setCivilStatuses(data.civilStatuses);
    } catch (error) {
      console.error('Error loading civil statuses:', error);
    }
  };

  const loadNationalities = async () => {
    try {
      const response = await fetch('/api/Nationalities');
      const data = await response.json();
      setNationalities(data.nationalities);
      setFilteredNationalities(data.nationalities); // Inicializa con todas las nacionalidades
    } catch (error) {
      console.error('Error loading nationalities:', error);
    }
  };
  
  useEffect(() => {
    loadBloodTypes();
    loadGenders();
    loadCivilStatuses();
    loadNationalities();
  }, []);

  const handleNationalitySearch = (searchTerm: string) => {
    const filtered = nationalities.filter(nationality =>
      nationality.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNationalities(filtered);
  };

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
          <Select value={selectedCompanyRFC ?? undefined} onValueChange={(value) => setSelectedCompanyRFC(value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar empresa" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.rfc} value={company.rfc}>
                  {company.razonSocial}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : !selectedEmployeeNss ? (
        <div>
          <Label className="mb-2" htmlFor="employee">
            Seleccionar Empleado
          </Label>
          <Select value={selectedEmployeeNss ?? undefined} onValueChange={(value) => setSelectedEmployeeNss(value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar empleado" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee.socialSecurityNumber} value={employee.socialSecurityNumber}>
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
                <Label htmlFor="socialSecurityNumber">Número de Seguridad Social</Label>
                <Input id="socialSecurityNumber" name="socialSecurityNumber" value={formData.socialSecurityNumber} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="name">Nombre Completo</Label>
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
                <Label htmlFor="companyId">Empresa</Label>
                <Select value={formData.companyId} onValueChange={(value) => setFormData({ ...formData, companyId: value })} required>
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
                <Label htmlFor="maritalStatus">Estado Civil</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado civil" />
                  </SelectTrigger>
                  <SelectContent>
                    {civilStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="nationality">Nacionalidad</Label>
                <Select value={formData.nationality} onValueChange={(value) => setFormData({ ...formData, nationality: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nacionalidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      onChange={(e) => handleNationalitySearch(e.target.value)}
                      className="mb-2"
                    />
                    {filteredNationalities.map((nationality) => (
                      <SelectItem key={nationality.sigla} value={nationality.nombre}>
                        {nationality.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="educationLevel">Nivel Educativo</Label>
                <Input id="educationLevel" name="educationLevel" value={formData.educationLevel} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="gender">Género</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar género" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
                <Label htmlFor="bloodType">Tipo de Sangre</Label>
                <Select value={formData.bloodType} onValueChange={(value) => setFormData({ ...formData, bloodType: value })} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de sangre" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          <div className="flex justify-end mt-4">
            <Button type="submit">Actualizar</Button>
            <Link href="/tablero/empleados" className="ml-2">
              <Button type="button">Cancelar</Button>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

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
import { getEmployeeByNss, editEmployee, getCompaniesRFC, getUserId, getEmployeesByCompany, getBloodTypes, getCivilStatuses, getEducationLevels, getGenders, getNationalities, getDepartmentsByCompany, createDepartment, editDepartment, deleteDepartment, getRolesByCompany, createRole, editRole, deleteRole } from '@/utils/fetchData';
import { Employee, SimpleRole, SimpleDepartment, SimpleJobTitle, SimpleWorkShift, SimpleContractType, Company, Department, Role } from '@/interfaces/types';

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
  const [bloodTypes, setBloodTypes] = useState<string[]>([]);
  const [civilStatuses, setCivilStatuses] = useState<string[]>([]);
  const [educationLevels, setEducationLevels] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [nationalities, setNationalities] = useState<{ sigla: string, nombre: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNationalities, setFilteredNationalities] = useState<{ sigla: string, nombre: string }[]>([]);

// Departament
const [departments, setDepartments] = useState<Department[]>([]);
const [newDepartmentName, setNewDepartmentName] = useState("");
const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
const [isCreating, setIsCreating] = useState(false);

// Roles
const [roles, setRoles] = useState<Role[]>([]);
const [newRoleName, setNewRoleName] = useState("");
const [editingRole, setEditingRole] = useState<Role | null>(null);
const [isCreatingRole, setIsCreatingRole] = useState(false);



  

  useEffect(() => {
    setFilteredNationalities(
      nationalities.filter(nat => nat.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, nationalities]);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getUserId();
        console.log("Fetched User ID:", userId);

        const companyRFCs = await getCompaniesRFC();
        console.log("Fetched Company RFCs:", companyRFCs);

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

  useEffect(() => {
    const fetchData = async () => {
      const [types, statuses, levels, gendersData, nationalitiesData] = await Promise.all([
        getBloodTypes(),
        getCivilStatuses(),
        getEducationLevels(),
        getGenders(),
        getNationalities()
      ]);
      setBloodTypes(types);
      setCivilStatuses(statuses);
      setEducationLevels(levels);
      setGenders(gendersData);
      setNationalities(nationalitiesData);
    };
  
    fetchData();
  }, []);
  
  
  

  const fetchEmployeeData = async (nss: string) => {
    try {
      console.log("Fetching data for employee NSS:", nss);
      const data = await getEmployeeByNss(nss);
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
          companyId: data.companyId,
          company: { ...employeeData.company, id: data.companyId }
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
        id: selectedCompany?.id ?? "",
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

  // Departament

  useEffect(() => {
    if (employeeData.company.rfc) {
      const fetchDepartments = async () => {
        try {
          const departmentsData = await getDepartmentsByCompany(employeeData.company.rfc);
          setDepartments(departmentsData);
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      };
  
      fetchDepartments();
    }
  }, [employeeData.company.rfc]);
  
  const handleCreateDepartment = async () => {
    if (!newDepartmentName) return;
    try {
      const newDepartment = await createDepartment(employeeData.company.rfc, newDepartmentName);
      setDepartments([...departments, newDepartment]);
      setNewDepartmentName("");
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };
  
  const handleEditDepartment = async () => {
    if (!editingDepartment) return;
    try {
      await editDepartment(employeeData.company.rfc, editingDepartment.id, editingDepartment.name);
      setDepartments(departments.map(d => d.id === editingDepartment.id ? editingDepartment : d));
      setEditingDepartment(null);
    } catch (error) {
      console.error("Error editing department:", error);
    }
  };
  
  const handleDeleteDepartment = async (id: string) => {
    try {
      await deleteDepartment(employeeData.company.rfc, id);
      setDepartments(departments.filter(d => d.id !== id));
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  // Roles

  useEffect(() => {
    if (employeeData.company.rfc) {
      const fetchRoles = async () => {
        try {
          const rolesData = await getRolesByCompany(employeeData.company.rfc);
          setRoles(rolesData);
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      };
  
      fetchRoles();
    }
  }, [employeeData.company.rfc]);
  
  const handleCreateRole = async () => {
    if (!newRoleName) return;
    try {
      const newRole = await createRole(employeeData.company.rfc, newRoleName);
      setRoles([...roles, newRole]);
      setNewRoleName("");
      setIsCreatingRole(false);
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };
  
  const handleEditRole = async () => {
    if (!editingRole) return;
    try {
      await editRole(employeeData.company.rfc, editingRole.id, editingRole.name);
      setRoles(roles.map(r => r.id === editingRole.id ? editingRole : r));
      setEditingRole(null);
    } catch (error) {
      console.error("Error editing role:", error);
    }
  };
  
  const handleDeleteRole = async (id: string) => {
    try {
      await deleteRole(employeeData.company.rfc, id);
      setRoles(roles.filter(r => r.id !== id));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };
  
  

  return (
    <div className="container mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <main>
        <header>
          <h1 className="text-3xl font-bold mb-8">Editar Empleado</h1>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Seleccionar Empresa y Empleado</h2>
          <div className="mb-4">
            <Label htmlFor="companySelect">Seleccionar Empresa</Label>
            <Select
              value={employeeData.company.rfc || ''}
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
                value={selectedEmployee || ''}
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
        </section>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Información General</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={employeeData.name || ''}
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
                  value={employeeData.email || ''}
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
                  value={employeeData.phoneNumber || ''}
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
                  value={employeeData.address || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Información Laboral</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Gestión de Roles</h2>
            <div className="mb-4">
              <Label htmlFor="roleSelect">Seleccionar Rol</Label>
              <Select
                value={employeeData.role.id || ''}
                onValueChange={(value) => {
                  const selectedRole = roles.find(role => role.id === value);
                  setEmployeeData({ ...employeeData, role: { id: value, name: selectedRole?.name || '' } });
                }}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              {roles.map(role => (
                <div key={role.id} className="flex justify-between items-center">
                  <span>{role.name}</span>
                  <div className="space-x-2">
                    <Button onClick={() => setEditingRole(role)}>Editar</Button>
                    <Button onClick={() => handleDeleteRole(role.id)}>Eliminar</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              {isCreatingRole ? (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Nuevo nombre del rol"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                  />
                  <Button onClick={handleCreateRole}>Crear</Button>
                  <Button onClick={() => setIsCreatingRole(false)}>Cancelar</Button>
                </div>
              ) : (
                <Button onClick={() => setIsCreatingRole(true)}>Añadir Rol</Button>
              )}
            </div>
          </section>
              <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Gestión de Departamentos</h2>
              <div className="mb-4">
                <Label htmlFor="departmentSelect">Seleccionar Departamento</Label>
                <Select
                  value={employeeData.department.id || ''}
                  onValueChange={(value) => {
                    const selectedDepartment = departments.find(dept => dept.id === value);
                    setEmployeeData({ ...employeeData, department: { id: value, name: selectedDepartment?.name || '' } });
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(department => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-2">
                {departments.map(department => (
                  <div key={department.id} className="flex justify-between items-center">
                    <span>{department.name}</span>
                    <div className="space-x-2">
                      <Button onClick={() => setEditingDepartment(department)}>Editar</Button>
                      <Button onClick={() => handleDeleteDepartment(department.id)}>Eliminar</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                {isCreating ? (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Nuevo nombre del departamento"
                      value={newDepartmentName}
                      onChange={(e) => setNewDepartmentName(e.target.value)}
                    />
                    <Button onClick={handleCreateDepartment}>Crear</Button>
                    <Button onClick={() => setIsCreating(false)}>Cancelar</Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsCreating(true)}>Añadir Departamento</Button>
                )}
              </div>
            </section>
              <div>
                <Label htmlFor="jobTitle">Título del Puesto</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={employeeData.jobTitle.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="workShift">Turno de Trabajo</Label>
                <Input
                  id="workShift"
                  name="workShift"
                  type="text"
                  value={employeeData.workShift.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contractType">Tipo de Contrato</Label>
                <Input
                  id="contractType"
                  name="contractType"
                  type="text"
                  value={employeeData.contractType.name || ''}
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
                  value={employeeData.hireDate || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={employeeData.birthDate || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyContact">Nombre del Contacto de Emergencia</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="text"
                  value={employeeData.emergencyContact || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Teléfono del Contacto de Emergencia</Label>
                <Input
                  id="emergencyPhone"
                  name="emergencyPhone"
                  type="text"
                  value={employeeData.emergencyPhone || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                  <Label htmlFor="maritalStatus">Estado Civil</Label>
                  <Select
                    value={employeeData.maritalStatus || ''}
                    onValueChange={(value) => setEmployeeData({ ...employeeData, maritalStatus: value })}
                    required
                  >
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
                <div>
                <Label htmlFor="nationality">Nacionalidad</Label>
                <Select
                  value={employeeData.nationality || ''}
                  onValueChange={(value) => setEmployeeData({ ...employeeData, nationality: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nacionalidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-4 py-2">
                      <Input
                        placeholder="Buscar nacionalidad"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    {filteredNationalities.map((nationality) => (
                      <SelectItem key={nationality.sigla} value={nationality.nombre}>
                        {nationality.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="educationLevel">Nivel Educativo</Label>
                <Select
                  value={employeeData.educationLevel || ''}
                  onValueChange={(value) => setEmployeeData({ ...employeeData, educationLevel: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nivel educativo" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
              <Label htmlFor="gender">Género</Label>
              <Select
                value={employeeData.gender || ''}
                onValueChange={(value) => setEmployeeData({ ...employeeData, gender: value })}
                required
              >
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
              <div>
                <Label htmlFor="bloodType">Tipo de Sangre</Label>
                <Select
                  value={employeeData.bloodType || ''}
                  onValueChange={(value) => setEmployeeData({ ...employeeData, bloodType: value })}
                  required
                >
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
            </div>
          </section>

          <section className="flex justify-end">
            <Button type="submit">Editar Empleado</Button>
            <Link href="/tablero/empleados" className="ml-2">
              <Button type="button">Cancelar</Button>
            </Link>
          </section>
        </form>

        {message && (
          <p className="text-center text-green-600 text-md italic mt-4">{message}</p>
        )}
      </main>
    </div>
  );
}

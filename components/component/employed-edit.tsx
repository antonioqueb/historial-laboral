'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from 'react-icons/fa';
import { editEmployeeSchema } from '@/schemas/editEmployeeSchema';
import { z } from 'zod';
import {
  getEmployeeByNss, editEmployee, getCompaniesRFC, getUserId, getEmployeesByCompany, getBloodTypes,
  getCivilStatuses, getEducationLevels, getGenders, getNationalities, getDepartmentsByCompany,
  createDepartment, editDepartment, deleteDepartment, getRolesByCompany, createRole, editRole,
  deleteRole, getContractTypesByCompany, createContractType, editContractType, deleteContractType,
  getJobTitlesByCompany, createJobTitle, editJobTitle, deleteJobTitle, getWorkShiftsByCompany,
  createWorkShift, editWorkShift, deleteWorkShift
} from '@/utils/fetchData';
import { Employee, SimpleRole, SimpleDepartment, SimpleJobTitle, SimpleWorkShift, SimpleContractType, Company, Department, Role, ContractType, JobTitle, WorkShift } from '@/interfaces/types';
import CompanyCard from '@/components/component/CompanyCard';
import EmployeeCard from '@/components/component/EmployeeCard'; // Importa tu componente EmployeeCard

interface EditEmployeeData extends Omit<Employee, 'role' | 'department' | 'jobTitle' | 'workShift' | 'contractType'> {
  role: SimpleRole;
  department: SimpleDepartment;
  jobTitle: SimpleJobTitle;
  workShift: SimpleWorkShift;
  contractType: SimpleContractType;
  profileImage: File | null;
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
    jobTitle: { id: "", name: "" },
    workShift: { id: "", name: "" },
    contractType: { id: "", name: "" },
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
    profileImage: null,
    createdAt: "",
    updatedAt: "",
    reviewsReceived: [],
    uploadedFiles: [],
    employeeDepartments: []
  });

  const [message, setMessage] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
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

  // ContractType
  const [contractTypes, setContractTypes] = useState<ContractType[]>([]);
  const [newContractTypeName, setNewContractTypeName] = useState("");
  const [editingContractType, setEditingContractType] = useState<ContractType | null>(null);
  const [isCreatingContractType, setIsCreatingContractType] = useState(false);

  // JobTitle
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
  const [newJobTitleName, setNewJobTitleName] = useState("");
  const [editingJobTitle, setEditingJobTitle] = useState<JobTitle | null>(null);
  const [isCreatingJobTitle, setIsCreatingJobTitle] = useState(false);

  // workShifts
  const [workShifts, setWorkShifts] = useState<WorkShift[]>([]);
  const [newWorkShiftName, setNewWorkShiftName] = useState("");
  const [editingWorkShift, setEditingWorkShift] = useState<WorkShift | null>(null);
  const [isCreatingWorkShift, setIsCreatingWorkShift] = useState(false);

  // Estados adicionales para controlar la visibilidad de los formularios
  const [companySelected, setCompanySelected] = useState<boolean>(false);
  const [employeeSelected, setEmployeeSelected] = useState<boolean>(false);

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

        const defaultCompany: Company = {
          id: '',
          name: '',
          userId: '',
          user: { id: '', email: '', name: '', companies: [] },
          employees: [],
          razonSocial: '',
          rfc: '',
          domicilioFiscalCalle: '',
          domicilioFiscalNumero: '',
          domicilioFiscalColonia: '',
          domicilioFiscalMunicipio: '',
          domicilioFiscalEstado: '',
          domicilioFiscalCodigoPostal: '',
          nombreComercial: '',
          objetoSocial: '',
          representanteLegalNombre: '',
          representanteLegalCurp: '',
          capitalSocial: 0,
          registrosImss: '',
          registrosInfonavit: '',
          giroActividadEconomica: '',
          certificaciones: [],
          reviewsGiven: [],
          logoUrl: '',
          roles: [],
          workShifts: [],
          departments: [],
          contractTypes: [],
          jobTitles: []
        };

        const companiesFormatted = companyRFCs.map((company: Company) => ({
          ...defaultCompany,
          id: company.rfc,
          name: company.name,
          rfc: company.rfc
        }));

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

  useEffect(() => {
    if (employeeData.company.rfc) {
      const fetchContractTypes = async () => {
        try {
          const contractTypesData = await getContractTypesByCompany(employeeData.company.rfc);
          setContractTypes(contractTypesData);
        } catch (error) {
          console.error("Error fetching contract types:", error);
        }
      };

      fetchContractTypes();
    }
  }, [employeeData.company.rfc]);

  useEffect(() => {
    if (employeeData.company.rfc) {
      const fetchJobTitles = async () => {
        try {
          const jobTitlesData = await getJobTitlesByCompany(employeeData.company.rfc);
          setJobTitles(jobTitlesData);
        } catch (error) {
          console.error("Error fetching job titles:", error);
        }
      };

      fetchJobTitles();
    }
  }, [employeeData.company.rfc]);

  useEffect(() => {
    if (employeeData.company.rfc) {
      const fetchWorkShifts = async () => {
        try {
          const workShiftsData = await getWorkShiftsByCompany(employeeData.company.rfc);
          setWorkShifts(workShiftsData);
        } catch (error) {
          console.error("Error fetching work shifts:", error);
        }
      };

      fetchWorkShifts();
    }
  }, [employeeData.company.rfc]);

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
          profileImage: null, // Aquí puedes asignar el valor actual de la imagen o dejarlo como null si no está disponible
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEmployeeData({ ...employeeData, profileImage: e.target.files[0] });
    }
  };

  const handleCompanyChange = (company: Company) => {
    console.log("Selected Company RFC:", company.rfc);
    setEmployeeData(prevState => ({
      ...prevState,
      companyId: company.id ?? "",
      company: {
        ...prevState.company,
        id: company.id ?? "",
        rfc: company.rfc ?? "",
        name: company.name ?? ""
      }
    }));
    setSelectedEmployee(""); // Reset the selected employee when company changes
    setEmployees([]); // Clear the employees list when company changes
    setCompanySelected(true); // Marcar empresa como seleccionada
    setEmployeeSelected(false); // Asegurar que el empleado no esté seleccionado
  };

  const handleEmployeeChange = (value: string) => {
    console.log("Selected Employee NSS:", value);
    setSelectedEmployee(value);
    setEmployeeSelected(true); // Marcar empleado como seleccionado
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
      if (key === "profileImage" && value instanceof File) {
        form.append(key, value);
      } else if (typeof value === 'object' && value !== null && 'id' in value) {
        form.append(key, (value as { id: string }).id);
      } else if (value !== null && value !== undefined) {
        form.append(key, value as any);
      }
    });
  
    // Log del formData antes de enviar
    console.log('FormData contents:');
    form.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    try {
      const result = await editEmployee(form);
  
      if (result.success) {
        setMessage(`Employee updated successfully`);
        router.push('/tablero/empleados');
      } else {
        console.error('Error from editEmployee API:', result.error);
        setMessage(result.error ?? "Failed to update employee");
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setMessage("Error updating employee.");
    }
  };

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

  const handleCreateContractType = async () => {
    if (!newContractTypeName) return;
    try {
      const newContractType = await createContractType(employeeData.company.rfc, newContractTypeName);
      setContractTypes([...contractTypes, newContractType]);
      setNewContractTypeName("");
      setIsCreatingContractType(false);
    } catch (error) {
      console.error("Error creating contract type:", error);
    }
  };

  const handleEditContractType = async () => {
    if (!editingContractType) return;
    try {
      await editContractType(employeeData.company.rfc, editingContractType.id, editingContractType.name);
      setContractTypes(contractTypes.map(ct => ct.id === editingContractType.id ? editingContractType : ct));
      setEditingContractType(null);
    } catch (error) {
      console.error("Error editing contract type:", error);
    }
  };

  const handleDeleteContractType = async (id: string) => {
    try {
      await deleteContractType(employeeData.company.rfc, id);
      setContractTypes(contractTypes.filter(ct => ct.id !== id));
    } catch (error) {
      console.error("Error deleting contract type:", error);
    }
  };

  const handleCreateJobTitle = async () => {
    if (!newJobTitleName) return;
    try {
      const newJobTitle = await createJobTitle(employeeData.company.rfc, newJobTitleName);
      setJobTitles([...jobTitles, newJobTitle]);
      setNewJobTitleName("");
      setIsCreatingJobTitle(false);
    } catch (error) {
      console.error("Error creating job title:", error);
    }
  };

  const handleEditJobTitle = async () => {
    if (!editingJobTitle) return;
    try {
      await editJobTitle(employeeData.company.rfc, editingJobTitle.id, editingJobTitle.name);
      setJobTitles(jobTitles.map(jt => jt.id === editingJobTitle.id ? editingJobTitle : jt));
      setEditingJobTitle(null);
    } catch (error) {
      console.error("Error editing job title:", error);
    }
  };

  const handleDeleteJobTitle = async (id: string) => {
    try {
      await deleteJobTitle(employeeData.company.rfc, id);
      setJobTitles(jobTitles.filter(jt => jt.id !== id));
    } catch (error) {
      console.error("Error deleting job title:", error);
    }
  };

  const handleCreateWorkShift = async () => {
    if (!newWorkShiftName) return;
    try {
      const newWorkShift = await createWorkShift(employeeData.company.rfc, newWorkShiftName);
      setWorkShifts([...workShifts, newWorkShift]);
      setNewWorkShiftName("");
      setIsCreatingWorkShift(false);
    } catch (error) {
      console.error("Error creating work shift:", error);
    }
  };

  const handleEditWorkShift = async () => {
    if (!editingWorkShift) return;
    try {
      await editWorkShift(employeeData.company.rfc, editingWorkShift.id, editingWorkShift.name);
      setWorkShifts(workShifts.map(ws => ws.id === editingWorkShift.id ? editingWorkShift : ws));
      setEditingWorkShift(null);
    } catch (error) {
      console.error("Error editing work shift:", error);
    }
  };

  const handleDeleteWorkShift = async (id: string) => {
    try {
      await deleteWorkShift(employeeData.company.rfc, id);
      setWorkShifts(workShifts.filter(ws => ws.id !== id));
    } catch (error) {
      console.error("Error deleting work shift:", error);
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
          {!companySelected && (
            <div className="mb-4">
              <Label htmlFor="companySelect" className="block mb-2">Seleccionar Empresa</Label>
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companies.map(company => (
                    <div key={company.rfc} onClick={() => handleCompanyChange(company)}>
                      <CompanyCard company={company} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {companySelected && !employeeSelected && (
            <div className="mb-4">
              <Label htmlFor="employeeSelect" className="block mb-2">Seleccionar Empleado</Label>
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {employees.map(employee => (
                    <div key={employee.socialSecurityNumber} onClick={() => handleEmployeeChange(employee.socialSecurityNumber)}>
                      <EmployeeCard employee={employee} onClick={() => handleEmployeeChange(employee.socialSecurityNumber)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {employeeSelected && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Información General</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="block mb-2">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={employeeData.name || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block mb-2">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={employeeData.email || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="block mb-2">Número de Teléfono</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={employeeData.phoneNumber || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="block mb-2">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={employeeData.address || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Información Laboral</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="role" className="block mb-2">Rol</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-full">
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="ml-2">
                          <FaEdit />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Roles</DialogTitle>
                          <DialogDescription>
                            Gestiona roles desde aquí.
                          </DialogDescription>
                        </DialogHeader>
                        <section className="mb-8">
                          <h2 className="text-xl font-semibold mb-4">Roles</h2>
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
                                  className="w-full"
                                />
                                <Button onClick={handleCreateRole}>Crear</Button>
                                <Button onClick={() => setIsCreatingRole(false)}>Cancelar</Button>
                              </div>
                            ) : (
                              <Button onClick={() => setIsCreatingRole(true)}>Añadir Rol</Button>
                            )}
                          </div>
                        </section>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div>
                  <Label htmlFor="department" className="block mb-2">Departamento</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-full">
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="ml-2">
                          <FaEdit />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Departamentos</DialogTitle>
                          <DialogDescription>
                            Gestiona departamentos desde aquí.
                          </DialogDescription>
                        </DialogHeader>
                        <section className="mb-8">
                          <h2 className="text-xl font-semibold mb-4">Departamentos</h2>
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
                                  className="w-full"
                                />
                                <Button onClick={handleCreateDepartment}>Crear</Button>
                                <Button onClick={() => setIsCreating(false)}>Cancelar</Button>
                              </div>
                            ) : (
                              <Button onClick={() => setIsCreating(true)}>Añadir Departamento</Button>
                            )}
                          </div>
                        </section>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div>
                  <Label htmlFor="jobTitle" className="block mb-2">Título del Puesto</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-full">
                      <Select
                        value={employeeData.jobTitle.id || ''}
                        onValueChange={(value) => {
                          const selectedJobTitle = jobTitles.find(jt => jt.id === value);
                          setEmployeeData({ ...employeeData, jobTitle: { id: value, name: selectedJobTitle?.name || '' } });
                        }}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar título del puesto" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTitles.map(jobTitle => (
                            <SelectItem key={jobTitle.id} value={jobTitle.id}>
                              {jobTitle.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="ml-2">
                          <FaEdit />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Títulos de Trabajo</DialogTitle>
                          <DialogDescription>
                            Gestiona títulos de trabajo desde aquí.
                          </DialogDescription>
                        </DialogHeader>
                        <section className="mb-8">
                          <h2 className="text-xl font-semibold mb-4">Títulos de Trabajo</h2>
                          <div className="flex flex-col space-y-2">
                            {jobTitles.map(jobTitle => (
                              <div key={jobTitle.id} className="flex justify-between items-center">
                                <span>{jobTitle.name}</span>
                                <div className="space-x-2">
                                  <Button onClick={() => setEditingJobTitle(jobTitle)}>Editar</Button>
                                  <Button onClick={() => handleDeleteJobTitle(jobTitle.id)}>Eliminar</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4">
                            {isCreatingJobTitle ? (
                              <div className="flex space-x-2">
                                <Input
                                  placeholder="Nuevo nombre del título de trabajo"
                                  value={newJobTitleName}
                                  onChange={(e) => setNewJobTitleName(e.target.value)}
                                  className="w-full"
                                />
                                <Button onClick={handleCreateJobTitle}>Crear</Button>
                                <Button onClick={() => setIsCreatingJobTitle(false)}>Cancelar</Button>
                              </div>
                            ) : (
                              <Button onClick={() => setIsCreatingJobTitle(true)}>Añadir Título de Trabajo</Button>
                            )}
                          </div>
                        </section>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div>
                  <Label htmlFor="workShift" className="block mb-2">Turno de Trabajo</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-full">
                      <Select
                        value={employeeData.workShift.id || ''}
                        onValueChange={(value) => {
                          const selectedWorkShift = workShifts.find(ws => ws.id === value);
                          setEmployeeData({ ...employeeData, workShift: { id: value, name: selectedWorkShift?.name || '' } });
                        }}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar turno de trabajo" />
                        </SelectTrigger>
                        <SelectContent>
                          {workShifts.map(workShift => (
                            <SelectItem key={workShift.id} value={workShift.id}>
                              {workShift.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="ml-2">
                          <FaEdit />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Turnos de Trabajo</DialogTitle>
                          <DialogDescription>
                            Gestiona turnos de trabajo desde aquí.
                          </DialogDescription>
                        </DialogHeader>
                        <section className="mb-8">
                          <h2 className="text-xl font-semibold mb-4">Turnos de Trabajo</h2>
                          <div className="flex flex-col space-y-2">
                            {workShifts.map(workShift => (
                              <div key={workShift.id} className="flex justify-between items-center">
                                <span>{workShift.name}</span>
                                <div className="space-x-2">
                                  <Button onClick={() => setEditingWorkShift(workShift)}>Editar</Button>
                                  <Button onClick={() => handleDeleteWorkShift(workShift.id)}>Eliminar</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4">
                            {isCreatingWorkShift ? (
                              <div className="flex space-x-2">
                                <Input
                                  placeholder="Nuevo nombre del turno de trabajo"
                                  value={newWorkShiftName}
                                  onChange={(e) => setNewWorkShiftName(e.target.value)}
                                  className="w-full"
                                />
                                <Button onClick={handleCreateWorkShift}>Crear</Button>
                                <Button onClick={() => setIsCreatingWorkShift(false)}>Cancelar</Button>
                              </div>
                            ) : (
                              <Button onClick={() => setIsCreatingWorkShift(true)}>Añadir Turno de Trabajo</Button>
                            )}
                          </div>
                        </section>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div>
                  <Label htmlFor="contractType" className="block mb-2">Tipo de Contrato</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-full">
                      <Select
                        value={employeeData.contractType.id || ''}
                        onValueChange={(value) => {
                          const selectedContractType = contractTypes.find(ct => ct.id === value);
                          setEmployeeData({ ...employeeData, contractType: { id: value, name: selectedContractType?.name || '' } });
                        }}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo de contrato" />
                        </SelectTrigger>
                        <SelectContent>
                          {contractTypes.map(contractType => (
                            <SelectItem key={contractType.id} value={contractType.id}>
                              {contractType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="ml-2">
                          <FaEdit />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Tipos de Contrato</DialogTitle>
                          <DialogDescription>
                            Gestiona tipos de contrato desde aquí.
                          </DialogDescription>
                        </DialogHeader>
                        <section className="mb-8">
                          <h2 className="text-xl font-semibold mb-4">Tipos de Contrato</h2>
                          <div className="flex flex-col space-y-2">
                            {contractTypes.map(contractType => (
                              <div key={contractType.id} className="flex justify-between items-center">
                                <span>{contractType.name}</span>
                                <div className="space-x-2">
                                  <Button onClick={() => setEditingContractType(contractType)}>Editar</Button>
                                  <Button onClick={() => handleDeleteContractType(contractType.id)}>Eliminar</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4">
                            {isCreatingContractType ? (
                              <div className="flex space-x-2">
                                <Input
                                  placeholder="Nuevo nombre del tipo de contrato"
                                  value={newContractTypeName}
                                  onChange={(e) => setNewContractTypeName(e.target.value)}
                                  className="w-full"
                                />
                                <Button onClick={handleCreateContractType}>Crear</Button>
                                <Button onClick={() => setIsCreatingContractType(false)}>Cancelar</Button>
                              </div>
                            ) : (
                              <Button onClick={() => setIsCreatingContractType(true)}>Añadir Tipo de Contrato</Button>
                            )}
                          </div>
                        </section>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div>
                  <Label htmlFor="hireDate" className="block mb-2">Fecha de Contratación</Label>
                  <Input
                    id="hireDate"
                    name="hireDate"
                    type="date"
                    value={employeeData.hireDate || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="birthDate" className="block mb-2">Fecha de Nacimiento</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={employeeData.birthDate || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact" className="block mb-2">Nombre del Contacto de Emergencia</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    type="text"
                    value={employeeData.emergencyContact || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone" className="block mb-2">Teléfono del Contacto de Emergencia</Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="text"
                    value={employeeData.emergencyPhone || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="maritalStatus" className="block mb-2">Estado Civil</Label>
                  <div className="w-full">
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
                </div>
                <div>
                  <Label htmlFor="nationality" className="block mb-2">Nacionalidad</Label>
                  <div className="w-full">
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
                            className="w-full"
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
                </div>
                <div>
                  <Label htmlFor="educationLevel" className="block mb-2">Nivel Educativo</Label>
                  <div className="w-full">
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
                </div>
                <div>
                  <Label htmlFor="gender" className="block mb-2">Género</Label>
                  <div className="w-full">
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
                </div>
                <div>
                  <Label htmlFor="bloodType" className="block mb-2">Tipo de Sangre</Label>
                  <div className="w-full">
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
              </div>
            </section>

            <section className="flex justify-end">
              <Button type="submit">Editar Empleado</Button>
              <Link href="/tablero/empleados" className="ml-2">
                <Button type="button">Cancelar</Button>
              </Link>
            </section>
          </form>
        )}

        {message && (
          <p className="text-center text-green-600 text-md italic mt-4">{message}</p>
        )}
      </main>
    </div>
  );
}

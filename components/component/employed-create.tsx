// components\component\employed-create.tsx
'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { getCompaniesList, createEmployee, Company, uploadEmployeeFiles } from "@/utils/fetchData";
import { z } from "zod";
import createEmployedSchema from "@/schemas/createEmployedSchema";

// Definición de la estructura de los datos del formulario
interface FormData {
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
  jobTitle: string; // Cambiado para asegurar que almacene el id
  workShift: string; // Cambiado para asegurar que almacene el id
  contractType: string; // Cambiado para asegurar que almacene el id
  profileImage: File | null;
}


export default function DashboardEmployedAdmin() {
  // Estados del formulario
  const [formData, setFormData] = useState<FormData>({
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
    profileImage: null,
  });

  // Estados para datos adicionales
  const [educationLevels, setEducationLevels] = useState<string[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [bloodTypes, setBloodTypes] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [civilStatuses, setCivilStatuses] = useState<string[]>([]);
  const [nationalities, setNationalities] = useState<{ sigla: string; nombre: string; nombreIngles: string }[]>([]);
  const [filteredNationalities, setFilteredNationalities] = useState<{ sigla: string; nombre: string; nombreIngles: string }[]>([]);
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<{ id: string; name: string }[]>(roles);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [contractTypes, setContractTypes] = useState<{ id: string; name: string }[]>([]);
  const [jobTitles, setJobTitles] = useState<{ id: string; name: string }[]>([]);
  const [workShifts, setWorkShifts] = useState<{ id: string; name: string }[]>([]);
  const [companyRFC, setCompanyRFC] = useState('');


  // Estados auxiliares para entradas dinámicas
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [roleInput, setRoleInput] = useState<string>('');
  const [showInput, setShowInput] = useState(false);
  const [departmentInput, setDepartmentInput] = useState<string>('');
  const [showDepartmentInput, setShowDepartmentInput] = useState(false);
  const [contractTypeInput, setContractTypeInput] = useState<string>('');
  const [showContractTypeInput, setShowContractTypeInput] = useState(false);
  const [jobTitleInput, setJobTitleInput] = useState<string>('');
  const [showJobTitleInput, setShowJobTitleInput] = useState(false);
  const [workShiftInput, setWorkShiftInput] = useState<string>('');
  const [showWorkShiftInput, setShowWorkShiftInput] = useState(false);

  // Funciones para cargar datos desde la API
  const loadCompanies = async () => {
    const data = await getCompaniesList();
    setCompanies(data.companies);
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
      setFilteredNationalities(data.nationalities);
    } catch (error) {
      console.error('Error loading nationalities:', error);
    }
  };

  const loadEducationLevels = async () => {
    try {
      const response = await fetch('/api/EducationLevels');
      const data = await response.json();
      setEducationLevels(data.educationLevels);
    } catch (error) {
      console.error('Error loading education levels:', error);
    }
  };

  const loadRoles = async () => {
    if (!companyRFC) {
      setRoles([]);
      return;
    }
    try {
      const data = await fetch(`/api/Roles?rfc=${companyRFC}`).then(res => res.json());
      setRoles(data);
    } catch (error) {
      setError('Error al cargar los roles');
    }
  };
  
  const loadDepartments = async () => {
    if (!companyRFC) {
      setDepartments([]);
      return;
    }
    try {
      const data = await fetch(`/api/Department?rfc=${companyRFC}`).then(res => res.json());
      setDepartments(data);
    } catch (error) {
      setError('Error al cargar los departamentos');
    }
  };
  
  const loadContractTypes = async () => {
    if (!companyRFC) {
      setContractTypes([]);
      return;
    }
    try {
      const data = await fetch(`/api/ContractType?rfc=${companyRFC}`).then(res => res.json());
      setContractTypes(data);
    } catch (error) {
      setError('Error al cargar los tipos de contrato');
    }
  };
  
  const loadJobTitles = async () => {
    if (!companyRFC) {
      setJobTitles([]);
      return;
    }
    try {
      const data = await fetch(`/api/JobTitle?rfc=${companyRFC}`).then(res => res.json());
      setJobTitles(data);
    } catch (error) {
      setError('Error al cargar los títulos de trabajo');
    }
  };
  
  const loadWorkShifts = async () => {
    if (!companyRFC) {
      setWorkShifts([]);
      return;
    }
    try {
      const data = await fetch(`/api/WorkShift?rfc=${companyRFC}`).then(res => res.json());
      setWorkShifts(data);
    } catch (error) {
      setError('Error al cargar los turnos de trabajo');
    }
  };
  

  // Funciones para crear datos si no existen
  const createRoleIfNotExists = async (roleName: string) => {
    const existingRole = roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
    if (existingRole) {
      return existingRole;
    }

    const response = await fetch(`/api/Roles?rfc=${formData.RFC}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: roleName }),
    });
    const result = await response.json();
    if (result.id) {
      setRoles([...roles, result]);
      return result;
    }
    return null;
  };

  const createDepartmentIfNotExists = async (departmentName: string) => {
    const existingDepartment = departments.find(dept => dept.name.toLowerCase() === departmentName.toLowerCase());
    if (existingDepartment) {
      return existingDepartment;
    }

    const response = await fetch(`/api/Department?rfc=${formData.RFC}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: departmentName }),
    });
    const result = await response.json();
    if (result.id) {
      setDepartments([...departments, result]);
      return result;
    }
    return null;
  };

  const createContractTypeIfNotExists = async (contractTypeName: string) => {
    const existingContractType = contractTypes.find(ct => ct.name.toLowerCase() === contractTypeName.toLowerCase());
    if (existingContractType) {
      return existingContractType;
    }

    const response = await fetch(`/api/ContractType?rfc=${formData.RFC}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: contractTypeName }),
    });
    const result = await response.json();
    if (result.id) {
      setContractTypes([...contractTypes, result]);
      return result;
    }
    return null;
  };

  const createJobTitleIfNotExists = async (jobTitleName: string) => {
    const existingJobTitle = jobTitles.find(jt => jt.name.toLowerCase() === jobTitleName.toLowerCase());
    if (existingJobTitle) {
      return existingJobTitle;
    }

    const response = await fetch(`/api/JobTitle?rfc=${formData.RFC}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: jobTitleName }),
    });
    const result = await response.json();
    if (result.id) {
      setJobTitles([...jobTitles, result]);
      return result;
    }
    return null;
  };

  const createWorkShiftIfNotExists = async (workShiftName: string) => {
    const existingWorkShift = workShifts.find(ws => ws.name.toLowerCase() === workShiftName.toLowerCase());
    if (existingWorkShift) {
      return existingWorkShift;
    }

    const response = await fetch(`/api/WorkShift?rfc=${formData.RFC}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: workShiftName }),
    });
    const result = await response.json();
    if (result.id) {
      setWorkShifts([...workShifts, result]);
      return result;
    }
    return null;
  };

  // Efectos para cargar datos iniciales
  useEffect(() => {
    loadCompanies();
    loadBloodTypes();
    loadGenders();
    loadCivilStatuses();
    loadNationalities();
    loadEducationLevels();
  }, []);

  useEffect(() => {
    if (companyRFC) {
      loadRoles();
      loadDepartments();
      loadContractTypes();
      loadJobTitles();
      loadWorkShifts();
    }
  }, [companyRFC]);
  

  // Manejadores de eventos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSelectChange = (value: string, field: keyof FormData) => {
    const updatedFormData = { ...formData, [field]: value };
    if (field === 'companyId') {
      const selectedCompany = companies.find(company => company.id === value);
      if (selectedCompany) {
        setCompanyRFC(selectedCompany.rfc);
        setFormData(updatedFormData);
        loadRoles();
        loadDepartments();
        loadJobTitles();
        loadContractTypes();
        loadWorkShifts();
      }
    } else {
      setFormData(updatedFormData);
    }
  };
  
  
  
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    }
  };

  const handleAdditionalFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdditionalFiles(Array.from(e.target.files));
    }
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    try {
      createEmployedSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map(err => err.message).join(", "));
        return;
      }
    }

    console.log("Form data being sent:", formData); // Para depuración
  
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      if (value !== null && value !== undefined && value !== '') {
        // Enviar directamente el valor sin convertirlo en JSON
        form.append(key, value.toString());
      }
    });
  
    const result = await createEmployee(form);
    if (result.success) {
      if (formData.RFC && additionalFiles.length > 0) {
        const uploadResult = await uploadEmployeeFiles(formData.RFC, additionalFiles);
        if (!uploadResult.success) {
          setError(uploadResult.error ?? 'Error al subir archivos adicionales');
        }
      }
      setSuccess('Empleado creado exitosamente');
      setFormData({
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
        profileImage: null,
      });
      setAdditionalFiles([]);
    } else {
      setError(result.error ?? null);
    }
  };
  
  
  
  
  



  // Función de búsqueda de nacionalidades
  const handleNationalitySearch = (searchTerm: string) => {
    const filtered = nationalities.filter(nationality =>
      nationality.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNationalities(filtered);
  };

  // Manejadores de roles
  useEffect(() => {
    setFilteredRoles(roles);
  }, [roles]);

  const handleRoleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoleInput(value);
    setFilteredRoles(roles.filter(role => role.name.toLowerCase().includes(value.toLowerCase())));
  };

  const handleRoleSelect = async (roleName: string) => {
    if (!formData.RFC) {
      setError('Debes seleccionar una empresa antes de agregar un nuevo rol');
      return;
    }

    if (roleName.trim() === "") {
      setRoleInput('');
      return;
    }

    const role = await createRoleIfNotExists(roleName);
    if (role) {
      setRoles([...roles, role]);
      setFormData({ ...formData, role: role.id });
      setRoleInput('');
      setShowInput(false); // Ocultar el input después de agregar el nuevo rol
    }
  };

  // Renderizado de selección de roles
  const renderRoleSelection = () => {
    return (
      <>
        {!showInput ? (
          <Select
            value={formData.role}
            onValueChange={(value) => {
              if (value === "new") {
                setShowInput(true); // Mostrar el input cuando se selecciona "Agregar nuevo rol"
              } else {
                setFormData({ ...formData, role: value });
              }
            }}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.name || role.id}>
                  {role.name}
                </SelectItem>
              ))}
              <SelectItem value="new">
                <span className="text-blue-600">Agregar nuevo rol</span>
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="roleInput"
            name="roleInput"
            value={roleInput}
            onChange={handleRoleInputChange}
            onBlur={() => handleRoleSelect(roleInput)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRoleSelect(roleInput);
                e.preventDefault();
              }
            }}
            required
          />
        )}
      </>
    );
  };

  // Manejadores de departamentos
  const handleDepartmentSelect = async (departmentName: string) => {
    if (!formData.RFC) {
      setError('Debes seleccionar una empresa antes de agregar un nuevo departamento');
      return;
    }

    if (departmentName.trim() === "") {
      setDepartmentInput('');
      return;
    }

    const department = await createDepartmentIfNotExists(departmentName);
    if (department) {
      setDepartments([...departments, department]);
      setFormData({ ...formData, department: department.id });
      setDepartmentInput('');
      setShowDepartmentInput(false); // Ocultar el input después de agregar el nuevo departamento
    }
  };

  // Renderizado de selección de departamentos
  const renderDepartmentSelection = () => {
    return (
      <>
        {!showDepartmentInput ? (
          <Select
            value={formData.department}
            onValueChange={(value) => {
              if (value === "new") {
                setShowDepartmentInput(true); // Mostrar el input cuando se selecciona "Agregar nuevo departamento"
              } else {
                setFormData({ ...formData, department: value });
              }
            }}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar departamento" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.name}>
                  {dept.name}
                </SelectItem>
              ))}
              <SelectItem value="new">
                <span className="text-blue-600">Agregar nuevo departamento</span>
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="departmentInput"
            name="departmentInput"
            value={departmentInput}
            onChange={(e) => setDepartmentInput(e.target.value)}
            onBlur={() => handleDepartmentSelect(departmentInput)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleDepartmentSelect(departmentInput);
                e.preventDefault();
              }
            }}
            required
          />
        )}
      </>
    );
  };

  // Manejadores de tipos de contrato
  const handleContractTypeSelect = async (contractTypeName: string) => {
    if (!formData.RFC) {
      setError('Debes seleccionar una empresa antes de agregar un nuevo tipo de contrato');
      return;
    }

    if (contractTypeName.trim() === "") {
      setContractTypeInput('');
      return;
    }

    const contractType = await createContractTypeIfNotExists(contractTypeName);
    if (contractType) {
      setContractTypes([...contractTypes, contractType]);
      setFormData({ ...formData, contractType: contractType.id });
      setContractTypeInput('');
      setShowContractTypeInput(false); // Ocultar el input después de agregar el nuevo tipo de contrato
    }
  };


  // Renderizado de selección de tipos de contrato
  const renderContractTypeSelection = () => {
    return (
      <>
        {!showContractTypeInput ? (
          <Select
            value={formData.contractType}
            onValueChange={(value) => {
              if (value === "new") {
                setShowContractTypeInput(true);
              } else {
                handleSelectChange(value, 'contractType');
              }
            }}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo de contrato" />
            </SelectTrigger>
            <SelectContent>
              {contractTypes.map((ct) => (
                <SelectItem key={ct.id} value={ct.id}>
                  {ct.name}
                </SelectItem>
              ))}
              <SelectItem value="new">
                <span className="text-blue-600">Agregar nuevo tipo de contrato</span>
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="contractTypeInput"
            name="contractTypeInput"
            value={contractTypeInput}
            onChange={(e) => setContractTypeInput(e.target.value)}
            onBlur={() => handleContractTypeSelect(contractTypeInput)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleContractTypeSelect(contractTypeInput);
                e.preventDefault();
              }
            }}
            required
          />
        )}
      </>
    );
  };
  

  // Manejadores de títulos de trabajo
  const handleJobTitleSelect = async (jobTitleName: string) => {
    if (!formData.RFC) {
      setError('Debes seleccionar una empresa antes de agregar un nuevo título de trabajo');
      return;
    }
  
    if (jobTitleName.trim() === "") {
      setJobTitleInput('');
      return;
    }
  
    const jobTitle = await createJobTitleIfNotExists(jobTitleName);
    if (jobTitle) {
      setJobTitles([...jobTitles, jobTitle]);
      setFormData({ ...formData, jobTitle: jobTitle.id }); // Guardar el ID
      console.log("Selected JobTitle ID:", jobTitle.id); // Para depuración
      setJobTitleInput('');
      setShowJobTitleInput(false);
    }
  };
  

  // Renderizado de selección de títulos de trabajo
  const renderJobTitleSelection = () => {
    return (
      <>
        {!showJobTitleInput ? (
          <Select
            value={formData.jobTitle}
            onValueChange={(value) => {
              if (value === "new") {
                setShowJobTitleInput(true); // Mostrar el input cuando se selecciona "Agregar nuevo título de trabajo"
              } else {
                setFormData({ ...formData, jobTitle: value });
              }
            }}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar título de trabajo" />
            </SelectTrigger>
            <SelectContent>
              {jobTitles.map((jt) => (
                <SelectItem key={jt.id} value={jt.id}>
                  {jt.name}
                </SelectItem>
              ))}
              <SelectItem value="new">
                <span className="text-blue-600">Agregar nuevo título de trabajo</span>
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="jobTitleInput"
            name="jobTitleInput"
            value={jobTitleInput}
            onChange={(e) => setJobTitleInput(e.target.value)}
            onBlur={() => handleJobTitleSelect(jobTitleInput)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleJobTitleSelect(jobTitleInput);
                e.preventDefault();
              }
            }}
            required
          />
        )}
      </>
    );
  };
  

  // Manejadores de turnos de trabajo
  const handleWorkShiftSelect = async (workShiftName: string) => {
    if (!formData.RFC) {
      setError('Debes seleccionar una empresa antes de agregar un nuevo turno de trabajo');
      return;
    }

    if (workShiftName.trim() === "") {
      setWorkShiftInput('');
      return;
    }

    const workShift = await createWorkShiftIfNotExists(workShiftName);
    if (workShift) {
      setWorkShifts([...workShifts, workShift]);
      setFormData({ ...formData, workShift: workShift.id });
      setWorkShiftInput('');
      setShowWorkShiftInput(false); // Ocultar el input después de agregar el nuevo turno de trabajo
    }
  };

  // Renderizado de selección de turnos de trabajo
  const renderWorkShiftSelection = () => {
    return (
      <>
        {!showWorkShiftInput ? (
          <Select
            value={formData.workShift}
            onValueChange={(value) => {
              if (value === "new") {
                setShowWorkShiftInput(true);
              } else {
                handleSelectChange(value, 'workShift');
              }
            }}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar turno de trabajo" />
            </SelectTrigger>
            <SelectContent>
              {workShifts.map((ws) => (
                <SelectItem key={ws.id} value={ws.id}>
                  {ws.name}
                </SelectItem>
              ))}
              <SelectItem value="new">
                <span className="text-blue-600">Agregar nuevo turno de trabajo</span>
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="workShiftInput"
            name="workShiftInput"
            value={workShiftInput}
            onChange={(e) => setWorkShiftInput(e.target.value)}
            onBlur={() => handleWorkShiftSelect(workShiftInput)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleWorkShiftSelect(workShiftInput);
                e.preventDefault();
              }
            }}
            required
          />
        )}
      </>
    );
  };
  
  
  

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12 mb-14">
      <div className="flex flex-col md:flex-row items-start justify-start mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Administrar Empleados</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
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
              <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
              <Input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="phoneNumber">Número de Teléfono</Label>
              <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>
          <div>
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
              <h2>Contacto de emergencia</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="emergencyContact">Nombre</Label>
              <Input 
                id="emergencyContact" 
                name="emergencyContact" 
                value={formData.emergencyContact} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="emergencyPhone">Teléfono</Label>
              <Input 
                id="emergencyPhone" 
                name="emergencyPhone" 
                value={formData.emergencyPhone} 
                onChange={handleChange} 
                required 
              />
            </div>

          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">Información Laboral</h2>
        <div className="grid gap-6 md:grid-cols-2 py-4">
          <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="role">Rol</Label>
            {renderRoleSelection()}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="department">Departamento</Label>
              {renderDepartmentSelection()}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="companyId">Empresa</Label>
              <Select value={formData.companyId} onValueChange={(value) => handleSelectChange(value, 'companyId')} required>
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
              <Label htmlFor="jobTitle">Título del Trabajo</Label>
              {renderJobTitleSelection()}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="workShift">Turno de Trabajo</Label>
              {renderWorkShiftSelection()}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="contractType">Tipo de Contrato</Label>
            {renderContractTypeSelection()}
          </div>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="hireDate">Fecha de Contratación</Label>
              <Input type="date" id="hireDate" name="hireDate" value={formData.hireDate} onChange={handleChange} required />
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
              <Label htmlFor="educationLevel">Nivel Educativo</Label>
              <Select value={formData.educationLevel} onValueChange={(value) => handleSelectChange(value, 'educationLevel')} required>
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
        </div>
        <h2 className="text-xl font-semibold mb-4">Datos Sociales</h2>
        <div className="grid gap-6 md:grid-cols-2 py-4">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="bloodType">Tipo de Sangre</Label>
              <Select value={formData.bloodType} onValueChange={(value) => handleSelectChange(value, 'bloodType')} required>
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="profileImage">Foto de Perfil</Label>
              <Input type="file" id="profileImage" name="profileImage" onChange={handleFileChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
              <Label htmlFor="additionalFiles">Archivos Adicionales</Label>
              <Input type="file" id="additionalFiles" name="additionalFiles" onChange={handleAdditionalFilesChange} multiple />
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="flex justify-end mt-4">
          <Button type="submit">Crear</Button>
        </div>
      </form>
    </div>
  );
}


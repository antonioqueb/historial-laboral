// interfaces/types.ts
export interface User {
    id: string;
    email: string;
    name?: string | null;
    companies: Company[];
    profileImageUrl?: string | null;
  }
  
  export interface Company {
    id: string;
    name: string;
    userId: string;
    user: User;
    employees: Employee[];
    razonSocial: string;
    rfc: string;
    domicilioFiscalCalle: string;
    domicilioFiscalNumero: string;
    domicilioFiscalColonia: string;
    domicilioFiscalMunicipio: string;
    domicilioFiscalEstado: string;
    domicilioFiscalCodigoPostal: string;
    nombreComercial?: string | null;
    objetoSocial: string;
    representanteLegalNombre: string;
    representanteLegalCurp?: string | null;
    capitalSocial?: number | null;
    registrosImss?: string | null;
    registrosInfonavit?: string | null;
    giroActividadEconomica?: string | null;
    certificaciones: string[];
    reviewsGiven: Review[];
    logoUrl?: string | null;
    roles: Role[];
    workShifts: WorkShift[];
    departments: Department[];
    contractTypes: ContractType[];
    jobTitles: JobTitle[];
  }
  
  export interface Employee {
    id: string;
    name: string;
    role: Role;
    department: Department;
    description?: string | null;
    companyId: string;
    company: Company;
    socialSecurityNumber: string;
    CURP: string;
    RFC: string;
    address?: string | null;
    phoneNumber?: string | null;
    email: string;
    birthDate: string;
    hireDate: string;
    emergencyContact?: string | null;
    emergencyPhone?: string | null;
    bankAccountNumber?: string | null;
    clabeNumber?: string | null;
    maritalStatus: string;
    nationality: string;
    educationLevel: string;
    gender: string;
    bloodType: string;
    jobTitle: JobTitle;
    workShift: WorkShift;
    contractType: ContractType;
    profileImageUrl?: string | null;
    createdAt: string;
    updatedAt: string;
    reviewsReceived: Review[];
    uploadedFiles: string[];
    latestRating?: number | null;
    employeeDepartments: EmployeeDepartment[];
  }
  
  export interface Review {
    id: string;
    employeeId: string;
    employee: Employee;
    companyId: string;
    company: Company;
    title?: string | null;
    description: string;
    rating: number;
    positive: boolean;
    documentation?: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Role {
    id: string;
    name: string;
    companies: Company[];
    employees: Employee[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface WorkShift {
    id: string;
    name: string;
    companies: Company[];
    employees: Employee[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Department {
    id: string;
    name: string;
    companies: Company[];
    employees: Employee[];
    employeeDepartments: EmployeeDepartment[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ContractType {
    id: string;
    name: string;
    companies: Company[];
    employees: Employee[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface JobTitle {
    id: string;
    name: string;
    companies: Company[];
    employees: Employee[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface EmployeeDepartment {
    id: string;
    employeeId: string;
    employee: Employee;
    departmentId: string;
    department: Department;
    startDate: string;
    endDate?: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
  // Definiciones simplificadas
  export interface SimpleRole {
    id: string;
    name: string;
  }
  
  export interface SimpleDepartment {
    id: string;
    name: string;
  }
  
  export interface SimpleJobTitle {
    id: string;
    name: string;
  }
  
  export interface SimpleWorkShift {
    id: string;
    name: string;
  }
  
  export interface SimpleContractType {
    id: string;
    name: string;
  }
  
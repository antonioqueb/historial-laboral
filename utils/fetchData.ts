// Definición de tipos para los datos esperados
export interface Company {
  id: string;
  razonSocial: string;
}

export interface Employee {
  id: string;
  name: string;
  role?: string;
  department?: string;
  description?: string;
  company?: { rfc: string };
  companyId?: string;
  socialSecurityNumber?: string;
  CURP?: string;
  RFC?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  birthDate?: string;
  hireDate?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bankAccountNumber?: string;
  clabeNumber?: string;
  maritalStatus?: string;
  nationality?: string;
  educationLevel?: string;
  gender?: string;
  bloodType?: string;
  jobTitle?: string;
  workShift?: string;
  contractType?: string;
  profileImage?: string;
  profileImageUrl?: string; // Asegúrate de incluir esta propiedad
}

// Función para obtener la lista de compañías por RFC
export async function getCompaniesRFC(): Promise<{ rfcs: string[] }> {
  try {
    const response = await fetch("/api/getCompanyRFC");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las compañías:", error);
    return { rfcs: [] };
  }
}

// Función para obtener los empleados filtrados por la compañía seleccionada
export async function getEmployeesByCompany(selectedCompany: string): Promise<Employee[]> {
  try {
    const response = await fetch("/api/listAllEmployees");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.employees.filter((employee: Employee) => employee.company?.rfc === selectedCompany);
  } catch (error) {
    console.error("Error al obtener los empleados:", error);
    return [];
  }
}

// Función para obtener la lista de compañías
export async function getCompaniesList(): Promise<{ companies: Company[] }> {
  try {
    const response = await fetch("/api/listCompanies");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las compañías:", error);
    return { companies: [] };
  }
}

// Función para crear un empleado
export async function createEmployee(form: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/createEmployee', {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.error || 'Error al crear el empleado' };
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return { success: false, error: 'Error de conexión' };
  }
}

// Función para obtener la lista de empleados
export async function getEmployeesList(): Promise<{ employees: Employee[] }> {
  try {
    const response = await fetch("/api/listAllEmployees");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los empleados:", error);
    return { employees: [] };
  }
}

// Función para obtener los datos de un empleado por su ID
export async function getEmployeeById(employeeId: string): Promise<Employee | null> {
  try {
    const response = await fetch(`/api/getEmployee/${employeeId}`);
    const data = await response.json();
    return data.employee || null;
  } catch (error) {
    console.error("Error al obtener los datos del empleado:", error);
    return null;
  }
}

// Función para editar un empleado
export async function editEmployee(form: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/editEmployee', {
      method: 'PATCH',
      body: form,
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.error || 'Error al actualizar el empleado' };
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return { success: false, error: 'Error de conexión' };
  }
}

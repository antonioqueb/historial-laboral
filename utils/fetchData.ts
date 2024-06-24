// utils\fetchData.js

// Función para obtener la lista de compañías
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
    return data.employees.filter((employee: Employee) => employee.company.rfc === selectedCompany);
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

// Definición de tipos para los datos esperados
export interface Company {
  id: string;
  razonSocial: string;
}


// Definición de tipos para los datos esperados
interface Employee {
  id: string;
  name: string;
  profileImageUrl: string;
  role: string;
  description: string;
  department: string;
  company: {
    rfc: string;
  };
}

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

import { Company, Employee, Review, Department, Role, ContractType, JobTitle    } from '@/interfaces/types';

// Función para cargar archivos de empleados por RFC
export async function uploadEmployeeFiles(rfc: string, files: File[]): Promise<{ success: boolean; error?: string }> {
  const formData = new FormData();
  formData.append('rfc', rfc);
  files.forEach(file => {
    formData.append('files', file);
  });

  try {
    const response = await fetch('https://server-file-by-rfc.historiallaboral.com/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.error || 'Error al subir los archivos' };
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return { success: false, error: 'Error de conexión' };
  }
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

// Función para obtener los empleados filtrados por el RFC de la compañía seleccionada
export async function getEmployeesByCompany(selectedCompanyRFC: string): Promise<Employee[]> {
  try {
    const response = await fetch(`/api/listEmployeesByCompanyRFC?rfc=${selectedCompanyRFC}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.employees;
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

// Función para obtener el userId
export async function getUserId(): Promise<{ id: string }> {
  try {
    const response = await fetch("https://historiallaboral.com/api/getUserId", {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user ID: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.id) {
      throw new Error('User ID not found in response');
    }

    return data;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    throw new Error('Failed to fetch user ID');
  }
}

// Función para obtener la URL de la imagen de perfil
export async function getProfileImageUrl(): Promise<{ profileImageUrl: string }> {
  try {
    const response = await fetch("/api/getProfileImage", {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile image URL: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.profileImageUrl) {
      throw new Error('Profile image URL not found in response');
    }

    return data;
  } catch (error) {
    throw new Error('Failed to fetch profile image URL');
  }
}

// Función para crear una compañía
export async function createCompany(data: any): Promise<{ company: { name: string }, error?: string }> {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    const response = await fetch("/api/createCompany", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      return { company: { name: '' }, error: errorData.error };
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return { company: { name: '' }, error: 'Error de conexión' };
  }
}

// Función para obtener los datos de una empresa por su RFC
export async function getCompanyByRfc(rfc: string): Promise<Company | null> {
  try {
    const response = await fetch(`/api/getCompany?rfc=${rfc}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch company data');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Función para editar los datos de una compañía
export async function editCompanyData(formData: FormData): Promise<{ company: { name: string }, error?: string }> {
  try {
    const response = await fetch("/api/editCompany", {
      method: "PATCH",
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      return { company: { name: '' }, error: errorData.error };
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return { company: { name: '' }, error: 'Error de conexión' };
  }
}

// Función para subir la imagen de una compañía
export async function uploadCompanyImage(file: File, rfc: string): Promise<{ imageUrl: string, filename: string, error?: string }> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("rfc", rfc);
  formData.append("docType", "logo");

  try {
    const response = await fetch("https://cdn-company-images.historiallaboral.com/upload_rfc", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      return { imageUrl: '', filename: '', error: errorData.error };
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return { imageUrl: '', filename: '', error: 'Error de conexión' };
  }
}

// Función para crear una reseña
export async function createReview(reviewData: any): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/createReviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.error || 'Error al crear la reseña' };
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return { success: false, error: 'Error de conexión' };
  }
}

// Función para obtener reseñas por NSS
export async function getReviewsByNSS(nss: string): Promise<{ reviews: Review[] }> {
  try {
    const response = await fetch(`/api/getReviewsByNSS?nss=${nss}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener las reseñas:", error);
    return { reviews: [] };
  }
}

// Función para obtener empleado por NSS
export const getEmployeeByNss = async (nss: string): Promise<Employee | null> => {
  try {
    const response = await fetch(`https://historiallaboral.com/api/getEmployeeByNss?nss=${nss}`);
    if (!response.ok) {
      throw new Error('Failed to fetch employee data');
    }
    const data = await response.json();
    return data.employee || null;
  } catch (error) {
    console.error("Error al obtener el empleado:", error);
    return null;
  }
};

// Función para obtener los tipos de sangre desde la API
export const getBloodTypes = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://historiallaboral.com/api/bloodTypes');
    if (!response.ok) {
      throw new Error('Failed to fetch blood types');
    }
    const data = await response.json();
    return data.bloodTypes;
  } catch (error) {
    console.error("Error al obtener los tipos de sangre:", error);
    return [];
  }
};

// Función para obtener los estados civiles desde la API
export const getCivilStatuses = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://historiallaboral.com/api/CivilStatus');
    if (!response.ok) {
      throw new Error('Failed to fetch civil statuses');
    }
    const data = await response.json();
    return data.civilStatuses;
  } catch (error) {
    console.error("Error al obtener los estados civiles:", error);
    return [];
  }
};

// Función para obtener los niveles educativos desde la API
export const getEducationLevels = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://historiallaboral.com/api/EducationLevels');
    if (!response.ok) {
      throw new Error('Failed to fetch education levels');
    }
    const data = await response.json();
    return data.educationLevels;
  } catch (error) {
    console.error("Error al obtener los niveles educativos:", error);
    return [];
  }
};


// Función para obtener los géneros desde la API
export const getGenders = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://historiallaboral.com/api/Genders');
    if (!response.ok) {
      throw new Error('Failed to fetch genders');
    }
    const data = await response.json();
    return data.genders;
  } catch (error) {
    console.error("Error al obtener los géneros:", error);
    return [];
  }
};


// Función para obtener las nacionalidades desde la API
export const getNationalities = async (): Promise<{ sigla: string, nombre: string }[]> => {
  try {
    const response = await fetch('https://historiallaboral.com/api/Nationalities');
    if (!response.ok) {
      throw new Error('Failed to fetch nationalities');
    }
    const data = await response.json();
    return data.nationalities;
  } catch (error) {
    console.error("Error al obtener las nacionalidades:", error);
    return [];
  }
};





// Obtener todos los departamentos de una empresa
export async function getDepartmentsByCompany(rfc: string): Promise<Department[]> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/Department?rfc=${rfc}`);
    if (!response.ok) {
      throw new Error(`Error fetching departments: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Crear un nuevo departamento
export async function createDepartment(rfc: string, name: string): Promise<Department> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/Department?rfc=${rfc}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error(`Error creating department: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Editar un departamento existente
export async function editDepartment(rfc: string, id: string, name: string): Promise<void> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/Department?rfc=${rfc}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name }),
    });
    if (!response.ok) {
      throw new Error(`Error editing department: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Eliminar un departamento existente
export async function deleteDepartment(rfc: string, id: string): Promise<void> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/Department?rfc=${rfc}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error(`Error deleting department: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}






// Obtener todos los roles de una empresa
export async function getRolesByCompany(rfc: string): Promise<Role[]> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/Roles?rfc=${rfc}`);
    if (!response.ok) {
      throw new Error(`Error fetching roles: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Crear un nuevo rol
export async function createRole(rfc: string, name: string): Promise<Role> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/Roles?rfc=${rfc}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error(`Error creating role: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Editar un rol existente
export async function editRole(rfc: string, id: string, name: string): Promise<void> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/Roles?rfc=${rfc}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name }),
    });
    if (!response.ok) {
      throw new Error(`Error editing role: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Eliminar un rol existente
export async function deleteRole(rfc: string, id: string): Promise<void> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/Roles?rfc=${rfc}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error(`Error deleting role: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }


}






// Obtener todos los tipos de contrato de una empresa
export async function getContractTypesByCompany(rfc: string): Promise<ContractType[]> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/ContractType?rfc=${rfc}`);
    if (!response.ok) {
      throw new Error(`Error fetching contract types: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Crear un nuevo tipo de contrato
export async function createContractType(rfc: string, name: string): Promise<ContractType> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/ContractType?rfc=${rfc}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error(`Error creating contract type: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Editar un tipo de contrato existente
export async function editContractType(rfc: string, id: string, name: string): Promise<void> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/ContractType?rfc=${rfc}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name }),
    });
    if (!response.ok) {
      throw new Error(`Error editing contract type: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Eliminar un tipo de contrato existente
export async function deleteContractType(rfc: string, id: string): Promise<void> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/ContractType?rfc=${rfc}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error(`Error deleting contract type: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}







// Obtener todos los títulos de trabajo de una empresa
export async function getJobTitlesByCompany(rfc: string): Promise<JobTitle[]> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/JobTitle?rfc=${rfc}`);
    if (!response.ok) {
      throw new Error(`Error fetching job titles: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Crear un nuevo título de trabajo
export async function createJobTitle(rfc: string, name: string): Promise<JobTitle> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/JobTitle?rfc=${rfc}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error(`Error creating job title: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Editar un título de trabajo existente
export async function editJobTitle(rfc: string, id: string, name: string): Promise<void> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/JobTitle?rfc=${rfc}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name }),
    });
    if (!response.ok) {
      throw new Error(`Error editing job title: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Eliminar un título de trabajo existente
export async function deleteJobTitle(rfc: string, id: string): Promise<void> {
  try {
    const response = await fetch(`https://historiallaboral.com/api/JobTitle?rfc=${rfc}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error(`Error deleting job title: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
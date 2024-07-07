// utils\fetchData.ts

// Definición de tipos para los datos esperados
export interface Company {
  id: string;
  name: string;
  userId: string;
  razonSocial: string;
  rfc: string;
  domicilioFiscalCalle: string;
  domicilioFiscalNumero: string;
  domicilioFiscalColonia: string;
  domicilioFiscalMunicipio: string;
  domicilioFiscalEstado: string;
  domicilioFiscalCodigoPostal: string;
  nombreComercial?: string;
  objetoSocial: string;
  representanteLegalNombre: string;
  representanteLegalCurp: string;
  capitalSocial: number;
  registrosImss?: string;
  registrosInfonavit?: string;
  giroActividadEconomica: string;
  certificaciones: string[];
  employees?: Employee[];
  reviewsGiven?: Review[];
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  description: string;
  companyId: string;
  socialSecurityNumber: string;
  CURP: string;
  RFC: string;
  address: string;
  phoneNumber: string;
  email: string;
  birthDate: Date;
  hireDate: Date;
  emergencyContact: string;
  emergencyPhone: string;
  bankAccountNumber: string;
  clabeNumber: string;
  maritalStatus: string;
  nationality: string;
  educationLevel: string;
  gender: string;
  bloodType: string;
  jobTitle: string;
  workShift: string;
  contractType: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  company: { // Agregar la propiedad company con su estructura
    name: string;
    rfc: string;
  };
  reviewsReceived?: Review[];
}

export interface Review {
  id: string;
  employeeId: string;
  companyId: string;
  title: string;
  description: string;
  rating: number;
  positive: boolean;
  documentation?: string;
  userId?: string; // Propiedad opcional
  createdAt: Date;
  updatedAt: Date;
}




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


// Función para obtener los empleados filtrados por la compañía seleccionada
export async function getEmployeesByCompany(selectedCompanyId: string): Promise<Employee[]> {
  try {
    const response = await fetch(`/api/listAllEmployees`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("All employees data:", data.employees);
    return data.employees.filter((employee: Employee) => employee.companyId === selectedCompanyId);
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
    console.log("Response from getUserId:", data);

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
    console.log("Response from getProfileImage:", data);

    if (!data.profileImageUrl) {
      throw new Error('Profile image URL not found in response');
    }

    return data;
  } catch (error) {
    console.error('Error fetching profile image URL:', error);
    throw new Error('Failed to fetch profile image URL');
  }
}


// Función para crear una compañía
export async function createCompany(data: any): Promise<{ company: { name: string }, error?: string }> {
  try {
    // Creamos un FormData para manejar la subida del archivo
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    const response = await fetch("/api/createCompany", {
      method: "POST",
      body: formData, // Enviamos el FormData en lugar de JSON
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
// Para obtener reseñas por NSS.
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


// Función para obtener los datos de un empleado por su RFC
export async function getEmployeeByRfc(rfc: string): Promise<Employee | null> {
  try {
    const response = await fetch(`/api/getEmployeeByRfc?rfc=${rfc}`);
    if (response.ok) {
      const data = await response.json();
      return data.employee || null;
    } else {
      throw new Error('Failed to fetch employee data');
    }
  } catch (error) {
    console.error("Error al obtener los datos del empleado:", error);
    return null;
  }
}

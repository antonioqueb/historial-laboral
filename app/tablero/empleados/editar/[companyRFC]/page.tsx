'use client'; // Indica que este archivo debe ejecutarse en el lado del cliente

import { useRouter, useSearchParams } from 'next/navigation'; // Hooks para la navegación y obtención de parámetros de búsqueda en Next.js
import { useState, useEffect } from 'react'; // Hooks de React para el estado y efectos secundarios
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'; // Componentes de selección personalizados
import { Label } from '@/components/ui/label'; // Componente de etiqueta personalizado

// Interfaz para definir la estructura de un empleado
interface Employee {
  socialSecurityNumber: string; // Número de seguro social del empleado
  name: string; // Nombre del empleado
}

// Componente de la página de la compañía
const CompanyPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]); // Estado para almacenar la lista de empleados
  const searchParams = useSearchParams(); // Obtiene los parámetros de búsqueda de la URL
  const companyRFC = searchParams.get('companyRFC') as string; // Obtiene el parámetro companyRFC de la URL
  const [selectedEmployeeNss, setSelectedEmployeeNss] = useState<string>(''); // Estado para almacenar el NSS del empleado seleccionado
  const router = useRouter(); // Inicializa el hook de navegación

  useEffect(() => {
    // Función para obtener la lista de empleados de una compañía específica
    const fetchEmployees = async () => {
      try {
        console.log(`Fetching employees for company RFC: ${companyRFC}`);
        const res = await fetch(`/api/listEmployeesByCompanyRFC?rfc=${companyRFC}`); // Realiza una solicitud a la API para obtener la lista de empleados
        console.log('Fetch response status:', res.status);
        console.log('Fetch response:', res);

        if (res.ok) {
          const data = await res.json(); // Parsea la respuesta JSON

          console.log('Fetched employees data:', data);
          if (data && data.employees) {
            setEmployees(data.employees); // Actualiza el estado con la lista de empleados
            console.log('Employees set in state:', data.employees);
          } else {
            console.error('No employees found in response data');
          }
        } else {
          const errorData = await res.json();
          console.error('Failed to fetch employees, response not OK', errorData); // Manejo de errores en la solicitud
        }
      } catch (error) {
        console.error('Failed to fetch employees', error); // Manejo de errores de la solicitud
      }
    };

    if (companyRFC) {
      fetchEmployees(); // Llama a la función para obtener los empleados si companyRFC está definido
    }
  }, [companyRFC]); // El efecto se ejecuta cada vez que cambia companyRFC

  useEffect(() => {
    console.log('Current employees:', employees); // Muestra los empleados actuales en el estado
  }, [employees]); // El efecto se ejecuta cada vez que cambia employees

  const handleEmployeeSelect = (nss: string) => {
    console.log(`Selected employee NSS: ${nss}`);
    setSelectedEmployeeNss(nss); // Actualiza el estado con el NSS del empleado seleccionado
    router.push(`/tablero/empleados/editar/${companyRFC}/${nss}`); // Navega a la página de edición del empleado seleccionado
  };

  return (
    <div>
      <h1>Company: {companyRFC}</h1>
      <Label className="mb-2" htmlFor="employee">Seleccionar Empleado</Label>
      <Select
        value={selectedEmployeeNss}
        onValueChange={handleEmployeeSelect}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar empleado" /> {/* Placeholder del selector */}
        </SelectTrigger>
        <SelectContent>
          {employees.length > 0 ? (
            employees.map(employee => (
              <SelectItem key={employee.socialSecurityNumber} value={employee.socialSecurityNumber}>
                {employee.name} {/* Muestra el nombre de cada empleado en la lista */}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-employees" disabled>
              No hay empleados disponibles {/* Muestra un mensaje si no hay empleados disponibles */}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompanyPage;

'use client'; 
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react'; 
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'; 
import { Label } from '@/components/ui/label'; 

// Interfaz para definir la estructura de una compañía
interface Company {
  rfc: string; // RFC de la compañía
  razonSocial: string; // Razón social de la compañía
}

const EditPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]); // Estado para almacenar la lista de compañías
  const [selectedCompanyRFC, setSelectedCompanyRFC] = useState<string>(''); // Estado para almacenar el RFC de la compañía seleccionada
  const router = useRouter(); // Inicializa el hook de navegación

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/listCompanies'); // Realiza una solicitud a la API para obtener la lista de compañías
        if (res.ok) {
          const data = await res.json(); // Parsea la respuesta JSON
          setCompanies(data.companies); // Actualiza el estado con la lista de compañías
        }
      } catch (error) {
        console.error('Failed to fetch companies', error); // Manejo de errores en la solicitud
      }
    };
    fetchCompanies(); // Llama a la función para obtener las compañías
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

  const handleCompanySelect = (rfc: string) => {
    setSelectedCompanyRFC(rfc); // Actualiza el estado con el RFC de la compañía seleccionada
    router.push(`/tablero/empleados/editar/${rfc}`); // Navega a la página de edición de la compañía seleccionada
  };

  return (
    <div>
      <Label className="mb-2" htmlFor="company">Seleccionar Empresa</Label> {/* Etiqueta para el selector de compañías */}
      <Select
        value={selectedCompanyRFC}
        onValueChange={handleCompanySelect}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar empresa" /> {/* Placeholder del selector */}
        </SelectTrigger>
        <SelectContent>
          {companies.map(company => (
            <SelectItem key={company.rfc} value={company.rfc}>
              {company.razonSocial} {/* Muestra la razón social de cada compañía en la lista */}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EditPage;

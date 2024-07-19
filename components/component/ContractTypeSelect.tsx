// components/component/ContractTypeSelect.tsx
'use client';

import { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// Define las propiedades que el componente ContractTypeSelect espera recibir
interface ContractTypeSelectProps {
  companyRFC: string; // RFC de la empresa
  value: string; // ID del tipo de contrato actualmente seleccionado
  onChange: (value: string) => void; // Función a llamar cuando el tipo de contrato seleccionado cambia
}

// Define el componente ContractTypeSelect
const ContractTypeSelect: React.FC<ContractTypeSelectProps> = ({ companyRFC, value, onChange }) => {
  // Estado para almacenar la lista de tipos de contrato
  const [contractTypes, setContractTypes] = useState<{ id: string; name: string }[]>([]);
  // Estado para almacenar el valor del campo de entrada de un nuevo tipo de contrato
  const [contractTypeInput, setContractTypeInput] = useState<string>('');
  // Estado para controlar la visibilidad del campo de entrada de tipo de contrato
  const [showContractTypeInput, setShowContractTypeInput] = useState(false);

  // Efecto para cargar los tipos de contrato cuando el RFC de la empresa cambia
  useEffect(() => {
    const loadContractTypes = async () => {
      if (!companyRFC) { // Si no se proporciona el RFC de la empresa, limpia los tipos de contrato
        setContractTypes([]);
        return;
      }
      try {
        // Obtiene los tipos de contrato para el RFC de la empresa dado desde la API
        const data = await fetch(`/api/ContractType?rfc=${companyRFC}`).then(res => res.json());
        setContractTypes(data); // Actualiza el estado con los tipos de contrato obtenidos
      } catch (error) {
        console.error('Error al cargar los tipos de contrato', error); // Registra cualquier error que ocurra durante la obtención
      }
    };

    loadContractTypes(); // Llama a la función loadContractTypes
  }, [companyRFC]); // Matriz de dependencias para el efecto, se ejecuta cuando companyRFC cambia

  // Función para manejar la selección o creación de un tipo de contrato
  const handleContractTypeSelect = async (contractTypeName: string) => {
    if (contractTypeName.trim() === "") { // Si la entrada está vacía, limpia el campo de entrada y regresa
      setContractTypeInput('');
      return;
    }

    // Busca si el tipo de contrato ya existe en la lista de tipos
    const existingContractType = contractTypes.find(ct => ct.name.toLowerCase() === contractTypeName.toLowerCase());
    if (existingContractType) {
      // Si el tipo de contrato existe, llama a onChange con el ID del tipo existente
      onChange(existingContractType.id);
      return;
    }

    // Si el tipo de contrato no existe, envía una solicitud para crear un nuevo tipo de contrato
    const response = await fetch(`/api/ContractType?rfc=${companyRFC}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: contractTypeName }),
    });

    const result = await response.json();
    if (result.id) {
      // Si el tipo de contrato se crea con éxito, actualiza la lista de tipos y llama a onChange con el nuevo ID
      setContractTypes([...contractTypes, result]);
      onChange(result.id);
      setContractTypeInput('');
      setShowContractTypeInput(false);
    }
  };

  return (
    <>
      {!showContractTypeInput ? ( // Muestra el componente de selección si no se está agregando un nuevo tipo
        <Select
          value={value}
          onValueChange={(value) => {
            if (value === "new") { // Si se selecciona "nuevo", muestra el campo de entrada para agregar un nuevo tipo
              setShowContractTypeInput(true);
            } else {
              onChange(value); // Si se selecciona un tipo existente, llama a onChange con el valor seleccionado
            }
          }}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo de contrato" />
          </SelectTrigger>
          <SelectContent>
            {contractTypes.map(ct => (
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
        // Muestra el campo de entrada para agregar un nuevo tipo de contrato
        <Input
          id="contractTypeInput"
          name="contractTypeInput"
          value={contractTypeInput}
          onChange={(e) => setContractTypeInput(e.target.value)}
          onBlur={() => handleContractTypeSelect(contractTypeInput)} // Maneja el caso cuando el campo pierde el foco
          onKeyDown={(e) => {
            if (e.key === 'Enter') { // Maneja el caso cuando se presiona la tecla Enter
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

export default ContractTypeSelect;

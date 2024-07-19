// components/component/WorkShiftSelect.tsx
'use client';

import { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// Define las propiedades que el componente WorkShiftSelect espera recibir
interface WorkShiftSelectProps {
  companyRFC: string; // RFC de la empresa
  value: string; // ID del turno de trabajo actualmente seleccionado
  onChange: (value: string) => void; // Función a llamar cuando el turno de trabajo seleccionado cambia
}

// Define el componente WorkShiftSelect
const WorkShiftSelect: React.FC<WorkShiftSelectProps> = ({ companyRFC, value, onChange }) => {
  // Estado para almacenar la lista de turnos de trabajo
  const [workShifts, setWorkShifts] = useState<{ id: string; name: string }[]>([]);
  // Estado para almacenar el valor del campo de entrada de un nuevo turno de trabajo
  const [workShiftInput, setWorkShiftInput] = useState<string>('');
  // Estado para controlar la visibilidad del campo de entrada de turno de trabajo
  const [showWorkShiftInput, setShowWorkShiftInput] = useState(false);

  // Efecto para cargar los turnos de trabajo cuando el RFC de la empresa cambia
  useEffect(() => {
    const loadWorkShifts = async () => {
      if (!companyRFC) { // Si no se proporciona el RFC de la empresa, limpia los turnos de trabajo
        setWorkShifts([]);
        return;
      }
      try {
        // Obtiene los turnos de trabajo para el RFC de la empresa dado desde la API
        const data = await fetch(`/api/WorkShift?rfc=${companyRFC}`).then(res => res.json());
        setWorkShifts(data); // Actualiza el estado con los turnos de trabajo obtenidos
      } catch (error) {
        console.error('Error al cargar los turnos de trabajo', error); // Registra cualquier error que ocurra durante la obtención
      }
    };

    loadWorkShifts(); // Llama a la función loadWorkShifts
  }, [companyRFC]); // Matriz de dependencias para el efecto, se ejecuta cuando companyRFC cambia

  // Función para manejar la selección o creación de un turno de trabajo
  const handleWorkShiftSelect = async (workShiftName: string) => {
    if (workShiftName.trim() === "") { // Si la entrada está vacía, limpia el campo de entrada y regresa
      setWorkShiftInput('');
      return;
    }

    // Busca si el turno de trabajo ya existe en la lista de turnos
    const existingWorkShift = workShifts.find(ws => ws.name.toLowerCase() === workShiftName.toLowerCase());
    if (existingWorkShift) {
      // Si el turno de trabajo existe, llama a onChange con el ID del turno existente
      onChange(existingWorkShift.id);
      return;
    }

    // Si el turno de trabajo no existe, envía una solicitud para crear un nuevo turno de trabajo
    const response = await fetch(`/api/WorkShift?rfc=${companyRFC}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: workShiftName }),
    });

    const result = await response.json();
    if (result.id) {
      // Si el turno de trabajo se crea con éxito, actualiza la lista de turnos y llama a onChange con el nuevo ID
      setWorkShifts([...workShifts, result]);
      onChange(result.id);
      setWorkShiftInput('');
      setShowWorkShiftInput(false);
    }
  };

  return (
    <>
      {!showWorkShiftInput ? ( // Muestra el componente de selección si no se está agregando un nuevo turno
        <Select
          value={value}
          onValueChange={(value) => {
            if (value === "new") { // Si se selecciona "nuevo", muestra el campo de entrada para agregar un nuevo turno
              setShowWorkShiftInput(true);
            } else {
              onChange(value); // Si se selecciona un turno existente, llama a onChange con el valor seleccionado
            }
          }}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar turno de trabajo" />
          </SelectTrigger>
          <SelectContent>
            {workShifts.map(ws => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.id}
              </SelectItem>
            ))}
            <SelectItem value="new">
              <span className="text-blue-600">Agregar nuevo turno de trabajo</span>
            </SelectItem>
          </SelectContent>
        </Select>
      ) : (
        // Muestra el campo de entrada para agregar un nuevo turno de trabajo
        <Input
          id="workShiftInput"
          name="workShiftInput"
          value={workShiftInput}
          onChange={(e) => setWorkShiftInput(e.target.value)}
          onBlur={() => handleWorkShiftSelect(workShiftInput)} // Maneja el caso cuando el campo pierde el foco
          onKeyDown={(e) => {
            if (e.key === 'Enter') { // Maneja el caso cuando se presiona la tecla Enter
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

export default WorkShiftSelect;

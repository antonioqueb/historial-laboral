'use client';

import { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface WorkShiftSelectProps {
  companyRFC: string;
  value: string;
  onChange: (value: string) => void;
}

const WorkShiftSelect: React.FC<WorkShiftSelectProps> = ({ companyRFC, value, onChange }) => {
  const [workShifts, setWorkShifts] = useState<{ id: string; name: string }[]>([]);
  const [workShiftInput, setWorkShiftInput] = useState<string>('');
  const [showWorkShiftInput, setShowWorkShiftInput] = useState(false);

  useEffect(() => {
    const loadWorkShifts = async () => {
      if (!companyRFC) {
        setWorkShifts([]);
        return;
      }
      try {
        const response = await fetch(`/api/WorkShift?rfc=${companyRFC}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Loaded work shifts:', data);
          setWorkShifts(data);
        } else {
          console.error('Failed to load work shifts');
        }
      } catch (error) {
        console.error('Error loading work shifts', error);
      }
    };

    loadWorkShifts();
  }, [companyRFC]);

  const handleWorkShiftSelect = async (workShiftName: string) => {
    if (workShiftName.trim() === "") {
      setWorkShiftInput('');
      return;
    }

    const existingWorkShift = workShifts.find(ws => ws.name.toLowerCase() === workShiftName.toLowerCase());
    if (existingWorkShift) {
      console.log('Existing work shift selected:', existingWorkShift);
      onChange(existingWorkShift.id);
      setShowWorkShiftInput(false); // Ensure to hide the input field after selection
      return;
    }

    try {
      const response = await fetch(`/api/WorkShift?rfc=${companyRFC}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: workShiftName }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('New work shift created:', result);

        if (result.id) {
          setWorkShifts([...workShifts, result]);
          onChange(result.id);
          setWorkShiftInput('');
          setShowWorkShiftInput(false);
        }
      } else {
        console.error('Failed to create new work shift');
      }
    } catch (error) {
      console.error('Error creating new work shift', error);
    }
  };

  return (
    <>
      {!showWorkShiftInput ? (
        <Select
          value={value || ""}
          onValueChange={(value: string) => {
            console.log('Select value changed:', value);
            if (value === "new") {
              setShowWorkShiftInput(true);
            } else {
              onChange(value);
            }
          }}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar turno de trabajo" />
          </SelectTrigger>
          <SelectContent>
            {workShifts
              .filter(ws => ws.id.trim() !== "") // Filtra turnos con id no vacíos
              .map(ws => (
                <SelectItem key={ws.id} value={ws.id}>
                  {ws.name}
                </SelectItem>
              ))}
            <SelectItem value="new">
              <span className="text-blue-600">Agregar nuevo turno de trabajo</span>
            </SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <Input
          id="workShiftInput"
          name="workShiftInput"
          value={workShiftInput}
          onChange={(e) => {
            console.log('Work shift input changed:', e.target.value);
            setWorkShiftInput(e.target.value);
          }}
          onBlur={() => handleWorkShiftSelect(workShiftInput)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
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

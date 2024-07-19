'use client';

import { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface ContractTypeSelectProps {
  companyRFC: string;
  value: string;
  onChange: (value: string) => void;
}

const ContractTypeSelect: React.FC<ContractTypeSelectProps> = ({ companyRFC, value, onChange }) => {
  const [contractTypes, setContractTypes] = useState<{ id: string; name: string }[]>([]);
  const [contractTypeInput, setContractTypeInput] = useState<string>('');
  const [showContractTypeInput, setShowContractTypeInput] = useState(false);

  useEffect(() => {
    const loadContractTypes = async () => {
      if (!companyRFC) {
        setContractTypes([]);
        return;
      }
      try {
        const data = await fetch(`/api/ContractType?rfc=${companyRFC}`).then(res => res.json());
        console.log('Loaded contract types:', data);
        setContractTypes(data);
      } catch (error) {
        console.error('Error loading contract types', error);
      }
    };

    loadContractTypes();
  }, [companyRFC]);

  const handleContractTypeSelect = async (contractTypeName: string) => {
    if (contractTypeName.trim() === "") {
      setContractTypeInput('');
      return;
    }

    const existingContractType = contractTypes.find(ct => ct.name.toLowerCase() === contractTypeName.toLowerCase());
    if (existingContractType) {
      console.log('Existing contract type selected:', existingContractType);
      onChange(existingContractType.id);
      return;
    }

    try {
      const response = await fetch(`/api/ContractType?rfc=${companyRFC}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contractTypeName }),
      });

      const result = await response.json();
      console.log('New contract type created:', result);

      if (result.id) {
        setContractTypes([...contractTypes, result]);
        onChange(result.id);
        setContractTypeInput('');
        setShowContractTypeInput(false);
      }
    } catch (error) {
      console.error('Error creating new contract type', error);
    }
  };

  return (
    <>
      {!showContractTypeInput ? (
        <Select
          value={value || ""}
          onValueChange={(value) => {
            console.log('Select value changed:', value);
            if (value === "new") {
              setShowContractTypeInput(true);
            } else {
              onChange(value);
            }
          }}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo de contrato" />
          </SelectTrigger>
          <SelectContent>
            {contractTypes
              .filter(ct => ct.id.trim() !== "") // Filtra tipos de contrato con id no vacíos
              .map(ct => (
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
        <Input
          id="contractTypeInput"
          name="contractTypeInput"
          value={contractTypeInput}
          onChange={(e) => {
            console.log('Contract type input changed:', e.target.value);
            setContractTypeInput(e.target.value);
          }}
          onBlur={() => handleContractTypeSelect(contractTypeInput)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
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

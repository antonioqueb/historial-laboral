'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Employee {
  socialSecurityNumber: string;
  name: string;
}

const CompanyPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const searchParams = useSearchParams();
  const companyRFC = searchParams.get('companyRFC') as string;
  const [selectedEmployeeNss, setSelectedEmployeeNss] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`/api/listEmployeesByCompanyRFC?rfc=${companyRFC}`);
        if (res.ok) {
          const data = await res.json();
          setEmployees(data.employees);
        }
      } catch (error) {
        console.error('Failed to fetch employees', error);
      }
    };

    if (companyRFC) {
      fetchEmployees();
    }
  }, [companyRFC]);

  const handleEmployeeSelect = (nss: string) => {
    setSelectedEmployeeNss(nss);
    router.push(`/tablero/empleados/editar/${companyRFC}/${nss}`);
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
          <SelectValue placeholder="Seleccionar empleado" />
        </SelectTrigger>
        <SelectContent>
          {employees.map(employee => (
            <SelectItem key={employee.socialSecurityNumber} value={employee.socialSecurityNumber}>
              {employee.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompanyPage;

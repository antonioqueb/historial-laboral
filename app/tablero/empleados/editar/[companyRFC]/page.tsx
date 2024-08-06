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
        console.log(`Fetching employees for company RFC: ${companyRFC}`);
        const res = await fetch(`/api/listEmployeesByCompanyRFC?rfc=${companyRFC}`);
        console.log('Fetch response status:', res.status);
        if (res.ok) {
          const data = await res.json();
          console.log('Fetched employees data:', data);
          if (data && data.employees) {
            setEmployees(data.employees);
            console.log('Employees set in state:', data.employees);
          } else {
            console.error('No employees found in response data');
          }
        } else {
          console.error('Failed to fetch employees, response not OK');
        }
      } catch (error) {
        console.error('Failed to fetch employees', error);
      }
    };

    if (companyRFC) {
      fetchEmployees();
    }
  }, [companyRFC]);

  useEffect(() => {
    console.log('Current employees:', employees);
  }, [employees]);

  const handleEmployeeSelect = (nss: string) => {
    console.log(`Selected employee NSS: ${nss}`);
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
          {employees.length > 0 ? (
            employees.map(employee => (
              <SelectItem key={employee.socialSecurityNumber} value={employee.socialSecurityNumber}>
                {employee.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-employees" disabled>
              No hay empleados disponibles
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompanyPage;

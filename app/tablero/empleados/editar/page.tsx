'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Company {
  rfc: string;
  razonSocial: string;
}

const EditPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyRFC, setSelectedCompanyRFC] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/listCompanies');
        if (res.ok) {
          const data = await res.json();
          setCompanies(data.companies);
        }
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    };
    fetchCompanies();
  }, []);

  const handleCompanySelect = (rfc: string) => {
    setSelectedCompanyRFC(rfc);
    router.push(`/tablero/empleados/editar/${rfc}`);
  };

  return (
    <div>
      <Label className="mb-2" htmlFor="company">Seleccionar Empresa</Label>
      <Select
        value={selectedCompanyRFC}
        onValueChange={handleCompanySelect}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar empresa" />
        </SelectTrigger>
        <SelectContent>
          {companies.map(company => (
            <SelectItem key={company.rfc} value={company.rfc}>
              {company.razonSocial}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EditPage;

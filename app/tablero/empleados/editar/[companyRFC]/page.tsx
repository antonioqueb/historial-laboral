// app/tablero/empleados/editar/[companyRFC]/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';

const CompanyPage = () => {
  const searchParams = useSearchParams();
  const companyRFC = searchParams.get('companyRFC');

  return (
    <div>
      <h1>Company: {companyRFC}</h1>
      <p>Seleccione un empleado para editar.</p>
    </div>
  );
};

export default CompanyPage;

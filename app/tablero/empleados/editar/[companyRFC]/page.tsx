// app/tablero/empleados/editar/[companyRFC]/page.tsx
import { useRouter } from 'next/router';

const CompanyPage = () => {
  const router = useRouter();
  const { companyRFC } = router.query;

  return (
    <div>
      <h1>Company: {companyRFC}</h1>
      <p>Seleccione un empleado para editar.</p>
    </div>
  );
};

export default CompanyPage;

'use client'; // Asegura que el código se ejecute en el cliente

import { useParams, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Empleado {
  nombre: string;
  curp: string;
  rfc: string;
  nss: string;
}

const Contrato: FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const codigo = params.codigo as string;

  const [empleado, setEmpleado] = useState<Empleado | null>(null);

  useEffect(() => {
    if (codigo) {
      const nombre = searchParams.get('nombre') || '';
      const curp = searchParams.get('curp') || '';
      const rfc = searchParams.get('rfc') || '';
      const nss = searchParams.get('nss') || '';

      setEmpleado({ nombre, curp, rfc, nss });
    }
  }, [codigo, searchParams]);

  if (!codigo) {
    return <div>Código no encontrado</div>;
  }

  if (!empleado) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Contrato</h1>
      <p>El código del contrato es: {codigo}</p>
      <p>Nombre: {empleado.nombre}</p>
      <p>CURP: {empleado.curp}</p>
      <p>RFC: {empleado.rfc}</p>
      <p>NSS: {empleado.nss}</p>
      {/* Aquí podrías agregar más detalles sobre el contrato y la funcionalidad para firmarlo */}
    </div>
  );
};

export default Contrato;

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
    <div style={{ margin: '0 auto', maxWidth: '800px', padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1 style={{ textAlign: 'center', textDecoration: 'underline' }}>Contrato de Aceptación de Condiciones</h1>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>El presente contrato establece los términos y condiciones entre el empleador y el empleado.</p>
      <p><strong>Código del contrato:</strong> {codigo}</p>
      <p><strong>Nombre del Empleado:</strong> {empleado.nombre}</p>
      <p><strong>CURP:</strong> {empleado.curp}</p>
      <p><strong>RFC:</strong> {empleado.rfc}</p>
      <p><strong>NSS:</strong> {empleado.nss}</p>

      <h2>Términos y Condiciones</h2>
      <p>1. El empleado se compromete a cumplir con todas las políticas y procedimientos de la empresa.</p>
      <p>2. La empresa se reserva el derecho de modificar los términos y condiciones del contrato con previo aviso al empleado.</p>
      <p>3. El empleado acepta que toda la información proporcionada es verídica y está actualizada.</p>

      <h2>Autorización para el Uso de Datos</h2>
      <p>El empleado autoriza a la empresa a utilizar sus datos personales con el fin de cumplir con las obligaciones laborales y para cualquier otro propósito relacionado con la administración del personal. Esto incluye, pero no se limita a, el procesamiento de nómina, beneficios, y evaluaciones de desempeño.</p>

      <h2>Opinión de la Empresa sobre el Empleado</h2>
      <p>La empresa considera que {empleado.nombre} es un activo valioso para el equipo. Su dedicación y profesionalismo han sido evidentes en todas sus tareas y responsabilidades. Confiamos en que su contribución seguirá siendo esencial para el éxito de nuestra organización.</p>

      <h2>Firma</h2>
      <p>Al firmar este documento, el empleado acepta todos los términos y condiciones establecidos en este contrato.</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
        <div>
          <p>_____________________________</p>
          <p><strong>Firma del Empleado</strong></p>
          <p>{empleado.nombre}</p>
        </div>
        <div>
          <p>_____________________________</p>
          <p><strong>Firma del Representante de la Empresa</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Contrato;

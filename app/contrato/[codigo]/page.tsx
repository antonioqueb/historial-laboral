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
    return <div className="text-center text-red-500">Código no encontrado</div>;
  }

  if (!empleado) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-8 font-sans leading-relaxed">
      <h1 className="text-2xl font-bold text-center underline">Contrato de Aceptación de Condiciones</h1>
      <p className="text-center italic mt-2">El presente contrato establece los términos y condiciones entre el empleador y el empleado.</p>
      <section className="mt-6">
        <p><strong>Código del contrato:</strong> {codigo}</p>
        <p><strong>Nombre del Empleado:</strong> {empleado.nombre}</p>
        <p><strong>CURP:</strong> {empleado.curp}</p>
        <p><strong>RFC:</strong> {empleado.rfc}</p>
        <p><strong>NSS:</strong> {empleado.nss}</p>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Términos y Condiciones</h2>
        <ol className="list-decimal list-inside mt-2">
          <li>El empleado se compromete a cumplir con todas las políticas y procedimientos de la empresa.</li>
          <li>La empresa se reserva el derecho de modificar los términos y condiciones del contrato con previo aviso al empleado.</li>
          <li>El empleado acepta que toda la información proporcionada es verídica y está actualizada.</li>
        </ol>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Autorización para el Uso de Datos</h2>
        <p className="mt-2">El empleado autoriza a la empresa a utilizar sus datos personales con el fin de cumplir con las obligaciones laborales y para cualquier otro propósito relacionado con la administración del personal. Esto incluye, pero no se limita a, el procesamiento de nómina, beneficios, y evaluaciones de desempeño.</p>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Opinión de la Empresa sobre el Empleado</h2>
        <p className="mt-2">La empresa considera que {empleado.nombre} es un activo valioso para el equipo. Su dedicación y profesionalismo han sido evidentes en todas sus tareas y responsabilidades. Confiamos en que su contribución seguirá siendo esencial para el éxito de nuestra organización.</p>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Firma</h2>
        <p className="mt-2">Al firmar este documento, el empleado acepta todos los términos y condiciones establecidos en este contrato.</p>
      </section>
      <div className="flex justify-between mt-12">
        <div className="text-center">
          <p className="border-t border-gray-400 pt-2">_____________________________</p>
          <p className="font-semibold">Firma del Empleado</p>
          <p>{empleado.nombre}</p>
        </div>
        <div className="text-center">
          <p className="border-t border-gray-400 pt-2">_____________________________</p>
          <p className="font-semibold">Firma del Representante de la Empresa</p>
        </div>
      </div>
    </main>
  );
};

export default Contrato;

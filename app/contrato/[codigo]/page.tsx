'use client'; // Asegura que el código se ejecute en el cliente

import { useParams } from 'next/navigation';
import { FC } from 'react';

const Contrato: FC = () => {
  const params = useParams();
  const codigo = params.codigo as string;

  if (!codigo) {
    return <div>Código no encontrado</div>;
  }

  return (
    <div>
      <h1>Contrato</h1>
      <p>El código del contrato es: {codigo}</p>
      {/* Aquí podrías agregar más detalles sobre el contrato y la funcionalidad para firmarlo */}
    </div>
  );
};

export default Contrato;

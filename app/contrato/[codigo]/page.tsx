'use client'; // Asegura que el código se ejecute en el cliente

import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const Contrato: FC = () => {
  const searchParams = useSearchParams();
  const codigo = searchParams.get('codigo');

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

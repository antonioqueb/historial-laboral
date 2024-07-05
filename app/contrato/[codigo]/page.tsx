'use client'; // Esto asegura que el código se ejecute en el cliente

import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

interface Params {
  codigo: string;
}

const Contrato: FC = () => {
  const router = useRouter();
  const [codigo, setCodigo] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const { codigo } = router.query as unknown as Params;
      setCodigo(codigo);
    }
  }, [router.isReady, router.query]);

  if (!codigo) {
    return <div>Cargando...</div>;
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

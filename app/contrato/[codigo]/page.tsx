// app/contrato/[codigo]/page.tsx
import { useRouter } from 'next/router';

interface Params {
  codigo: string;
}

const Contrato: React.FC = () => {
  const router = useRouter();
  const { codigo } = router.query as unknown as Params;

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

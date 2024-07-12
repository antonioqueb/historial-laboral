'use client';
import React from 'react';
import ScoreGraph from './ScoreGraph'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo

interface ScoreGraphEmployedProps {
  value?: number;
}

const ScoreGraphEmployed: React.FC<ScoreGraphEmployedProps> = ({ value = 72 }) => {
  return (
    <div className="flex flex-col items-center justify-center h-fit p-4 pt-6 sm:p-6 md:p-8 lg:p-10 lg:pt-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 sm:mb-4">
          Credibilidad Laboral
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6">
          El puntaje Credibilidad Laboral se basa en recomendaciones y evaluaciones proporcionadas por sus empleadores anteriores. Este puntaje refleja su desempeño, habilidades y profesionalismo a lo largo de su trayectoria laboral.
        </p>
        <div className="flex justify-center mb-4 sm:mb-6">
          <ScoreGraph value={value} />
        </div>
        <p className="text-center text-xs sm:text-sm md:text-base text-muted-foreground pb-2 sm:pb-4">
          Datos mostrados en el gráfico son basados en 7 recomendaciones
        </p>
      </div>
    </div>
  );
};

export default ScoreGraphEmployed;

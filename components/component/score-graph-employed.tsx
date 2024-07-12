// ScoreGraphEmployed.tsx
'use client';
import React from 'react';
import ScoreGraph from './ScoreGraph'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo

interface ScoreGraphEmployedProps {
  value?: number;
}

const ScoreGraphEmployed: React.FC<ScoreGraphEmployedProps> = ({ value = 70 }) => {
  return (
    <div className="flex items-center justify-center h-fit">
      <ScoreGraph value={value} />
    </div>
  );
};

export default ScoreGraphEmployed;

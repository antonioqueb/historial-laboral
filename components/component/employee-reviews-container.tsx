import React from 'react';
import { EmployeeReviewCard } from "./EmployeeReviewCard";

export function EmployeeReviewsContainer() {
  return (
    <div className="flex justify-center py-8">
      <div className="grid gap-8 w-full max-w-4xl p-4">
        <EmployeeReviewCard 
          name="Google Inc." 
          role="Empresa de Software" 
          overallRating={4.9}
          reviews={[
            {
              rating: 4.9,
              review: "Julio es un ingeniero de software talentoso y dedicado. Tiene una fuerte ética de trabajo y siempre entrega trabajos de alta calidad. Lo recomiendo encarecidamente.",
              date: "2023-05-12",
            },
            {
              rating: 4.8,
              review: "Las habilidades técnicas de Julio son excelentes y siempre está ansioso por aprender y asumir nuevos desafíos. Es un gran jugador de equipo y un valioso activo para cualquier organización.",
              date: "2024-01-15",
            },
          ]}
        />
        <EmployeeReviewCard 
          name="Microsoft Corporation" 
          role="Empresa de Tecnología" 
          overallRating={4.6}
          reviews={[
            {
              rating: 4.7,
              review: "Julio es un gerente de producto excepcional. Tiene un gran ojo para los detalles y una comprensión profunda de las necesidades de los usuarios. Su liderazgo y pensamiento estratégico han sido invaluables para nuestro equipo.",
              date: "2023-06-22",
            },
            {
              rating: 4.5,
              review: "Julio es una comunicadora y colaboradora fuerte. Puede cerrar efectivamente la brecha entre los stakeholders de ingeniería y de negocios, asegurando la entrega exitosa del producto.",
              date: "2024-02-10",
            },
          ]}
        />
        <EmployeeReviewCard 
          name="Amazon" 
          role="Empresa de Comercio Electrónico" 
          overallRating={4.4}
          reviews={[
            {
              rating: 4.4,
              review: "Julio es un analista de datos hábil con un gran ojo para los detalles. Tiene una mentalidad analítica fuerte y es capaz de descubrir insights valiosos de conjuntos de datos complejos.",
              date: "2023-07-08",
            },
            {
              rating: 4.3,
              review: "Julio es un miembro del equipo confiable y proactivo. Siempre está dispuesto a hacer un esfuerzo adicional para asegurar el éxito de nuestras iniciativas de datos.",
              date: "2024-03-20",
            },
            {
              rating: 0.3,
              review: "Terrible experiencia Julio no sabe nada",
              date: "2024-06-20",
            },
          ]}
        />
      </div>
    </div>
  );
}

// components\ResponseSearch.jsx

import { AiFillStar, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

export default function ResponseSearch({ reviews }) {
  if (!reviews.length) return null; // No mostrar nada si no hay reseñas

  return (
    <div className="flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 min-h-screen">
      <section className="p-6 max-w-7xl w-full py-8 bg-white dark:bg-zinc-800 shadow-lg rounded-lg">
        <div className="grid gap-6">
          {reviews.map(({ id, title, description, rating, positive, documentation, company, createdAt }) => (
            <div key={id} className="p-4 flex flex-col gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors duration-200">
              <div className="grid gap-1">
                <h3 className="text-xl font-semibold flex items-center">
                  {title} 
                  <span className="ml-2 text-yellow-500 flex items-center">
                    {[...Array(rating)].map((_, index) => (
                      <AiFillStar key={index} />
                    ))}
                  </span>
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
                <div className="flex items-center text-sm">
                  <span className="flex items-center">
                    {positive ? (
                      <AiOutlineCheckCircle className="text-green-500 mr-1" />
                    ) : (
                      <AiOutlineCloseCircle className="text-red-500 mr-1" />
                    )}
                    Positiva: {positive ? "Sí" : "No"}
                  </span>
                </div>
                <p className="text-sm">Documentación: {documentation}</p>
                <p className="text-sm">Empresa: {company.name}</p>
                <p className="text-sm">Fecha: {new Date(createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
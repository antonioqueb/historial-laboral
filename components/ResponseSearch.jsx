// components\ResponseSearch.jsx

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";

export default function ResponseSearch({ reviews }) {
  if (!reviews.length) return null; // No mostrar nada si no hay reseñas

  return (
    <div className="flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <section className="p-6 max-w-7xl w-full py-8 bg-white dark:bg-zinc-800 shadow-lg rounded-lg">
        <div className="grid gap-6">
          {reviews.map(({ id, title, description, rating, positive, documentation, company, createdAt }) => (
            <div key={id} className="p-2 flex flex-col gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-lg">
              <div className="grid gap-1">
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
                <p className="text-sm">Calificación: {rating}</p>
                <p className="text-sm">Positiva: {positive ? "Sí" : "No"}</p>
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

import { AiFillStar, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ResponseSearch({ reviews }) {
  if (!reviews || !reviews.length) return null; // No mostrar nada si no hay reseñas

  return (
    <TooltipProvider>
      <div className="w-full mt-6"> {/* Añadir margen superior */}
        <section className="p-4 w-full bg-white dark:bg-zinc-800 shadow-lg rounded-lg">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map(({ id, title, description, rating, positive, documentation, company, createdAt }) => (
              <Card key={id} className="hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200">
                <CardHeader className="flex items-center justify-between p-4">
                  <CardTitle className="text-xl font-semibold">
                    {title}
                  </CardTitle>
                  <div className="flex items-center">
                    {[...Array(rating)].map((_, index) => (
                      <AiFillStar key={index} className="text-yellow-500" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardDescription className="text-sm text-zinc-600 dark:text-zinc-400">
                    {description}
                  </CardDescription>
                  <div className="flex items-center mt-2">
                    <Tooltip content={positive ? "Positiva" : "Negativa"}>
                      {positive ? (
                        <AiOutlineCheckCircle className="text-green-500 mr-1" />
                      ) : (
                        <AiOutlineCloseCircle className="text-red-500 mr-1" />
                      )}
                    </Tooltip>
                    <span className="text-sm">Positiva: {positive ? "Sí" : "No"}</span>
                  </div>
                  <p className="text-sm mt-2">Documentación: {documentation}</p>
                  <p className="text-sm mt-2">Empresa: {company.name}</p>
                  <p className="text-sm mt-2">Fecha: {new Date(createdAt).toLocaleDateString()}</p>
                </CardContent>
                <CardFooter className="p-4">
                  <Badge variant={positive ? "solid" : "outline"} className={positive ? "bg-green-500" : "bg-red-500"}>
                    {positive ? "Recomendado" : "No Recomendado"}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}

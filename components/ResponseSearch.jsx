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
      <div className="w-full mt-6">
        <section className="p-4 w-full bg-white dark:bg-zinc-800 shadow-lg rounded-lg">
          <div className="flex flex-wrap gap-6">
            {reviews.map(({ id, title, description, rating, positive, company, createdAt }) => (
              <Card key={id} className="flex w-full flex-col hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200">
                <div className="flex w-full">
                  <div className="flex flex-col justify-between w-full p-4">
                    <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between p-0">
                      <CardTitle className="text-lg font-semibold md:text-xl">
                        {title}
                      </CardTitle>
                      <div className="flex items-center mt-2 md:mt-0">
                        {[...Array(rating)].map((_, index) => (
                          <AiFillStar key={index} className="text-yellow-500" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 mt-2">
                      <CardDescription className="text-sm text-zinc-600 dark:text-zinc-400">
                        {description}
                      </CardDescription>
                      <div className="flex items-center mt-2">
                      <span className="text-sm">Positiva: {positive ? "Sí" : "No"}</span>
                        <Tooltip content={positive ? "Positiva" : "Negativa"}>
                          {positive ? (
                            <AiOutlineCheckCircle className="text-green-500 ml-1" />
                          ) : (
                            <AiOutlineCloseCircle className="text-red-500 ml-1" />
                          )}
                        </Tooltip>
                      </div>
                      <p className="text-sm font-semibold mt-2">{company.name}</p>
                      <p className="text-sm mt-2">{new Date(createdAt).toLocaleDateString()}</p>
                    </CardContent>
                    <CardFooter className="p-0 mt-4">
                      <Badge variant={positive ? "solid" : "outline"} className={positive ? "bg-green-600" : "bg-red-600"}>
                        {positive ? "Recomendado" : "No Recomendado"}
                      </Badge>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}

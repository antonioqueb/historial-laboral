import { z } from "zod";

export const reviewSchema = z.object({
  employeeId: z.string().nonempty("El ID del empleado es requerido"),
  companyId: z.string().nonempty("El ID de la empresa es requerido"),
  title: z.string().nonempty("El título es requerido"),
  description: z.string().nonempty("La descripción es requerida"),
  rating: z.number().min(0, "La calificación no puede ser menor que 0").max(5, "La calificación no puede ser mayor que 5"),
  positive: z.boolean(),
  documentation: z.string().optional(),
  userId: z.string().optional(),
});

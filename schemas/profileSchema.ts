import { z } from "zod";

export const profileSchema = z.object({
  email: z.string().email("Correo electrónico inválido").nonempty("El correo electrónico es requerido"),
  name: z.string().nonempty("El nombre es requerido"),
});

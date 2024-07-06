import { z } from "zod";

export const searchEmployeeSchema = z.object({
  employeeNss: z.string().nonempty("El NSS del empleado es requerido"),
});

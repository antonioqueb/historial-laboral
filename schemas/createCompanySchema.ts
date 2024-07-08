// schemas\createCompanySchema.ts
import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().nonempty("Nombre es requerido"),
  userId: z.string().nonempty("User ID es requerido"),
  razonSocial: z.string().nonempty("Razón Social es requerida"),
  rfc: z.string().nonempty("RFC es requerido"),
  domicilioFiscalCalle: z.string().nonempty("Calle es requerida"),
  domicilioFiscalNumero: z.string().nonempty("Número es requerido"),
  domicilioFiscalColonia: z.string().nonempty("Colonia es requerida"),
  domicilioFiscalMunicipio: z.string().nonempty("Municipio es requerido"),
  domicilioFiscalEstado: z.string().nonempty("Estado es requerido"),
  domicilioFiscalCodigoPostal: z.string().nonempty("Código Postal es requerido"),
  nombreComercial: z.string().optional(),
  objetoSocial: z.string().nonempty("Objeto Social es requerido"),
  representanteLegalNombre: z.string().nonempty("Nombre del Representante Legal es requerido"),
  representanteLegalCurp: z.string().optional(),  // No requerido
  capitalSocial: z.number().optional(),           // No requerido
  registrosImss: z.string().optional(),           // No requerido
  registrosInfonavit: z.string().optional(),      // No requerido
  giroActividadEconomica: z.string().optional(),  // No requerido
  certificaciones: z.array(z.string()).optional(),
  logo: z.instanceof(File).optional()
});

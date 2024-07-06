import { z } from "zod";

const editCompanySchema = z.object({
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
  nombreComercial: z.string().nonempty("Nombre Comercial es requerido"),
  objetoSocial: z.string().nonempty("Objeto Social es requerido"),
  representanteLegalNombre: z.string().nonempty("Nombre del Representante Legal es requerido"),
  representanteLegalCurp: z.string().nonempty("CURP del Representante Legal es requerido"),
  capitalSocial: z.number().positive("Capital Social debe ser mayor a cero"),
  registrosImss: z.string().nonempty("Registros IMSS es requerido"),
  registrosInfonavit: z.string().nonempty("Registros Infonavit es requerido"),
  giroActividadEconomica: z.string().nonempty("Actividad Económica es requerida"),
  certificaciones: z.array(z.string()).optional(),
});

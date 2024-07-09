import { z } from "zod";

const createEmployedSchema = z.object({
  name: z.string().nonempty("Nombre completo es requerido"),
  role: z.string().nonempty("Rol es requerido"),
  department: z.string().nonempty("Departamento es requerido"),
  companyId: z.string().nonempty("Empresa es requerida"),
  socialSecurityNumber: z.string().nonempty("Número de Seguridad Social es requerido"),
  CURP: z.string().nonempty("CURP es requerido"),
  RFC: z.string().nonempty("RFC es requerido"),
  address: z.string().nonempty("Dirección es requerida"),
  phoneNumber: z.string().nonempty("Número de Teléfono es requerido"),
  email: z.string().email("Correo Electrónico inválido").nonempty("Correo Electrónico es requerido"),
  birthDate: z.string().nonempty("Fecha de Nacimiento es requerida"),
  hireDate: z.string().nonempty("Fecha de Contratación es requerida"),
  emergencyContact: z.string().nonempty("Contacto de Emergencia es requerido"),
  emergencyPhone: z.string().nonempty("Teléfono de Emergencia es requerido"),
  maritalStatus: z.string().nonempty("Estado Civil es requerido"),
  nationality: z.string().nonempty("Nacionalidad es requerida"),
  educationLevel: z.string().nonempty("Nivel Educativo es requerido"),
  gender: z.string().nonempty("Género es requerido"),
  bloodType: z.string().nonempty("Tipo de Sangre es requerido"),
  jobTitle: z.string().nonempty("Título del Trabajo es requerido"),
  workShift: z.string().nonempty("Turno de Trabajo es requerido"),
  contractType: z.string().nonempty("Tipo de Contrato es requerido"),
  profileImage: z.any().optional(), // Optional file
});

export default createEmployedSchema;

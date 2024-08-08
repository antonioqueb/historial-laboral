import { z } from "zod";

export const editEmployeeSchema = z.object({
  id: z.string().nonempty("ID es requerido"),
  name: z.string().nonempty("Nombre completo es requerido"),
  role: z.object({
    id: z.string().nonempty("ID del Rol es requerido"),
    name: z.string().nonempty("Nombre del Rol es requerido")
  }),
  department: z.object({
    id: z.string().nonempty("ID del Departamento es requerido"),
    name: z.string().nonempty("Nombre del Departamento es requerido")
  }),
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
  jobTitle: z.object({
    id: z.string().nonempty("ID del Título del Trabajo es requerido"),
    name: z.string().nonempty("Nombre del Título del Trabajo es requerido")
  }),
  workShift: z.object({
    id: z.string().nonempty("ID del Turno de Trabajo es requerido"),
    name: z.string().nonempty("Nombre del Turno de Trabajo es requerido")
  }),
  contractType: z.object({
    id: z.string().nonempty("ID del Tipo de Contrato es requerido"),
    name: z.string().nonempty("Nombre del Tipo de Contrato es requerido")
  }),
  profileImageUrl: z.string().nullable(), // URL opcional para la imagen de perfil
});

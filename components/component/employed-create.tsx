'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Company {
  id: string;
  razonSocial: string;
}

export default function DashboardEmployedAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    description: '',
    companyId: '',
    socialSecurityNumber: '',
    CURP: '',
    RFC: '',
    address: '',
    phoneNumber: '',
    email: '',
    birthDate: '',
    hireDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    bankAccountNumber: '',
    clabeNumber: '',
    maritalStatus: '',
    nationality: '',
    educationLevel: '',
    gender: '',
    bloodType: '',
    jobTitle: '',
    workShift: '',
    contractType: '',
    profileImage: null as File | null,
  });

  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/listCompanies');
        if (res.ok) {
          const data = await res.json();
          setCompanies(data.companies);
        } else {
          setError('Failed to fetch companies');
        }
      } catch (err) {
        setError('Failed to fetch companies');
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, companyId: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (value !== null && value !== undefined && value !== '') {
        form.append(key, value);
      }
    });

    try {
      const response = await fetch('/api/createEmployee', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setSuccess('Empleado creado exitosamente');
        setFormData({
          name: '',
          role: '',
          department: '',
          description: '',
          companyId: '',
          socialSecurityNumber: '',
          CURP: '',
          RFC: '',
          address: '',
          phoneNumber: '',
          email: '',
          birthDate: '',
          hireDate: '',
          emergencyContact: '',
          emergencyPhone: '',
          bankAccountNumber: '',
          clabeNumber: '',
          maritalStatus: '',
          nationality: '',
          educationLevel: '',
          gender: '',
          bloodType: '',
          jobTitle: '',
          workShift: '',
          contractType: '',
          profileImage: null,
        });
      } else {
        const data = await response.json();
        setError(data.error || 'Error al crear el empleado');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Administrar Empleados</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="name">
              Nombre
            </Label>
            <Input
              className="col-span-3"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="role">
              Rol
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
              required
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Gerente</SelectItem>
                <SelectItem value="developer">Desarrollador</SelectItem>
                <SelectItem value="designer">Diseñador</SelectItem>
                <SelectItem value="hr">Recursos Humanos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="department">
              Departamento
            </Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
              required
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Ingeniería</SelectItem>
                <SelectItem value="design">Diseño</SelectItem>
                <SelectItem value="hr">Recursos Humanos</SelectItem>
                <SelectItem value="marketing">Mercadotecnia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="description">
              Descripción
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ingrese una breve descripción del empleado"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="companyId">
              Empresa
            </Label>
            <Select
              value={formData.companyId}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar empresa" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.razonSocial}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="socialSecurityNumber">
              Número de Seguridad Social
            </Label>
            <Input
              className="col-span-3"
              id="socialSecurityNumber"
              name="socialSecurityNumber"
              value={formData.socialSecurityNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="CURP">
              CURP
            </Label>
            <Input
              className="col-span-3"
              id="CURP"
              name="CURP"
              value={formData.CURP}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="RFC">
              RFC
            </Label>
            <Input
              className="col-span-3"
              id="RFC"
              name="RFC"
              value={formData.RFC}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="address">
              Dirección
            </Label>
            <Input
              className="col-span-3"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="phoneNumber">
              Número de Teléfono
            </Label>
            <Input
              className="col-span-3"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="email">
              Correo Electrónico
            </Label>
            <Input
              className="col-span-3"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="birthDate">
              Fecha de Nacimiento
            </Label>
            <Input
              type="date"
              className="col-span-3"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="hireDate">
              Fecha de Contratación
            </Label>
            <Input
              type="date"
              className="col-span-3"
              id="hireDate"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="emergencyContact">
              Contacto de Emergencia
            </Label>
            <Input
              className="col-span-3"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="emergencyPhone">
              Teléfono de Emergencia
            </Label>
            <Input
              className="col-span-3"
              id="emergencyPhone"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="bankAccountNumber">
              Número de Cuenta Bancaria
            </Label>
            <Input
              className="col-span-3"
              id="bankAccountNumber"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="clabeNumber">
              CLABE
            </Label>
            <Input
              className="col-span-3"
              id="clabeNumber"
              name="clabeNumber"
              value={formData.clabeNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="maritalStatus">
              Estado Civil
            </Label>
            <Input
              className="col-span-3"
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="nationality">
              Nacionalidad
            </Label>
            <Input
              className="col-span-3"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="educationLevel">
              Nivel Educativo
            </Label>
            <Input
              className="col-span-3"
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="gender">
              Género
            </Label>
            <Input
              className="col-span-3"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="bloodType">
              Tipo de Sangre
            </Label>
            <Input
              className="col-span-3"
              id="bloodType"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="jobTitle">
              Título del Trabajo
            </Label>
            <Input
              className="col-span-3"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="workShift">
              Turno de Trabajo
            </Label>
            <Input
              className="col-span-3"
              id="workShift"
              name="workShift"
              value={formData.workShift}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="contractType">
              Tipo de Contrato
            </Label>
            <Input
              className="col-span-3"
              id="contractType"
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label className="text-right md:text-left md:col-span-1" htmlFor="profileImage">
              Foto de Perfil
            </Label>
            <Input
              type="file"
              className="col-span-3"
              id="profileImage"
              name="profileImage"
              onChange={handleFileChange}
            />
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <Button type="submit">Agregar</Button>
      </form>
    </div>
  );
}

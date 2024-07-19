'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface PersonalInfoFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormData: (data: any) => void;
  civilStatuses: string[];
  genders: string[];
  nationalities: any[];
  filteredNationalities: any[];
  handleNationalitySearch: (searchTerm: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  handleChange,
  setFormData,
  civilStatuses,
  genders,
  nationalities,
  filteredNationalities,
  handleNationalitySearch,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
      <div className="grid gap-6 md:grid-cols-2 py-4">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="socialSecurityNumber">Número de Seguridad Social</Label>
            <Input id="socialSecurityNumber" name="socialSecurityNumber" value={formData.socialSecurityNumber} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
            <Input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="address">Dirección</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="phoneNumber">Número de Teléfono</Label>
            <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="maritalStatus">Estado Civil</Label>
            <Select value={formData.maritalStatus} onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado civil" />
              </SelectTrigger>
              <SelectContent>
                {civilStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="gender">Género</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar género" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="nationality">Nacionalidad</Label>
            <Select value={formData.nationality} onValueChange={(value) => setFormData({ ...formData, nationality: value })} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar nacionalidad" />
              </SelectTrigger>
              <SelectContent>
                <Input
                  type="text"
                  placeholder="Buscar..."
                  onChange={(e) => handleNationalitySearch(e.target.value)}
                  className="mb-2"
                />
                {filteredNationalities.map((nationality) => (
                  <SelectItem key={nationality.sigla} value={nationality.nombre}>
                    {nationality.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <h2>Contacto de emergencia</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="emergencyContact">Nombre</Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <Label htmlFor="emergencyPhone">Teléfono</Label>
            <Input
              id="emergencyPhone"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;

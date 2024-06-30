// components\component\employedReview.tsx
'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from 'next/link'; // Asegúrate de importar Link
import { createReview, getCompaniesList, getEmployeesByCompany, getUserId, Employee, Company } from '@/utils/fetchData';

interface ReviewData {
  employeeId: string;
  companyId: string;
  title: string;
  description: string;
  rating: number;
  positive: boolean;
  documentation: string;
  userId?: string; // Propiedad opcional
}

export default function DashboardEmployedReview() {
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [reviewData, setReviewData] = useState<ReviewData>({
    employeeId: '',
    companyId: '',
    title: '',
    description: '',
    rating: 0,
    positive: true,
    documentation: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompaniesList();
        console.log('Fetched companies:', companiesData.companies);
        setCompanies(companiesData.companies);
      } catch (err) {
        console.error('Failed to fetch companies:', err);
        setError('Failed to fetch companies');
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const fetchEmployees = async () => {
        try {
          const employeesData = await getEmployeesByCompany(selectedCompany);
          console.log('Fetched employees:', employeesData);
          setEmployees(employeesData);
        } catch (err) {
          console.error('Failed to fetch employees:', err);
          setError('Failed to fetch employees');
        }
      };

      fetchEmployees();
    }
  }, [selectedCompany]);

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: name === 'rating' ? parseInt(value) : value, // Convertir rating a número
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    console.log('Submitting review:', reviewData);

    try {
      const userIdResponse = await getUserId();
      console.log('Fetched user ID:', userIdResponse.id);

      const updatedReviewData = { ...reviewData, userId: userIdResponse.id }; // Actualiza reviewData con userId

      const result = await createReview(updatedReviewData);
      if (result.success) {
        console.log('Review created successfully');
        setSuccess('Reseña creada exitosamente');
        router.push('/tablero/empleados/'); // Redireccionar a la lista de reseñas
      } else {
        console.error('Error creating review:', result.error);
        setError(result.error ?? 'Error desconocido');
      }
    } catch (err) {
      console.error('Connection error:', err);
      setError('Error de conexión');
    }
  };

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dejar una Reseña</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2 py-4">
          <div>
            <div className="grid grid-cols-1 gap-4 items-center mb-4">
              <Label htmlFor="companyId">Seleccionar Empresa</Label>
              <Select value={selectedCompany ?? ''} onValueChange={(value) => { setSelectedCompany(value); setReviewData({ ...reviewData, companyId: value }); console.log('Selected company:', value); }} required>
                <SelectTrigger>
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
            {selectedCompany && (
              <div className="grid grid-cols-1 gap-4 items-center mb-4">
                <Label htmlFor="employeeId">Seleccionar Empleado</Label>
                <Select value={selectedEmployee ?? ''} onValueChange={(value) => { setSelectedEmployee(value); setReviewData({ ...reviewData, employeeId: value }); console.log('Selected employee:', value); }} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar empleado" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {selectedEmployee && (
              <>
                <div className="grid grid-cols-1 gap-4 items-center mb-4">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" name="title" value={reviewData.title} onChange={handleReviewChange} required />
                </div>
                <div className="grid grid-cols-1 gap-4 items-center mb-4">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" name="description" value={reviewData.description} onChange={handleReviewChange} required />
                </div>
                <div className="grid grid-cols-1 gap-4 items-center mb-4">
                  <Label htmlFor="rating">Calificación</Label>
                  <Input type="number" id="rating" name="rating" value={reviewData.rating.toString()} onChange={handleReviewChange} required min="0" max="5" />
                </div>
                <div className="grid grid-cols-1 gap-4 items-center mb-4">
                  <Label htmlFor="positive">Positiva</Label>
                  <Select value={reviewData.positive.toString()} onValueChange={(value) => { setReviewData({ ...reviewData, positive: value === 'true' }); console.log('Selected positive:', value); }} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de reseña" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Positiva</SelectItem>
                      <SelectItem value="false">Negativa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 gap-4 items-center mb-4">
                  <Label htmlFor="documentation">Documentación</Label>
                  <Input id="documentation" name="documentation" value={reviewData.documentation} onChange={handleReviewChange} />
                </div>
              </>
            )}
          </div>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="flex justify-end mt-4">  
        <Button type="submit">Dejar Reseña</Button>
        <Link href="/tablero/empleados" className="ml-2">
          <Button type="button">Cancelar</Button>
        </Link>
      </div>
      </form>
    </div>
  );
}

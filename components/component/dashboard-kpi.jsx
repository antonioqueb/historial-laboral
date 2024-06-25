'use client';

import { useState, useEffect } from 'react';
import { getEmployeesList, getCompaniesList } from '@/utils/fetchData';
import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "@/components/ui/card";

// Iconos
function GaugeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ThumbsDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// Icono Componente
const IconComponent = ({ IconComponent, className }) => <IconComponent className={className} />;

const StarIcons = ({ count }) => (
  <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
    {[...Array(count)].map((_, i) => <StarIcon key={i} className="h-4 w-4 fill-primary" />)}
    {[...Array(5 - count)].map((_, i) => <StarIcon key={i} className="h-4 w-4 fill-muted stroke-muted-foreground" />)}
  </div>
);

export default function Component() {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const employeesData = await getEmployeesList();
        const companiesData = await getCompaniesList();
        setEmployees(employeesData.employees);
        setCompanies(companiesData.companies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Calcula los valores principales de las tarjetas basado en los datos obtenidos
  const totalEmployees = employees.length;
  const averageRating = employees.reduce((acc, employee) => acc + (employee.reviewsReceived?.reduce((acc, review) => acc + review.rating, 0) || 0), 0) / (employees.reduce((acc, employee) => acc + (employee.reviewsReceived?.length || 0), 0) || 1);
  const negativeReports = employees.filter(employee => employee.reviewsReceived?.some(review => !review.positive)).length;

  const cardData = [
    {
      title: "Total de Empleados",
      description: "Número actual de empleados",
      mainValue: totalEmployees.toString(),
      subValue: "En todos los departamentos",
      icon: UsersIcon,
    },
    {
      title: "Calificación Promedio",
      description: "Basado en revisiones de todos los empleados de todas tus empresas",
      mainValue: averageRating.toFixed(1),
      stars: Math.round(averageRating),
      icon: GaugeIcon,
    },
    {
      title: "Informes Negativos",
      description: "Empleados con revisiones negativas",
      mainValue: negativeReports.toString(),
      subValue: "Necesita mejorar",
      icon: ThumbsDownIcon,
    }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5">
      {cardData.map(({ title, description, mainValue, subValue, icon, stars }, index) => (
        <Card key={index} className="min-h-[500px] lg:min-h-[850px]">
          <div className="flex flex-col justify-between h-full">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between mt-auto">
              <div className="grid gap-1">
                <div className="text-4xl font-bold">{mainValue}</div>
                {subValue && <div className="text-sm text-zinc-500 dark:text-zinc-400">{subValue}</div>}
                {stars && <StarIcons count={stars} />}
              </div>
              <IconComponent IconComponent={icon} className="h-12 w-12 text-zinc-400 ml-4" />
            </CardFooter>
          </div>
        </Card>
      ))}
    </section>
  );
}

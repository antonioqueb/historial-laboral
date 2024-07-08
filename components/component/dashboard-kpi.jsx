// components\component\dashboard-kpi.jsx
'use client';
import { useState, useEffect } from 'react';
import { getEmployeesList, getCompaniesList, getUserId } from '@/utils/fetchData';
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

export default function Component() {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserId();
        setUserId(user.id);

        const companiesData = await getCompaniesList();
        setCompanies(companiesData.companies);

        const employeesData = await getEmployeesList();
        const filteredEmployees = employeesData.employees.filter(employee => 
          companiesData.companies.some(company => company.userId === user.id && company.id === employee.companyId)
        );
        setEmployees(filteredEmployees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const totalEmployees = employees.length;
  const totalCompanies = companies.filter(company => company.userId === userId).length;

  const cardData = [
    {
      title: "Total de Empleados",
      description: "Número actual de empleados",
      mainValue: totalEmployees.toString(),
      subValue: "En todos los departamentos",
      icon: UsersIcon,
    },
    {
      title: "Total de Empresas Vinculadas",
      description: "Número de empresas vinculadas a tu cuenta",
      mainValue: totalCompanies.toString(),
      icon: GaugeIcon,
    }
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 p-6 mb-14">
      {cardData.map(({ title, description, mainValue, subValue, icon }, index) => (
        <Card key={index} className="min-h-[200px] p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col justify-between h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">{title}</CardTitle>
              <CardDescription className="text-gray-500">{description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between mt-auto">
              <div className="grid gap-1">
                <div className="text-4xl font-bold text-gray-900">{mainValue}</div>
                {subValue && <div className="text-sm text-gray-500">{subValue}</div>}
              </div>
              <IconComponent IconComponent={icon} className="h-12 w-12 text-gray-400 ml-4" />
            </CardFooter>
          </div>
        </Card>
      ))}
    </section>
  );
}

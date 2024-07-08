'use client';
import { useState, useEffect } from 'react';
import { getEmployeesList, getCompaniesList, getUserId } from '@/utils/fetchData';
import { CardTitle, CardDescription, CardHeader, CardFooter, Card, CardContent } from "@/components/ui/card";
import { CartesianGrid, XAxis, Bar, BarChart, Line, LineChart } from "recharts";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart";

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

  // Calcula los valores principales de las tarjetas basado en los datos obtenidos
  const totalEmployees = employees.length;
  const totalCompanies = companies.filter(company => company.userId === userId).length;

  const cardData = [
    {
      title: "Total de Empleados",
      description: "Número actual de empleados",
      mainValue: totalEmployees.toString(),
      subValue: "En todos los departamentos",
      icon: UsersIcon,
      chart: <BarchartChart className="aspect-[4/3]" />
    },
    {
      title: "Total de Empresas Vinculadas",
      description: "Número de empresas vinculadas a tu cuenta",
      mainValue: totalCompanies.toString(),
      icon: GaugeIcon,
      chart: <LinechartChart className="aspect-[4/3]" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cardData.map(({ title, description, mainValue, subValue, icon, chart }, index) => (
        <Card key={index} className="min-h-[500px] lg:min-h-[550px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-4xl font-bold">{mainValue}</h2>
              {subValue && <p className="text-muted-foreground">{subValue}</p>}
            </div>
            {chart}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function BarchartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[300px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

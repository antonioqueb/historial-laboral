import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";

export default function DashboardEmployedHistory() {
  const employees = [
    {
      name: "Juan Pérez",
      role: "Gerente",
      description: "Juan es un gerente experimentado con más de 10 años de experiencia en la industria. Es conocido por su pensamiento estratégico y su capacidad para motivar a su equipo.",
      history: [
        { period: "2018 - 2020", position: "Gerente de Operaciones en Acme Corp." },
        { period: "2015 - 2018", position: "Supervisor de Ventas en Globex Inc." },
        { period: "2010 - 2015", position: "Representante de Ventas en Stark Industries." }
      ]
    },
    {
      name: "María Rodríguez",
      role: "Desarrolladora",
      description: "María es una desarrolladora habilidosa con pasión por crear soluciones innovadoras. Siempre está ansiosa por aprender nuevas tecnologías y colaborar con su equipo.",
      history: [
        { period: "2019 - 2022", position: "Desarrolladora Front-End en TechCorp." },
        { period: "2017 - 2019", position: "Desarrolladora Junior en CodeWizards LLC." },
        { period: "2015 - 2017", position: "Pasante de Desarrollo en SoftwareCo." }
      ]
    },
    {
      name: "Carlos Hernández",
      role: "Diseñador",
      description: "Carlos es un diseñador talentoso con ojo para el detalle y pasión por crear diseños visualmente impresionantes. Siempre está explorando nuevas tendencias y técnicas de diseño.",
      history: [
        { period: "2020 - Presente", position: "Diseñador UX/UI en DesignCorp." },
        { period: "2018 - 2020", position: "Diseñador Gráfico en ArtisticMinds." },
        { period: "2016 - 2018", position: "Pasante de Diseño en CreativeStudio." }
      ]
    },
    {
      name: "Ana López",
      role: "Recursos Humanos",
      description: "Ana es una profesional de recursos humanos con una sólida experiencia en gestión de talento y desarrollo organizacional.",
      history: [
        { period: "2021 - Presente", position: "Gerente de Recursos Humanos en PeopleFirst." },
        { period: "2017 - 2021", position: "Especialista en Talento en HR Solutions." },
        { period: "2014 - 2017", position: "Asistente de Recursos Humanos en TalentCorp." }
      ]
    },
    {
      name: "Luis Gómez",
      role: "Desarrollador",
      description: "Luis es un desarrollador backend con experiencia en la creación de API y servicios escalables. Le apasiona el código limpio y las mejores prácticas de desarrollo.",
      history: [
        { period: "2020 - Presente", position: "Desarrollador Backend en DevHub." },
        { period: "2018 - 2020", position: "Ingeniero de Software en CodeFactory." },
        { period: "2016 - 2018", position: "Desarrollador Junior en StartupX." }
      ]
    },
    {
      name: "Elena García",
      role: "Marketing",
      description: "Elena es una experta en marketing digital con un enfoque en estrategias de contenido y redes sociales. Ha ayudado a varias marcas a aumentar su presencia en línea.",
      history: [
        { period: "2019 - Presente", position: "Gerente de Marketing en AdBoost." },
        { period: "2016 - 2019", position: "Coordinadora de Marketing en SocialMedia Inc." },
        { period: "2014 - 2016", position: "Asistente de Marketing en MarketMakers." }
      ]
    },
    {
      name: "Diego Torres",
      role: "Diseñador",
      description: "Diego es un diseñador gráfico con una fuerte pasión por la ilustración y el diseño de branding. Su trabajo es conocido por su creatividad y atención al detalle.",
      history: [
        { period: "2021 - Presente", position: "Diseñador Gráfico Senior en ArtWorks." },
        { period: "2018 - 2021", position: "Diseñador Gráfico en VisualStudio." },
        { period: "2015 - 2018", position: "Ilustrador en CreativeLab." }
      ]
    },
    {
      name: "Andrea Martínez",
      role: "Recursos Humanos",
      description: "Andrea tiene una vasta experiencia en la gestión de personal y la creación de entornos laborales positivos. Se especializa en la retención de talento y el desarrollo profesional.",
      history: [
        { period: "2020 - Presente", position: "Especialista en Recursos Humanos en TalentSolutions." },
        { period: "2017 - 2020", position: "Coordinadora de Recursos Humanos en HRWorks." },
        { period: "2015 - 2017", position: "Analista de Recursos Humanos en TalentConnect." }
      ]
    },
    {
      name: "Fernando Ortiz",
      role: "Desarrollador",
      description: "Fernando es un desarrollador full-stack con habilidades en varias tecnologías. Es conocido por su habilidad para resolver problemas complejos y su enfoque en la eficiencia del código.",
      history: [
        { period: "2018 - Presente", position: "Desarrollador Full-Stack en WebDevCo." },
        { period: "2016 - 2018", position: "Ingeniero de Software en CodeCraft." },
        { period: "2014 - 2016", position: "Desarrollador Junior en AppMakers." }
      ]
    }
  ];

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Historial Laboral de Empleados</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 w-5 h-5" />
            <Input
              className="pl-10 pr-4 py-2 rounded-md bg-white shadow-sm dark:bg-zinc-800 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
              placeholder="Buscar historial..."
              type="search"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2" variant="outline">
                <FilterIcon className="w-5 h-5" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name-filter">Nombre</Label>
                <Input className="w-full" id="name-filter" placeholder="Filtrar por nombre" type="text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-filter">Rol</Label>
                <Select className="w-full" id="role-filter">
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="developer">Desarrollador</SelectItem>
                    <SelectItem value="designer">Diseñador</SelectItem>
                    <SelectItem value="hr">Recursos Humanos</SelectItem>
                    <SelectItem value="marketing">Mercadotecnia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department-filter">Departamento</Label>
                <Select className="w-full" id="department-filter">
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Ingeniería</SelectItem>
                    <SelectItem value="design">Diseño</SelectItem>
                    <SelectItem value="hr">Recursos Humanos</SelectItem>
                    <SelectItem value="marketing">Mercadotecnia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee, index) => (
          <div key={index} className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <Image
                  alt="Foto del Empleado"
                  className="w-full h-full object-cover"
                  height={80}
                  src="/placeholder.svg"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                  width={80}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{employee.name}</h3>
                <p className="text-zinc-500 dark:text-zinc-400">{employee.role}</p>
                <p className="text-sm line-clamp-2">{employee.description}</p>
              </div>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-700 p-4">
              <h4 className="text-base font-semibold mb-2">Historial Laboral</h4>
              <ul className="space-y-2">
                {employee.history.map((job, jobIndex) => (
                  <li key={jobIndex} className="text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold">{job.period}:</span> {job.position}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4">
              <Link className="text-sm text-primary underline" href="#">
                Ver Más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

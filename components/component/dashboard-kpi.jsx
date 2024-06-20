import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Component() {
  return (
    <section className="grid gap-4 lg:grid-cols-3 xl:grid-cols-3 p-5">
      <Card>
        <CardHeader>
          <CardTitle>Total de Empleados</CardTitle>
          <CardDescription>Número actual de empleados</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">1,234</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">En todos los departamentos</div>
          </div>
          <UsersIcon className="h-12 w-12 text-zinc-400" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Calificación Promedio</CardTitle>
          <CardDescription>Basado en revisiones de compañeros</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">4.8</div>
            <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
              <StarIcon className="h-4 w-4 fill-primary" />
              <StarIcon className="h-4 w-4 fill-primary" />
              <StarIcon className="h-4 w-4 fill-primary" />
              <StarIcon className="h-4 w-4 fill-primary" />
              <StarIcon className="h-4 w-4 fill-muted stroke-muted-foreground" />
            </div>
          </div>
          <GaugeIcon className="h-12 w-12 text-zinc-400" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Búsquedas de Empleados</CardTitle>
          <CardDescription>Número de búsquedas de empleados</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">12,345</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Este mes</div>
          </div>
          <SearchIcon className="h-12 w-12 text-zinc-400" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Alto Rendimiento</CardTitle>
          <CardDescription>Porcentaje de empleados mejor calificados</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">27%</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Calificación 4.5 o superior</div>
          </div>
          <TrendingUpIcon className="h-12 w-12 text-primary" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Promociones Internas</CardTitle>
          <CardDescription>Número de empleados que han sido promovidos internamente</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">34%</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Este año</div>
          </div>
          <TrendingUpIcon className="h-12 w-12 text-primary" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bajo Rendimiento</CardTitle>
          <CardDescription>Porcentaje de empleados con baja calificación</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">9%</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Calificación por debajo de 3.0</div>
          </div>
          <TrendingDownIcon className="h-12 w-12 text-red-500" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Revisiones Negativas</CardTitle>
          <CardDescription>Empleados con revisiones negativas</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">124</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Necesita mejorar</div>
          </div>
          <ThumbsDownIcon className="h-12 w-12 text-zinc-400" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Empleados Nuevos</CardTitle>
          <CardDescription>Número de nuevos empleados contratados</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">78</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Este trimestre</div>
          </div>
          <UserPlusIcon className="h-12 w-12 text-zinc-400" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Empleados Retirados</CardTitle>
          <CardDescription>Número de empleados retirados</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">32</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Este año</div>
          </div>
          <UserMinusIcon className="h-12 w-12 text-zinc-400" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Capacitación Completada</CardTitle>
          <CardDescription>Número de empleados que han completado programas de capacitación</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">567</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Este año</div>
          </div>
          <BookOpenIcon className="h-12 w-12 text-zinc-400" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Satisfacción Laboral</CardTitle>
          <CardDescription>Porcentaje de empleados satisfechos con su trabajo</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">85%</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Basado en encuestas internas</div>
          </div>
          <SmileIcon className="h-12 w-12 text-zinc-400" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Proyectos Completados</CardTitle>
          <CardDescription>Número de proyectos finalizados por empleados</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-4xl font-bold">456</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Este trimestre</div>
          </div>
          <CheckIcon className="h-12 w-12 text-zinc-400" />
        </CardContent>
      </Card>
    </section>
  )
}

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
  )
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
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
  )
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
  )
}

function TrendingDownIcon(props) {
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
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  )
}

function TrendingUpIcon(props) {
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
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function UserMinusIcon(props) {
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
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  )
}

function UserPlusIcon(props) {
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
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  )
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
  )
}

function BookOpenIcon(props) {
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
      <path d="M2 3h5a2 2 0 0 1 2 2v16a2 2 0 0 0-2-2H2z" />
      <path d="M22 3h-5a2 2 0 0 0-2 2v16a2 2 0 0 1 2-2h5z" />
    </svg>
  )
}

function SmileIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}

function CheckIcon(props) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

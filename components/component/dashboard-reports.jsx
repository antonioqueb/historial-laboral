import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { SheetTrigger, SheetTitle, SheetDescription, SheetHeader, SheetContent, Sheet } from "@/components/ui/sheet"

export default function DashboardReports() {
  return (
    <>
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Generación de Reportes</h2>
          <div className="flex items-center gap-4">
            <Input className="max-w-xs" placeholder="Buscar empleado..." type="search" />
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Nuevo Reporte
            </Button>
          </div>
        </header>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Generar Reporte de Empleado</CardTitle>
              <CardDescription>Crea un reporte detallado sobre el historial y desempeño del empleado.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label className="mb-2" htmlFor="report-type">
                    Tipo de Reporte
                  </Label>
                  <Select id="report-type">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Desempeño</SelectItem>
                      <SelectItem value="attendance">Asistencia</SelectItem>
                      <SelectItem value="training">Capacitación</SelectItem>
                      <SelectItem value="feedback">Retroalimentación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2" htmlFor="report-period">
                    Período de Reporte
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="pl-3 text-left font-normal text-zinc-500 dark:text-zinc-400"
                        variant="outline">
                        Seleccionar fechas
                        <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar mode="range" />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label className="mb-2" htmlFor="report-recipients">
                    Destinatarios del Reporte
                  </Label>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <Checkbox id="report-recipient-ceo" />
                      CEO
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox id="report-recipient-managers" />
                      Gerentes
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox id="report-recipient-employees" />
                      Empleados
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox id="report-recipient-hr" />
                      Recursos Humanos
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generar Reporte</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Historial de Reportes</CardTitle>
              <CardDescription>Revisa los reportes recientes generados para los empleados.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <FileIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="font-medium">Reporte de Desempeño</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Desempeño del mes de mayo.</p>
                    <p className="text-xs text-zinc-400">Hace 1 semana</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FileIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="font-medium">Reporte de Asistencia</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Asistencia del segundo trimestre.
                    </p>
                    <p className="text-xs text-zinc-400">Hace 2 semanas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FileIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="font-medium">Reporte de Capacitación</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Capacitación actualizada.</p>
                    <p className="text-xs text-zinc-400">Hace 1 mes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-4 right-4 lg:hidden" variant="link">
          <FileIcon className="w-4 h-4 mr-2" />
          Reportes
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-md" side="right">
        <SheetHeader>
          <SheetTitle>Reportes</SheetTitle>
          <SheetDescription>Revisa los reportes recientes.</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <FileIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
              <div>
                <p className="font-medium">Reporte de Desempeño</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Desempeño del mes de mayo.</p>
                <p className="text-xs text-zinc-400">Hace 1 semana</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
              <div>
                <p className="font-medium">Reporte de Asistencia</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Asistencia del segundo trimestre.</p>
                <p className="text-xs text-zinc-400">Hace 2 semanas</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
              <div>
                <p className="font-medium">Reporte de Capacitación</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Capacitación actualizada.</p>
                <p className="text-xs text-zinc-400">Hace 1 mes</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
    </>
  );
}

function PlusIcon(props) {
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
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function FileIcon(props) {
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
      strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function CalendarDaysIcon(props) {
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
      strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}


import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { SheetTrigger, SheetTitle, SheetDescription, SheetHeader, SheetContent, Sheet } from "@/components/ui/sheet"

export default function DashboardNotifications() {
  return (<>
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Notificaciones</h2>
          <div className="flex items-center gap-4">
            <Input className="max-w-xs" placeholder="Buscar..." type="search" />
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Nuevo
            </Button>
          </div>
        </header>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Administra las notificaciones de tu empresa.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label className="mb-2" htmlFor="notification-channel">
                    Canal de Notificaciones
                  </Label>
                  <Select id="notification-channel">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Correo Electrónico</SelectItem>
                      <SelectItem value="push">Push Notifications</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2" htmlFor="notification-frequency">
                    Frecuencia de Notificaciones
                  </Label>
                  <Select id="notification-frequency">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instantly">Inmediatamente</SelectItem>
                      <SelectItem value="hourly">Cada Hora</SelectItem>
                      <SelectItem value="daily">Diariamente</SelectItem>
                      <SelectItem value="weekly">Semanalmente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2" htmlFor="notification-types">
                    Tipos de Notificaciones
                  </Label>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <Checkbox id="notification-type-mentions" />
                      Menciones
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox id="notification-type-comments" />
                      Comentarios
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox id="notification-type-updates" />
                      Actualizaciones de Producto
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox id="notification-type-news" />
                      Noticias y Eventos
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Historial de Notificaciones</CardTitle>
              <CardDescription>Revisa las notificaciones recientes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <BellIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="font-medium">Nueva mención</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      @usuario_ejemplo te mencionó en un comentario.
                    </p>
                    <p className="text-xs text-zinc-400">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BellIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="font-medium">Actualización de producto</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Se ha lanzado una nueva versión de nuestro producto.
                    </p>
                    <p className="text-xs text-zinc-400">Hace 1 día</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BellIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="font-medium">Nuevo comentario</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      @usuario_ejemplo ha dejado un nuevo comentario en tu publicación.
                    </p>
                    <p className="text-xs text-zinc-400">Hace 3 días</p>
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
          <BellIcon className="w-4 h-4 mr-2" />
          Notificaciones
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-md" side="right">
        <SheetHeader>
          <SheetTitle>Notificaciones</SheetTitle>
          <SheetDescription>Revisa las notificaciones recientes.</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <BellIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
              <div>
                <p className="font-medium">Nueva mención</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  @usuario_ejemplo te mencionó en un comentario.
                </p>
                <p className="text-xs text-zinc-400">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BellIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
              <div>
                <p className="font-medium">Actualización de producto</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Se ha lanzado una nueva versión de nuestro producto.
                </p>
                <p className="text-xs text-zinc-400">Hace 1 día</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BellIcon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
              <div>
                <p className="font-medium">Nuevo comentario</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  @usuario_ejemplo ha dejado un nuevo comentario en tu publicación.
                </p>
                <p className="text-xs text-zinc-400">Hace 3 días</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </>);
}

function BellIcon(props) {
  return (
    (<svg
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>)
  );
}


function BuildingIcon(props) {
  return (
    (<svg
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>)
  );
}


function CogIcon(props) {
  return (
    (<svg
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
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>)
  );
}


function LayoutDashboardIcon(props) {
  return (
    (<svg
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
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>)
  );
}


function PlusIcon(props) {
  return (
    (<svg
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
    </svg>)
  );
}


function UsersIcon(props) {
  return (
    (<svg
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>)
  );
}

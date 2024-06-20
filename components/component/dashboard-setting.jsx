import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { SheetTrigger, SheetTitle, SheetDescription, SheetHeader, SheetContent, Sheet } from "@/components/ui/sheet"
import Image from "next/image"

export default function DashboardSetting() {
  return (
    <>
      <div className="flex min-h-screen">
 
        <div className="flex-1 p-6">
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Configuración</h2>
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
                <CardTitle>Configuración de Perfil Público</CardTitle>
                <CardDescription>Administra la información pública de tu empresa.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <Label className="mb-2" htmlFor="company-name">
                      Nombre de la Empresa
                    </Label>
                    <Input defaultValue="Acme Inc." id="company-name" />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="company-logo">
                      Logo de la Empresa
                    </Label>
                    <div className="flex items-center gap-4">
                      <Image
                        alt="Logo"
                        className="rounded-full"
                        height={48}
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "48/48",
                          objectFit: "cover",
                        }}
                        width={48}
                      />
                      <Button variant="outline">Cambiar Logo</Button>
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="company-description">
                      Descripción de la Empresa
                    </Label>
                    <Textarea id="company-description" placeholder="Ingresa una descripción de tu empresa" />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="company-website">
                      Sitio Web de la Empresa
                    </Label>
                    <Input id="company-website" placeholder="Ingresa la URL del sitio web" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Menciones</CardTitle>
                <CardDescription>Administra las menciones y comentarios en tu perfil.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <Label className="mb-2" htmlFor="mention-moderation">
                      Moderación de Menciones
                    </Label>
                    <Select id="mention-moderation">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto-approve">Aprobar automáticamente</SelectItem>
                        <SelectItem value="manual-review">Revisión manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="comment-moderation">
                      Moderación de Comentarios
                    </Label>
                    <Select id="comment-moderation">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto-approve">Aprobar automáticamente</SelectItem>
                        <SelectItem value="manual-review">Revisión manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="mention-notification">
                      Notificaciones de Menciones
                    </Label>
                    <Select id="mention-notification">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instantly">Inmediatamente</SelectItem>
                        <SelectItem value="daily">Diariamente</SelectItem>
                        <SelectItem value="weekly">Semanalmente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Seguridad</CardTitle>
                <CardDescription>Ajusta la configuración de seguridad de tu empresa.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <Label className="mb-2" htmlFor="password-policy">
                      Política de Contraseñas
                    </Label>
                    <Input id="password-policy" placeholder="Ingresa la política de contraseñas" />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="two-factor-auth">
                      Autenticación de Dos Factores
                    </Label>
                    <Switch id="two-factor-auth" />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="session-timeout">
                      Tiempo de Espera de Sesión
                    </Label>
                    <Input id="session-timeout" placeholder="Ingresa el tiempo en minutos" type="number" />
                  </div>
                  <div>
                    <Label className="mb-2" htmlFor="ip-whitelist">
                      Lista Blanca de IP
                    </Label>
                    <Input id="ip-whitelist" placeholder="Ingresa las direcciones IP permitidas" />
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
            <CogIcon className="w-4 h-4 mr-2" />
            Configuración
          </Button>
        </SheetTrigger>
        <SheetContent className="max-w-md" side="right">
          <SheetHeader>
            <SheetTitle>Configuración de la Empresa</SheetTitle>
            <SheetDescription>Actualiza la información de tu empresa.</SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <div className="grid gap-4">
              <div>
                <Label className="mb-2" htmlFor="company-name">
                  Nombre de la Empresa
                </Label>
                <Input defaultValue="Acme Inc." id="company-name" />
              </div>
              <div>
                <Label className="mb-2" htmlFor="company-logo">
                  Logo de la Empresa
                </Label>
                <div className="flex items-center gap-4">
                  <Image
                    alt="Logo"
                    className="rounded-full"
                    height={48}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "48/48",
                      objectFit: "cover",
                    }}
                    width={48}
                  />
                  <Button variant="outline">Cambiar Logo</Button>
                </div>
              </div>
              <div>
                <Label className="mb-2" htmlFor="company-address">
                  Dirección de la Empresa
                </Label>
                <Input id="company-address" placeholder="Ingresa la dirección" />
              </div>
              <div>
                <Label className="mb-2" htmlFor="company-phone">
                  Teléfono de la Empresa
                </Label>
                <Input id="company-phone" placeholder="Ingresa el número de teléfono" />
              </div>
              <div>
                <Label className="mb-2" htmlFor="company-email">
                  Correo Electrónico de la Empresa
                </Label>
                <Input id="company-email" placeholder="Ingresa el correo electrónico" />
              </div>
            </div>
            <Button className="w-full mt-4">Guardar Cambios</Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

function BuildingIcon(props) {
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
    </svg>
  )
}


function CogIcon(props) {
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
    </svg>
  )
}


function LayoutDashboardIcon(props) {
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
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
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
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
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
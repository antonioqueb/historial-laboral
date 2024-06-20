import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { SheetTrigger, SheetTitle, SheetDescription, SheetHeader, SheetContent, Sheet } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function DashboardEmployed() {
  return (<>
    <div className="flex min-h-screen">

      <div className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Empleados</h2>
          <div className="flex items-center gap-4">
            <Input className="max-w-xs" placeholder="Buscar empleados..." type="search" />
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Nuevo Empleado
            </Button>
          </div>
        </header>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Juan Delgado</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Desarrollador Web</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 fill-yellow-500" />
                  <span className="text-sm font-semibold">4.8</span>
                </div>
                <div className="flex items-center gap-2">
                  <ReplyIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">12</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Ver Perfil
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Laura Mart&iacute;nez</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Dise&ntilde;adora Gr&aacute;fica</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 fill-yellow-500" />
                  <span className="text-sm font-semibold">4.7</span>
                </div>
                <div className="flex items-center gap-2">
                  <ReplyIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">8</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Ver Perfil
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Pedro Ram&iacute;rez</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Analista de Datos</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 fill-yellow-500" />
                  <span className="text-sm font-semibold">4.9</span>
                </div>
                <div className="flex items-center gap-2">
                  <ReplyIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">6</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Ver Perfil
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>SG</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Sara Garc&iacute;a</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Gerente de Proyectos</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 fill-yellow-500" />
                  <span className="text-sm font-semibold">4.6</span>
                </div>
                <div className="flex items-center gap-2">
                  <ReplyIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">10</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Ver Perfil
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-8 flex justify-end">
          <Button>Ver Todos los Empleados</Button>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">&Uacute;ltimas Rese&ntilde;as</h3>
          <div className="grid gap-4">
            <div
              className="flex items-start gap-4 p-4 rounded-md bg-zinc-100 dark:bg-zinc-800">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-semibold">Mar&iacute;a Rodr&iacute;guez</h4>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-zinc-300" />
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  &quot;Juan es un excelente desarrollador. Siempre est&aacute; dispuesto a ayudar y su c&oacute;digo es limpio y bien
                  documentado.&quot;
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline">
                    Aprobar
                  </Button>
                  <Button className="text-red-500" size="sm" variant="outline">
                    Rechazar
                  </Button>
                </div>
              </div>
            </div>
            <div
              className="flex items-start gap-4 p-4 rounded-md bg-zinc-100 dark:bg-zinc-800">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JC</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-semibold">Jos&eacute; Castillo</h4>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-zinc-300" />
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  &quot;Laura es una dise&ntilde;adora incre&iacute;ble. Sus dise&ntilde;os son modernos y atractivos, y siempre logra capturar
                  la esencia de nuestros proyectos.&quot;
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline">
                    Aprobar
                  </Button>
                  <Button className="text-red-500" size="sm" variant="outline">
                    Rechazar
                  </Button>
                </div>
              </div>
            </div>
            <div
              className="flex items-start gap-4 p-4 rounded-md bg-zinc-100 dark:bg-zinc-800">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-semibold">Ana Garc&iacute;a</h4>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-yellow-500" />
                    <StarIcon className="w-4 h-4 fill-zinc-300" />
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  &quot;Pedro es un experto en an&aacute;lisis de datos. Sus informes son claros y detallados, y siempre est&aacute;
                  dispuesto a explicar sus hallazgos.&quot;
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline">
                    Aprobar
                  </Button>
                  <Button className="text-red-500" size="sm" variant="outline">
                    Rechazar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button>Ver M&aacute;s Rese&ntilde;as</Button>
          </div>
        </div>
      </div>
    </div>
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-4 right-4" variant="link">
          <CogIcon className="w-4 h-4 mr-2" />
          Configuraci&oacute;n
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-md" side="right">
        <SheetHeader>
          <SheetTitle>Configuraci&oacute;n de la Empresa</SheetTitle>
          <SheetDescription>Actualiza la informaci&oacute;n de tu empresa.</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <div className="mb-4">
            <Label className="mb-2" htmlFor="company-name">
              Nombre de la Empresa
            </Label>
            <Input defaultValue="Acme Inc." id="company-name" />
          </div>
          <div className="mb-4">
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
                width={48} />
              <Button variant="outline">Cambiar Logo</Button>
            </div>
          </div>
          <Button className="w-full">Guardar Cambios</Button>
        </div>
      </SheetContent>
    </Sheet>
  </>);
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


function ReplyIcon(props) {
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
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>)
  );
}


function StarIcon(props) {
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
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

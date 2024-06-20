/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GevNAUM7xdd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function DashboardCompanySetting() {
  return (
    <Card className="bg-white  rounded-lg p-6 w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Agregar detalles de la empresa</CardTitle>
        <CardDescription>Proporcione información sobre su empresa</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Nombre de la empresa</Label>
            <Input id="companyName" placeholder="Ingrese el nombre de la empresa" />
          </div>
          <div>
            <Label htmlFor="employees">Número de empleados</Label>
            <Input id="employees" placeholder="Número de empleados" type="number" />
          </div>
        </div>
        <div>
          <Label htmlFor="companyLogo">Logotipo de la empresa</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 rounded-full">
              <AvatarImage alt="Logotipo de la empresa" src="/placeholder.svg?height=64&width=64" />
              <AvatarFallback>
                <GroupIcon className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <Button variant="outline">Subir logotipo</Button>
          </div>
        </div>
        <div>
          <Label htmlFor="website">Sitio web</Label>
          <Input id="website" placeholder="https://ejemplo.com" />
        </div>
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" placeholder="correo@ejemplo.com" type="email" />
        </div>
        <div>
          <Label htmlFor="phone">Número de teléfono</Label>
          <Input id="phone" placeholder="(123) 456-7890" />
        </div>
        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" placeholder="Calle Principal 123, Ciudad, Estado" />
        </div>
        <div>
          <Label htmlFor="socialLinks">Enlaces de redes sociales</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input className="col-span-1" id="facebook" placeholder="Facebook" />
            <Input className="col-span-1" id="twitter" placeholder="Twitter" />
            <Input className="col-span-1" id="linkedin" placeholder="LinkedIn" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Guardar</Button>
      </CardFooter>
    </Card>
  )
}

function GroupIcon(props) {
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
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  )
}

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"

export default function DashboardGeneralSetting() {
  return (
    (<main
      className="flex flex-col items-center justify-center w-full h-full p-6 md:p-10 lg:p-16">
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Ajustes Generales</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Actualiza tu información personal.</p>
        </div>
        <Card>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Ingresa tu nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title">Cargo</Label>
                <Input id="job-title" placeholder="Ingresa tu cargo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Input id="department" placeholder="Ingresa tu departamento" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" placeholder="Ingresa tu correo" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de teléfono</Label>
                <Input id="phone" placeholder="Ingresa tu número de teléfono" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Ingresa tu dirección" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Ingresa tu ciudad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input id="country" placeholder="Ingresa tu país" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Cambiar contraseña</Label>
              <Button className="w-full" variant="outline">
                Enviar enlace para cambiar contraseña
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>)
  );
}

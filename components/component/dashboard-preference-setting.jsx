
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function DashboardPreferenceSetting() {
  return (
    (<div
      className="flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <Card className="w-full p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Moderar Menciones</CardTitle>
          <CardDescription>Personaliza quién puede mencionar tu empresa y otras opciones.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div>
            <Label className="mb-2 font-semibold" htmlFor="mentions">
              ¿Quién puede mencionar tu empresa?
            </Label>
            <Select id="mentions">
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employees">Solo empleados</SelectItem>
                <SelectItem value="anyone">Cualquier persona</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label className="font-semibold" htmlFor="comments">
              ¿Habilitar comentarios?
            </Label>
            <Switch id="comments" />
          </div>
          <div>
            <Label className="mb-2 font-semibold" htmlFor="visibility">
              Visibilidad del perfil
            </Label>
            <RadioGroup defaultValue="public" id="visibility">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <RadioGroupItem id="public" value="public" />
                  <Label className="ml-2" htmlFor="public">
                    Público
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="private" value="private" />
                  <Label className="ml-2" htmlFor="private">
                    Privado
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label className="mb-2 font-semibold" htmlFor="notifications">
              Notificaciones
            </Label>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Checkbox id="email" />
                <Label className="ml-2" htmlFor="email">
                  Correo electrónico
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="push" />
                <Label className="ml-2" htmlFor="push">
                  Push
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="sms" />
                <Label className="ml-2" htmlFor="sms">
                  SMS
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Guardar cambios</Button>
        </CardFooter>
      </Card>
    </div>)
  );
}

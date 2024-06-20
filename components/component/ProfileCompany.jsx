// components\component\ProfileCompany.jsx
import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

export default function ProfileCompany() {
  return (
    <>
      <div className="bg-zinc-100 dark:bg-zinc-800 py-12 md:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-900 dark:bg-zinc-50 rounded-full flex items-center justify-center">
                <MountainIcon className="w-10 h-10 text-white dark:text-zinc-900" />
              </div>
            </div>
            <div className="flex-1 space-y-2 md:space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold">Acme Studios</h1>
              <p className="text-zinc-500 dark:text-zinc-400">
                Acme Studios es una agencia creativa líder especializada en diseño web, branding y marketing digital.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-900 py-12 md:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-4">
                <LocateIcon className="flex-shrink-0 w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                <div>
                  <h3 className="text-lg font-medium">Dirección</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">123 Calle Principal, Cualquier Ciudad, USA 12345</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <GlobeIcon className="flex-shrink-0 w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                <div>
                  <h3 className="text-lg font-medium">Sitio Web</h3>
                  <Link className="text-zinc-500 dark:text-zinc-400 hover:underline" href="#">
                    www.acmestudios.com
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PhoneIcon className="flex-shrink-0 w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                <div>
                  <h3 className="text-lg font-medium">Teléfono</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">(555) 555-5555</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MailboxIcon className="flex-shrink-0 w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                <div>
                  <h3 className="text-lg font-medium">Correo Electrónico</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">info@acmestudios.com</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">Reseñas de Empleados</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Link href="/empleado">
                        <h3 className="text-lg font-medium cursor-pointer">John Doe</h3>
                      </Link>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Tuve una excelente experiencia trabajando en Acme Studios. El equipo es talentoso y el ambiente de trabajo es muy colaborativo. ¡Muy recomendable!
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Link href="/empleado">
                        <h3 className="text-lg font-medium">Jane Ahn</h3>
                      </Link>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Acme Studios es un lugar increíble para trabajar. El equipo de liderazgo es muy apoyo y la cultura de la empresa es muy positiva. Recomiendo mucho esta empresa.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Link href="/empleado">
                        <h3 className="text-lg font-medium">Sarah Miller</h3>
                      </Link>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Tuve una experiencia mixta en Acme Studios. El trabajo era desafiante y gratificante, pero la gestión podía ser inconsistente a veces. En general, fue una buena experiencia de aprendizaje.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function GlobeIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function MailboxIcon(props) {
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
      <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
      <polyline points="15,9 18,9 18,11" />
      <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
      <line x1="6" x2="7" y1="10" y2="10" />
    </svg>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
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
      strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

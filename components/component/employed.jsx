import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from "next/link";

export function Employed() {
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
              <h1 className="text-2xl md:text-3xl font-bold">Jane Ahn Aguilar</h1>
              <p className="text-zinc-500 dark:text-zinc-400">
                Explora los antecedentes laborales y las reseñas profesionales de Jane Ahn.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-900 py-12 md:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6">
              <Link href="/empresa">
              <div className="flex items-start gap-4">
                <BriefcaseIcon className="flex-shrink-0 w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                <div>
                  <h3 className="text-lg font-medium">Acme Studios</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">Desarrolladora Front-end</p>
                  <p className="text-zinc-500 dark:text-zinc-400">3 años en Acme Studios</p>
                </div>
              </div>
              </Link>
              <div className="flex items-start gap-4">
                <BriefcaseIcon className="flex-shrink-0 w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                <div>
                  <h3 className="text-lg font-medium">Tech Solutions</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">Ingeniera de Software</p>
                  <p className="text-zinc-500 dark:text-zinc-400">2 años en Tech Solutions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BriefcaseIcon className="flex-shrink-0 w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                <div>
                  <h3 className="text-lg font-medium">Creative Agency</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">Desarrolladora Junior</p>
                  <p className="text-zinc-500 dark:text-zinc-400">1 año en Creative Agency</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">Reseñas de Empleadores</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="Acme Studios" src="/placeholder-user.jpg" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Acme Studios</h3>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Jane es una desarrolladora excepcional. Su habilidad para resolver problemas complejos y su atención al detalle fueron fundamentales para nuestros proyectos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="Tech Solutions" src="/placeholder-user.jpg" />
                    <AvatarFallback>TS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Tech Solutions</h3>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Jane mostró un excelente desempeño y liderazgo en nuestro equipo de desarrollo. Su contribución fue clave para el éxito de nuestros proyectos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="Creative Agency" src="/placeholder-user.jpg" />
                    <AvatarFallback>CA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Creative Agency</h3>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Jane fue una desarrolladora junior muy prometedora, siempre dispuesta a aprender y contribuir con nuevas ideas.
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

function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
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

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ResponseSearch from "@/components/ResponseSearch";

export default function Component() {
  return (
    <>

      <main className="flex flex-col items-center lg:py-12 justify-center h-screen bg-zinc-100 dark:bg-zinc-900 w-full">
        <div className="container max-w-7xl px-4 md:px-6">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl 2xl:text-8xl pt-24">Buscar Historial Laboral</h1>
              <p className="mt-3 text-xl text-zinc-500 dark:text-zinc-400  2xl:text-2xl">
                Encuentra el antecedente laboral de tus candidatos a través de su NSS.
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <form className="flex items-center space-x-3">
                <div className="flex-1">
                  <Input
                    className="w-full rounded-md border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500 text-lg"
                    placeholder="Ingresar NSS"
                    type="text"
                  />
                </div>
                <Button className="shrink-0 text-lg" type="submit">
                  Buscar
                </Button>
              </form>
              
            </div>
            <ResponseSearch />
          </div>
        </div>

      </main>
      

    </>
  )
}


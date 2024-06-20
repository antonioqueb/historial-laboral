import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";

const data = [
  {
    iconText: "JP",
    nombre: "Jared Palmer",
    nss: "PALJ890201ABC"
  },
  {
    iconText: "CN",
    nombre: "Catalina Navarro",
    nss: "NAVC890201DEF"
  },
  {
    iconText: "CL",
    nombre: "Maximiliano Leiter",
    nss: "LEIM900315GHI"
  },
  {
    iconText: "SD",
    nombre: "Shu Ding",
    nss: "DINS880501JKL"
  },
];

export default function Component() {
  return (
    <div className="flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <section className="p-6 max-w-7xl w-full py-8 bg-white dark:bg-zinc-800 shadow-lg rounded-lg">
        <div className="grid gap-6">
          {data.map(({ iconText, nombre, nss }) => (
            <Link href="/empleado" key={nss}>
              <div className="p-2 flex cursor-pointer items-center gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage alt="@jaredpalmer" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{iconText}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="font-medium">{nombre}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{nss}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

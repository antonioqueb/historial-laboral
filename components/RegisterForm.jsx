'use client';

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  const [isCompany, setIsCompany] = useState(true);

  const handleToggle = (value) => {
    setIsCompany(value === "company");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4 py-16 dark:bg-zinc-900">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800">
        <div className="flex items-center justify-center">
          <BriefcaseIcon className="h-10 w-10 text-zinc-500 dark:text-zinc-400" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-white">Registro</h2>
        <form className="mt-8 space-y-6">
          <div className="flex items-center justify-center gap-4">
            <Toggle
              aria-label="Tipo de usuario"
              className={`cursor-pointer py-2 px-4 rounded-lg ${
                isCompany ? "bg-primary text-white" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
              }`}
              onClick={() => handleToggle("company")}
            >
              Soy Empresa
            </Toggle>
            <Toggle
              aria-label="Tipo de usuario"
              className={`cursor-pointer py-2 px-4 rounded-lg ${
                !isCompany ? "bg-primary text-white" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
              }`}
              onClick={() => handleToggle("employee")}
            >
              Soy Empleado
            </Toggle>
          </div>
          <div>
            <Label className="text-zinc-700 dark:text-zinc-200" htmlFor="name">
              Nombre
            </Label>
            <Input
              className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-primary focus:ring-primary dark:border-zinc-600 dark:bg-zinc-700 dark:text-white sm:text-sm"
              id="name"
              name="name"
              placeholder=""
              required
              type="text"
            />
          </div>
          <div>
            <Label className="text-zinc-700 dark:text-zinc-200" htmlFor="email">
              Correo Electrónico
            </Label>
            <Input
              autoComplete="email"
              className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-primary focus:ring-primary dark:border-zinc-600 dark:bg-zinc-700 dark:text-white sm:text-sm"
              id="email"
              name="email"
              placeholder="ejemplo@correo.com"
              required
              type="email"
            />
          </div>
          <div>
            <Label className="text-zinc-700 dark:text-zinc-200" htmlFor="password">
              Contraseña
            </Label>
            <Input
              autoComplete="current-password"
              className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-primary focus:ring-primary dark:border-zinc-600 dark:bg-zinc-700 dark:text-white sm:text-sm"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              type="password"
            />
          </div>
          {isCompany ? (
            <div>
              <Label className="text-zinc-700 dark:text-zinc-200" htmlFor="companyDetails">
                Detalles de la Empresa
              </Label>
              <Textarea
                className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-primary focus:ring-primary dark:border-zinc-600 dark:bg-zinc-700 dark:text-white sm:text-sm"
                id="companyDetails"
                name="companyDetails"
                placeholder="Ingrese detalles de su empresa"
                required
              />
            </div>
          ) : (
            <div>
              <Label className="text-zinc-700 dark:text-zinc-200" htmlFor="jobTitle">
                Puesto de Trabajo
              </Label>
              <Input
                className="mt-1 block w-full rounded-md border-zinc-300 shadow-sm focus:border-primary focus:ring-primary dark:border-zinc-600 dark:bg-zinc-700 dark:text-white sm:text-sm"
                id="jobTitle"
                name="jobTitle"
                placeholder="Ingrese su puesto de trabajo"
                required
                type="text"
              />
            </div>
          )}
          <div>
            <Button
              className="flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-800"
              type="submit"
            >
              Registrar
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400 gap-4">
          ¿Ya tienes una cuenta?
          <Link className="px-2 font-semibold text-primary hover:text-primary-dark dark:text-primary-light" href="#">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </main>
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
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

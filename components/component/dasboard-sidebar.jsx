'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaStore } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (paths) => paths.includes(pathname);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 flex flex-col h-screen max-w-[280px] bg-white dark:bg-zinc-900 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link className="flex items-center gap-2 font-semibold text-lg md:text-xl border border-black" href="/">
          <MountainIcon className="h-8 w-8 md:h-10 md:w-10" />
          {/* <span className="sr-only">Acme Inc</span> */}
        </Link>
        <button className="md:hidden" onClick={toggleSidebar}>
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="grid gap-1 p-4">
        <li>
            <Link
              className={`flex items-center gap-4 rounded-md px-4 py-3 text-lg font-medium transition-colors ${isActive(['/tablero']) ? 'text-primary bg-primary/10' : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'}`}
              href="/tablero">
              <FaChartSimple className="h-6 w-6 md:h-8 md:w-8" />
              Tablero
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-4 rounded-md px-4 py-3 text-lg font-medium transition-colors ${isActive(['/tablero/empresas/crear', '/tablero/empresas/listar']) ? 'text-primary bg-primary/10' : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'}`}
              href="/tablero/empresas">
              <FaStore className="h-6 w-6 md:h-8 md:w-8" />
              Empresa
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-4 rounded-md px-4 py-3 text-lg font-medium transition-colors ${isActive(['/tablero/empleados', '/tablero/empleados/administrar', '/tablero/empleados/lista', '/tablero/empleados/historial']) ? 'text-primary bg-primary/10' : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'}`}
              href="/tablero/empleados">
              <FaIdCard className="h-6 w-6 md:h-8 md:w-8" />
              Empleados
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-4 rounded-md px-4 py-3 text-lg font-medium transition-colors ${isActive(['/tablero/ajustes', '/tablero/ajustes/empresa']) ? 'text-primary bg-primary/10' : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'}`}
              href="/tablero/ajustes">
              <FaSlidersH className="h-6 w-6 md:h-8 md:w-8" />
              Ajustes
            </Link>
          </li>
        </ul>
      </nav>
    </div>
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

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
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
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

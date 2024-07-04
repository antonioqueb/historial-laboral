'use client';
import Link from 'next/link';
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModeToggle from '@/components/ModeToggle';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { RiArrowDownWideLine } from "react-icons/ri";

export default function DashboardNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOptions, setMenuOptions] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Sección para el path '/tablero/empleados'
    if (pathname.startsWith('/tablero/empleados')) {
      setMenuOptions([
        { label: 'Empleados', href: '/tablero/empleados' },
        { label: 'Crear', href: '/tablero/empleados/crear' },
        { label: 'Editar', href: '/tablero/empleados/editar' },
        { label: 'Recomendar', href: '/tablero/empleados/recomendar' }
      ]);
    }

    // Sección para el path '/tablero/empresas/listar'
    else if (pathname.startsWith('/tablero/empresas')) {
      setMenuOptions([
        { label: 'Empresas', href: '/tablero/empresas' },
        { label: 'Registrar', href: '/tablero/empresas/crear' },
        { label: 'Editar', href: '/tablero/empresas/editar' }
      ]);
    }

    // Sección para el path '/tablero/ajustes'
    else if (pathname.startsWith('/tablero/ajustes')) {
      setMenuOptions([
        { label: 'General', href: '/tablero/ajustes' },
        { label: 'Empresa', href: '/tablero/ajustes/empresa' },
      ]);
    }

    // Sección para el path '/tablero'
    else if (pathname.startsWith('/tablero')) {
      setMenuOptions([
        { label: 'Resumen', href: '/tablero' },
      ]);
    }

    // Sección para cualquier otro path
    else {
      setMenuOptions([
        { label: 'Inicio', href: '/' },
        { label: 'Acerca de', href: '/about' },
        { label: 'Contacto', href: '/contact' },
      ]);
    }
  }, [pathname]);

  useEffect(() => {
    if (session) {
      fetchUserIdAndProfileImage();
    }
  }, [session]);

  const fetchUserIdAndProfileImage = async () => {
    try {
      const userIdResponse = await fetch('/api/getUserId');
      if (userIdResponse.ok) {
        const userIdData = await userIdResponse.json();
        const userId = userIdData.id;

        const profileImageResponse = await fetch(`/api/getProfileImage?id=${userId}`);
        if (profileImageResponse.ok) {
          const profileImageData = await profileImageResponse.json();
          setProfileImageUrl(profileImageData.profileImageUrl);
        } else {
          console.error('Failed to fetch profile image URL');
        }
      } else {
        console.error('Failed to fetch user ID');
      }
    } catch (error) {
      console.error('Error fetching user ID or profile image URL:', error);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getFirstNameAndSurname = (name) => {
    if (!name) return 'NA';
    const [firstName, ...rest] = name.split(' ');
    const surname = rest.length > 0 ? rest[0] : '';
    return `${firstName.charAt(0)}${surname.charAt(0)}`;
  };

  return (
    <header className={`sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 w-full transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : ''}`}>
      <div className="flex items-center">
        <nav className="hidden md:flex space-x-4">
          {menuOptions.map((option, index) => (
            <Link
              key={index}
              className={`text-zinc-700 hover:text-zinc-950 font-medium dark:text-zinc-100 ${pathname === option.href ? 'border-b-2 border-primary' : ''}`}
              href={option.href}
            >
              {option.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center w-10 h-10 rounded-full">
                <RiArrowDownWideLine className="w-6 h-6 text-zinc-700 dark:text-zinc-100" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-4">
              {menuOptions.map((option, index) => (
                <DropdownMenuItem key={index}>
                  <Link href={option.href} className="w-full">
                    {option.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {session ? (
              <div className="flex items-center gap-2">
                {imageError || !profileImageUrl ? (
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-400 rounded-full text-xl text-white">
                    {getFirstNameAndSurname(session.user.name)}
                  </div>
                ) : (
                  <Image
                    src={profileImageUrl}
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="rounded-full"
                    onError={handleImageError}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-zinc-300 rounded-full text-xl text-white">
                  NA
                </div>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link className="flex items-center" href="#">
                <UserIcon className="h-4 w-4 mr-2" />
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center" href="#">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Configuración
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className="flex items-center" href="#">
                <LogOutIcon className="h-4 w-4 mr-2" />
                Cerrar sesión
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function LogOutIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

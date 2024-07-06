'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Login from '@/components/Login';

export default function Header() {
  const [imageError, setImageError] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const { data: session } = useSession();

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

  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link className="flex items-center gap-2" href="/">
        <h2 className="font-bold text-xl lg:text-2xl">Historial Laboral</h2>
      </Link>
      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-2">
            <Button>
              <Link href="/tablero">Tablero</Link>
            </Button>
            <Button className="rounded-full" size="icon" variant="ghost">
              <ModeToggle />
            </Button>
            {imageError || !profileImageUrl ? (
              <div className="w-10 h-10 flex items-center justify-center bg-zinc-300 rounded-full text-xl text-white">
                {session.user?.name?.charAt(0)}
              </div>
            ) : (
              <Button className="rounded-full" size="icon" variant="ghost">
                <ModeToggle />
              </Button>

            )}
            <Image
              src={profileImageUrl}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
              onError={handleImageError}
            />
          </div>
        ) : (
          <>
            <Login />
          </>
        )}

      </div>
    </header>
  );
}

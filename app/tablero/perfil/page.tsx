'use client';
import React from 'react';
import ProfileImageUploader from '@/components/component/ProfileImageUploader';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Profile = async () => {
  const session = await getSession();

  if (!session || !session.user || !session.user.id) {
    // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    redirect('/auth/signin');
    return null;
  }

  // Asegúrate de que el usuario tiene un ID
  const userId = session.user.id;

  return (
    <div>
      <h1>Profile</h1>
      <ProfileImageUploader userId={userId} />
    </div>
  );
};

export default Profile;

'use client';
import React, { useEffect, useState } from 'react';
import ProfileImageUploader from '@/components/component/ProfileImageUploader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link'; // Importar Link de next/link

const ProfilePage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ email: string; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch('https://historiallaboral.com/api/getUserId');
        if (res.ok) {
          const data = await res.json();
          setUserId(data.id);
          fetchUserData(data.id);
        } else {
          setError('Failed to fetch user ID');
        }
      } catch (err) {
        setError('Failed to fetch user ID');
      }
    };

    const fetchUserData = async (id: string) => {
      try {
        const res = await fetch(`/api/getUserData?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    fetchUserId();
  }, []);

  const handleUpdate = async () => {
    if (!userId || !userData) {
      setUpdateStatus('Missing user ID or data');
      return;
    }

    try {
      const res = await fetch('/api/updateUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...userData }),
      });

      if (!res.ok) {
        throw new Error('Error updating user data');
      }

      setUpdateStatus('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data', error);
      setUpdateStatus('Error updating user data');
    }
  };

  const handleUpdateStatus = (message: string) => {
    setUpdateStatus(message);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userId || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-12 mb-14">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Personalizar Perfil</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 py-4">
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Información Personal</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 items-center mb-4">
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                id="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="block w-full text-sm border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 items-center mb-4">
              <Label htmlFor="name">Nombre:</Label>
              <Input
                type="text"
                id="name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="block w-full text-sm border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
              />
            </div>
            <Button onClick={handleUpdate} className="w-full">Actualizar Perfil</Button>
            {updateStatus && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{updateStatus}</p>}
          </div>
        </Card>
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Foto de Perfil</h2>
          <ProfileImageUploader userId={userId} onUpdateStatus={handleUpdateStatus} />
        </Card>
      </div>
      <div className="flex justify-end mt-4">
        <Link href="/dashboard" className="ml-2">
          <Button type="button">Cancelar</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;

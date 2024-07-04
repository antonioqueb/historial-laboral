'use client';
import React, { useEffect, useState } from 'react';
import ProfileImageUploader from '@/components/component/ProfileImageUploader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-left">use client</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Información Personal</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Email:</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="block w-full text-sm border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Nombre:</label>
              <input
                type="text"
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
    </div>
  );
};

export default ProfilePage;

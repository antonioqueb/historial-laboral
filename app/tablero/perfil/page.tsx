'use client';

import React, { useEffect, useState } from 'react';
import ProfileImageUploader from '@/components/component/ProfileImageUploader';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';

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
    <div className='px-4'>
      <h1 className="text-3xl font-bold mb-8">Perfil</h1>
      <Card className="p-4 mb-4">
        <div className="mb-4">
          <label>Email:</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label>Name:</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>
        <Button onClick={handleUpdate} className="w-full">Update Profile</Button>
        {updateStatus && <p>{updateStatus}</p>}
      </Card>
      <ProfileImageUploader userId={userId} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};

export default ProfilePage;

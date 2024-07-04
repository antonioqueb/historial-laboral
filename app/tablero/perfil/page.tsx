'use client';
import React, { useEffect, useState } from 'react';
import ProfileImageUploader from '@/components/component/ProfileImageUploader';

const ProfilePage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch('https://historiallaboral.com/api/getUserId');
        if (res.ok) {
          const data = await res.json();
          setUserId(data.id);
        } else {
          setError('Failed to fetch user ID');
        }
      } catch (err) {
        setError('Failed to fetch user ID');
      }
    };

    fetchUserId();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <ProfileImageUploader userId={userId} />
    </div>
  );
};

export default ProfilePage;

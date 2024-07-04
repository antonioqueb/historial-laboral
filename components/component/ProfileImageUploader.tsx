'use client';

import React, { useState } from 'react';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Toaster} from '@/components/ui/toaster';

interface ProfileImageUploaderProps {
  userId: string;
  userData: { email: string; name: string };
  onUpdateStatus: (message: string, type: 'success' | 'error') => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ userId, userData, onUpdateStatus }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file to upload');
      onUpdateStatus('Please select a file to upload', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('id', userId);
    formData.append('docType', 'profile');

    try {
      const res = await fetch('https://cdn-user-image.historiallaboral.com/upload_id', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Error uploading image');
      }

      const data = await res.json();
      const imageUrl = data.imageUrl;

      const updateRes = await fetch('/api/updateProfileImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, imageUrl }),
      });

      if (!updateRes.ok) {
        throw new Error('Error updating profile image URL');
      }

      setUploadStatus('Image uploaded successfully!');
      onUpdateStatus('Image uploaded successfully!', 'success');
    } catch (error) {
      console.error('Error uploading image', error);
      setUploadStatus('Error uploading image');
      onUpdateStatus('Error uploading image', 'error');
    }
  };

  return (
    <Card>
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>
      <Button onClick={handleUpload}>Upload</Button>
      {uploadStatus && <p>{uploadStatus}</p>}
      <Toaster />
    </Card>
  );
};

export default ProfileImageUploader;

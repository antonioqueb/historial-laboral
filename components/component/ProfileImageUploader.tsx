'use client';

import React, { useState } from 'react';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';

interface ProfileImageUploaderProps {
  userId: string;
  onUpdateStatus: (message: string) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ userId, onUpdateStatus }) => {
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
      onUpdateStatus('Please select a file to upload');
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
      onUpdateStatus('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image', error);
      setUploadStatus('Error uploading image');
      onUpdateStatus('Error uploading image');
    }
  };

  return (
    <Card className="p-4 h-full">
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>
      <Button onClick={handleUpload} className="w-full my-4">Subir Imagen</Button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </Card>
  );
};

export default ProfileImageUploader;

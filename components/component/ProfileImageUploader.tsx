'use client';

import React, { useState } from 'react';

interface ProfileImageUploaderProps {
  userId: string;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ userId }) => {
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
    } catch (error) {
      console.error('Error uploading image', error);
      setUploadStatus('Error uploading image');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ProfileImageUploader;

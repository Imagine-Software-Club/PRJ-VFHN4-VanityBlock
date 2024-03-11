import React, { useState } from 'react';
import { storage } from './firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function ImageUpload() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files].slice(0, 3)); // Limit to 3 images
  };

  const uploadImages = async () => {
    setUploading(true);
    const urls = [];
    for (const image of images) {
      const imageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      urls.push(url);
    }
    setUploading(false);
    console.log(urls); // Here you might want to update your state or database with the image URLs
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
      <button onClick={uploadImages} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Images'}
      </button>
    </div>
  );
}

export default ImageUpload;

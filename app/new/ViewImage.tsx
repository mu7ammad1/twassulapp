"use client";
import React, { useState } from "react";

interface ImagePreviewProps {
  initialPreviews?: any[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ initialPreviews = [] }) => {
  const [imagePreviews, setImagePreviews] = useState<any[]>(initialPreviews);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("photos")?.click();
  };

  const handleImageRemove = (index: number) => {
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Hidden file input */}
      <input
        type="file"
        name="photos"
        id="photos"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Clickable text for uploading images */}
      <p
        className="cursor-pointer text-blue-600 underline"
        onClick={triggerFileInput}
      >
        Click here to select images
      </p>

      {/* Preview selected images */}
      {imagePreviews.map((preview, index) => (
        <div key={index} className="relative">
          <img
            src={preview}
            alt={`Selected image ${index + 1}`}
            className="w-24 h-24 object-cover rounded-md"
          />
          {/* Delete button */}
          <button
            onClick={() => handleImageRemove(index)}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
            title="Remove image"
          >
            &times; {/* This can be replaced with an icon */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
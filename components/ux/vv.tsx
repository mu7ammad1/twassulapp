"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pkvjhmdwcfyowvxsvhjs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrdmpobWR3Y2Z5b3d2eHN2aGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDk4MDEsImV4cCI6MjAzNTQ4NTgwMX0.axldIPcTS5PfPPAzz1brxaxaCO1YvmUTpGTP3m4EXq4"
);

function UploadImage() {
  const [file, setFile] = useState<File | null>(null); // Use type File for file state

  const uploadImage = async () => {
    if (!file) return;

    const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
    const fileName = `${Date.now()}_${randomNum}`; // Combine with timestamp and original file name
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${fileName}`, file);

    if (error) {
      console.error("Error uploading image:", error);
      return;
    }

    console.log("Image uploaded successfully:", data);
  };

  return (
    <div>
      <input type="file" onChange={(e: any) => setFile(e.target.files?.[0])} />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default UploadImage;

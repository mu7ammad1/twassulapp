"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// إنشاء عميل Supabase
const supabase = createClient(
  "https://pkvjhmdwcfyowvxsvhjs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrdmpobWR3Y2Z5b3d2eHN2aGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDk4MDEsImV4cCI6MjAzNTQ4NTgwMX0.axldIPcTS5PfPPAzz1brxaxaCO1YvmUTpGTP3m4EXq4"
);

function ImageDisplayView({ imageName }: any) {
  const [imageUrl, setImageUrl] = useState(""); // حالة لتخزين رابط الصورة المجلبة

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // جلب الصورة من تخزين Supabase باستخدام اسمها
        const { data, error }: any = await supabase.storage
          .from("images")
          .getPublicUrl(`public/${imageName}`);

        if (error) {
          throw error;
        }

        // تعيين رابط الصورة في حالة رابط الصورة
        setImageUrl(data.publicUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [imageName]);

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <img
      src={`${imageUrl}`}
      alt={imageName}
      className={`max-h-72 rounded-xl object-fill p-0 m-0`}
    />
  );
}

export default ImageDisplayView;

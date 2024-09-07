"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

// إنشاء عميل Supabase
const supabase = createClient();

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

"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";

// إنشاء عميل Supabase
const supabase = createClient(
  "https://pkvjhmdwcfyowvxsvhjs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrdmpobWR3Y2Z5b3d2eHN2aGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDk4MDEsImV4cCI6MjAzNTQ4NTgwMX0.axldIPcTS5PfPPAzz1brxaxaCO1YvmUTpGTP3m4EXq4"
);

function Avatar_card_profile({ imageName }: any) {
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
    <Avatar className={`w-9 h-9 rounded-full object-fill p-0 m-0`}>
      <AvatarImage className="rounded-full" src={imageName} />
      <AvatarFallback className="bg-stone-800">CN</AvatarFallback>
    </Avatar>
  );
}

export default Avatar_card_profile;

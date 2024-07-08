"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

// إنشاء عميل Supabase
const supabase = createClient(
  "https://pkvjhmdwcfyowvxsvhjs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrdmpobWR3Y2Z5b3d2eHN2aGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDk4MDEsImV4cCI6MjAzNTQ4NTgwMX0.axldIPcTS5PfPPAzz1brxaxaCO1YvmUTpGTP3m4EXq4"
);


function AvatarProfile({ imageName, CN }: any) {
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

  return (
    <div className={cn(`-p-1 border-4 border-emerald-500 rounded-full`)}>
      <Avatar
        className={cn(
          `w-20 h-20 rounded-full object-cover object-center m-0 border-4 border-white/0 `
        )}
      >
        <AvatarImage src={imageUrl} />
        <AvatarFallback className={`bg-stone-800`}>{CN}</AvatarFallback>
      </Avatar>
     
    </div>
  );
}

export default AvatarProfile;

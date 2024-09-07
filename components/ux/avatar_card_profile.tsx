"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import { createClient } from "@/utils/supabase/client";

// إنشاء عميل Supabase
const supabase = createClient();

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

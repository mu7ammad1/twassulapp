"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { SubmitButton } from "@/app/login/submit-button";

export default function SaveBTN({ post_id }: any) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();
  useEffect(() => {
    // تحقق مما إذا كان المستخدم مسجل الدخول وقم بجلب حالة الإعجاب
    const fetchLikeStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        // التحقق مما إذا كان المستخدم قد أعجب بالفعل بالمنشور
        const { data: likeData } = await supabase
          .from("like")
          .select("*")
          .eq("post_id", post_id)
          .eq("user_id", user.id)
          .single();

        // الحصول على عدد الإعجابات للمنشور
        const { data: likes } = await supabase
          .from("like")
          .select("*")
          .eq("post_id", post_id);

        if (likeData) {
          setIsLiked(true);
        }

        setLikeCount(likes?.length || 0);
      }

      setLoading(false);
    };

    fetchLikeStatus();
  }, [post_id, supabase]);

  const handleLikeToggle = async () => {
    if (!user) return; // التأكد من وجود المستخدم قبل تنفيذ العملية

    if (isLiked) {
      // إلغاء الإعجاب
      const { error } = await supabase
        .from("like")
        .delete()
        .eq("post_id", post_id)
        .eq("user_id", user.id);

      if (!error) {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      }
    } else {
      // إضافة إعجاب
      const { error } = await supabase
        .from("like")
        .insert({ post_id: post_id, user_id: user.id });

      if (!error) {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    }
  };

  if (loading) {
    return <p>.</p>;
  }

  return (
    <form className={`flex gap-2`}>
      <SubmitButton
        formAction={handleLikeToggle}
        pendingText={`Processing...`}
        className="flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isLiked ? "red" : "none"} // يتغير اللون إلى الأحمر عند الإعجاب
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={isLiked ? "red" : "currentColor"} // يتغير لون الخط إلى الأحمر عند الإعجاب
          className="w-6 h-6 hover:fill-rose-500 hover:stroke-rose-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </SubmitButton>
      <p className={`w-full`}>{likeCount}</p>
    </form>
  );
}

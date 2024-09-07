"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { SubmitButton } from "../insert/submit-button";

export default function FollowBTN({ username }: any) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null); // لتخزين معلومات المستخدم

  const supabase = createClient();

  useEffect(() => {
    // تحقق مما إذا كان المستخدم مسجل الدخول
    const checkUserStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user); // تخزين المستخدم في الحالة
        const { data } = await supabase
          .from("follows")
          .select("id")
          .eq("following_id", username)
          .eq("follower_id", user.id)
          .single();

        if (data) {
          setIsFollowing(true);
        }
      }

      setLoading(false);
    };

    checkUserStatus();
  }, [username, supabase]);

  const handleFollowToggle = async (formData: FormData) => {
    if (!user) return; // التأكد من وجود المستخدم قبل تنفيذ العملية

    if (isFollowing) {
      // إلغاء المتابعة
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("following_id", username)
        .eq("follower_id", user.id);

      if (!error) {
        setIsFollowing(false);
      }
    } else {
      // المتابعة
      const { error } = await supabase
        .from("follows")
        .insert({ following_id: username, follower_id: user.id });

      if (!error) {
        setIsFollowing(true);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // عرض مؤقت حتى يتم تحميل الحالة
  }

  if (!user) {
    return <div className="p-2 bg-stone-800 w-full text-center rounded-xl">Please log in to follow this user.</div>; // عرض رسالة إذا لم يكن هناك مستخدم
  }

  return (
    <form className="flex flex-col w-full justify-center text-white">
      <SubmitButton
        formAction={handleFollowToggle}
        className="bg-secondary-foreground rounded-xl px-4 py-2"
        pendingText="Processing..."
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </SubmitButton>
    </form>
  );
}

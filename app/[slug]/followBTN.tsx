"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { SubmitButton } from "../insert/submit-button";

export default function FollowBTN({ username, initialLength }: any) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null); // لتخزين معلومات المستخدم
  const [length, setLength] = useState(initialLength); // لتخزين عدد المتابعين

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
        setLength((prevLength: number) => prevLength - 1); // نقص العدد
      }
    } else {
      // المتابعة
      const { error } = await supabase
        .from("follows")
        .insert({ following_id: username, follower_id: user.id });

      if (!error) {
        setIsFollowing(true);
        setLength((prevLength: number) => prevLength + 1); // زيادة العدد
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // عرض مؤقت حتى يتم تحميل الحالة
  }

  if (!user) {
    return (
      <div className="w-full">
        <div className="flex justify-end gap-2 text-sm font-extralight">
          <p>متابع</p>
          <p>{length}</p> {/* عرض العدد */}
        </div>
        <div className="p-2 mt-3 bg-stone-800 w-full text-center rounded-xl">
          Please log in to follow this user.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-end gap-2 text-sm font-extralight">
        <p>متابع</p>
        <p>{length}</p> {/* عرض العدد */}
      </div>
      <form className="mt-3 flex flex-col w-full justify-center">
        <SubmitButton
          formAction={handleFollowToggle}
          className={`rounded-xl px-4 py-2 ${
            isFollowing ? `bg-secondary-foreground` : `bg-white text-black`
          }`}
          pendingText="Processing..."
        >
          {isFollowing ? "اللغاء المتابعة" : "متابعة"}
        </SubmitButton>
      </form>
    </div>
  );
}

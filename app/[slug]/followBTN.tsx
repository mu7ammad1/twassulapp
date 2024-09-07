"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { SubmitButton } from "../insert/submit-button";

export default function FollowBTN({ username }: any) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    // تحقق مما إذا كان المستخدم يتابع بالفعل
    const checkFollowingStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("follows")
          .select("id")
          .eq("following_id", username)
          .eq("follower_id", user.id)
          .single();

        if (data) {
          setIsFollowing(true);
        }

        setLoading(false);
      }
    };

    checkFollowingStatus();
  }, [username, supabase]);

  const handleFollowToggle = async (formData: FormData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
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
    }
  };

  if (loading) {
    return <div>Loading...</div>; // عرض مؤقت حتى يتم تحميل الحالة
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

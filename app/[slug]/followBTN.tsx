"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { SubmitButton } from "../insert/submit-button";
import { Button } from "@/components/ui/button";

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
    return (
      <div className="w-full h-10 rounded-full flex justify-center items-center">
        ...جاري التحميل
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full">
        <div className="flex justify-end gap-2 text-sm font-extralight">
          <p>متابع</p>
          <p>{length}</p>
        </div>
        <div className="p-2 mt-3 w-full flex justify-between items-center text-center gap-5 *:rounded-full">
          <Button variant={`default`} size={"default"} className="text-secondary-foreground w-full dark:text-secondary-foreground dark:bg-secondary">
            Please log in to follow this user.
          </Button>
          <Button variant={`default`} size={"default"} className="text-secondary-foreground dark:text-secondary-foreground dark:bg-secondary">
            مرسالة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-end gap-2 text-sm font-extralight">
        <p>متابع</p>
        <p>{length}</p>
      </div>
      <form className="mt-3 flex w-full justify-between gap-3 *:rounded-full">
        <SubmitButton
          formAction={handleFollowToggle}
          className={`rounded-xl px-4 py-2 ${isFollowing ? `bg-popover dark:bg-secondary w-full` : `bg-popover w-full text-secondary-foreground dark:text-secondary dark:bg-popover-foreground`
            }`}
          pendingText="Processing..."
          size={`lg`}
        >
          {isFollowing ? "اللغاء المتابعة" : "متابعة"}
        </SubmitButton>
        <Button variant={`default`} size={"default"} className="text-secondary-foreground dark:text-secondary-foreground dark:bg-secondary">
          مرسالة
        </Button>
      </form>
    </div>
  );
}






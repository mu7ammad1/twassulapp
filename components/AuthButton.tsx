import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import New from "./ux/new";
import Avatar_card_profile from "./ux/avatar_card_profile";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    return <div>Error fetching user information</div>;
  }

  if (user) {
    // تحقق من وجود ملف شخصي
    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      // PGRST116 code indicates no rows returned
      console.error("Error fetching profile:", profileError);
      return <div>Error fetching profile information</div>;
    }

    if (!profile) {
      // إنشاء ملف شخصي إذا لم يكن موجوداً
      const { error: insertError } = await supabase
        .from("profile")
        .insert([{ id: user.id, username: "New User" }]); // يمكنك تعديل اسم المستخدم الافتراضي إذا لزم الأمر

      if (insertError) {
        console.error("Error creating profile:", insertError);
        return <div>Error creating profile</div>;
      }
    }

    const { data: updatedProfile, error: updatedProfileError } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();

    if (updatedProfileError) {
      console.error("Error fetching updated profile:", updatedProfileError);
      return <div>Error fetching updated profile information</div>;
    }

    const signOut = async () => {
      "use server";

      const supabase = createClient();
      await supabase.auth.signOut();
      return redirect("/login");
    };

    return (
      <div className="flex items-center gap-4">
        <div>{updatedProfile.username}</div>
        <Avatar_card_profile imageName={updatedProfile.avatar} />
        <form action={signOut}>
          <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Logout
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}

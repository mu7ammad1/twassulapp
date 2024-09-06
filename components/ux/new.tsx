import { createClient, generateRandomNumber } from "@/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import Avatar_card_profile from "./avatar_card_profile";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "@/app/login/submit-button";

export default async function News(avatar: any) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    return <div>Error fetching user information in New.js</div>;
  }

  if (user) {
    // تحقق من وجود ملف شخصي
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      console.error("Error fetching profile:", profileError);
      return <div>Error fetching profile information</div>;
    }

    if (!profile) {
      // إنشاء ملف شخصي إذا لم يكن موجوداً
      const { error: insertError } = await supabase
        .from("profiles")
        .insert([{ id: user.id, username: `username_${Date.now()}` }])
        .single();

      if (insertError) {
        console.error("Error creating profile:", insertError);
        return <div>Error creating profile</div>;
      }
    }

    const { data: updatedProfile, error: updatedProfileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (updatedProfileError) {
      console.error("Error fetching updated profile:", updatedProfileError);
      return <div>Error fetching updated profile information</div>;
    }

    const postArticle = async (formData: FormData) => {
      "use server";

      const content = formData.get("content") as string;
      const files = formData.getAll("photos") as File[];

      const supabase = createClient();

      let photo_urls: string[] = [];
      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const randomNumber = generateRandomNumber();
          const { data, error } = await supabase.storage
            .from("images")
            .upload(`public/${Date.now()}_${randomNumber}`, file);

          if (error) {
            console.error("Error uploading photo:", error);
            throw error;
          }
          return data.path;
        });

        photo_urls = await Promise.all(uploadPromises);
      }

      const { error } = await supabase
        .from("post")
        .insert([{ user_id: updatedProfile.username, content, photo_urls }]);

      if (error) {
        console.error("Error creating post:", error);
        return <div>Error creating post</div>;
      }

      return redirect("/news");
    };

    return (
      <div className={`bg-stone-900 rounded-lg p-2 w-full`}>
        <div className={`flex gap-2`}>
          <div className="flex items-start justify-center gap-4">
            <Avatar_card_profile imageName={updatedProfile.avatar} />
          </div>
          <form
            className="flex-1 flex flex-col w-full justify-center gap-2"
            action={postArticle}
          >
            <Textarea
              name="content"
              placeholder="Tell us a little bit about yourself"
              className="resize-none text-right flex justify-start border-none focus-visible:ring-0 bg-stone-500/0 placeholder:text-stone-500 focus-visible:shadow-red-50/0 ring-0 focus:ring-0"
              required
              dir="auto"
            />
            <input
              type="file"
              name="photos"
              multiple
              accept="image/*"
              className="file-input"
            />
            <div className={`flex justify-between items-center gap-3`}>
              <div className={`flex gap-3`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0  0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                  />
                </svg>
              </div>
              <div>
                <SubmitButton
                  formAction={postArticle}
                  className={`bg-stone-500 text-sm border-none px-5 py-1 rounded-md m-0`}
                  pendingText="Posting..."
                >
                  نشر
                </SubmitButton>
              </div>
            </div>
          </form>
        </div>
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

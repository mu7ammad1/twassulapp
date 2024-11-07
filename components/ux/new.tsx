import { createClient, generateRandomNumber } from "@/utils/supabase/server";
import { Textarea } from "@/components/ui/textarea";
import Avatar_card_profile from "./avatar_card_profile";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SubmitButton } from "@/app/login/submit-button";
import View_images from "./view_images";
import ImagePreview from "@/app/new/ViewImage";

export default async function News() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return <div>userError</div>;
  }
  const { data: profile, error: updatedProfileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (updatedProfileError) {
    console.error("Error fetching updated profile:", updatedProfileError);
    return <div>Error fetching updated profile information</div>;
  }
  if (user) {
    const postArticle = async (formData: FormData) => {
      "use server";

      const content = formData.get("content") as string;
      const files = formData.getAll("photos") as File[];

      const supabase = createClient();

      let photo_urls: string[] = [];

      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const randomNumber = generateRandomNumber();
          const imagePath = `posts/${Date.now()}_${randomNumber}`;

          const { data, error } = await supabase.storage
            .from("image")
            .upload(imagePath, file);

          if (error) {
            console.error("Error uploading photo:", error);
            throw error;
          }

          // Construct the full URL using the public URL method
          const { data: publicURL } = supabase.storage
            .from("image")
            .getPublicUrl(imagePath);

          return publicURL.publicUrl;
        });

        photo_urls = await Promise.all(uploadPromises);
      }

      // Insert post into the database with the photo URLs
      const { error } = await supabase.from("posts").insert([
        {
          user_id: user?.id,
          content,
          photo_urls, // This will now contain the full image URLs
        },
      ]);

      if (error) {
        console.error("Error creating post:", error);
        return <div>Error creating post</div>;
      }

      return redirect("/");
    };

    return (
      <div className={`rounded-lg pt-5 w-full`}>
        <div className={`flex gap-2`}>
          <form
            className="flex-1 flex flex-col w-full justify-center gap-2"
            action={postArticle}
          >
            <Textarea
              name="content"
              placeholder="ما الجديد؟"
              className="resize-none h-52 max-h-96 text-right flex justify-start border-none focus-visible:ring-0 bg-stone-500/0 placeholder:text-stone-500 focus-visible:shadow-red-50/0 ring-0 focus:ring-0"
              dir="auto"
            />

            <div className={`flex justify-between items-center gap-3`}>
              <ImagePreview />
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

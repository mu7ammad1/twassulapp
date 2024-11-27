import { createClient } from "@/utils/supabase/server";
import Card from "@/components/ux/card";

export default async function ForYou() {
  const supabase = createClient();

  // Fetch post data
  const { data: posts, error: postError } = await supabase
    .from("views_posts")
    .select("*, profiles(id,username, avatar_url,isValid,full_name,bio),like (*)")

  if (postError) {
    console.error(postError);
    return <div>هناك خطأ في استرداد البيانات</div>;
  }

  return (
    <main className="flex flex-col justify-center max-w-7xl w-full border rounded-2xl border-none px-3 py-2">
      {posts?.map((post, id) => (
        <div key={id} className="w-full h-full first:border-none gap-5">
          <Card
            pollOptions={post.poll_options}
            id={post.id}
            created={post.created_at}
            id_user={post.profiles.id}
            username_user={post.profiles.username}
            contents={post.content}
            photos={post.photo_urls}
            publish={post.published}
            avatar={post.profiles?.avatar_url}
            Valid={post.profiles.isValid}
            likes={post.like.length}
            full_name={post.profiles.full_name}
            bio={post.profiles.bio}
          />
        </div>
      ))}
    </main>
  );
}

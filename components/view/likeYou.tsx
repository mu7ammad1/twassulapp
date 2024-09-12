import { createClient } from "@/utils/supabase/server";
import Card from "@/components/ux/card";

export default async function LikeYou() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch post data
  const { data: like, error: postError }: any = await supabase
    .from("like")
    .select("*, posts(*),profiles (*)")
    .eq("user_id", user?.id);

  if (postError) {
    console.error(postError);
    return <div>Error fetching posts</div>;
  }

  return (
    <main className="flex flex-col justify-center max-w-7xl w-full">
      {like?.map((post: any, id: any) => (
        <div key={id} className="w-full h-full first:border-none">
          <Card
            pollOptions={post.poll_options}
            id={post.posts.id}
            created={post.posts.created_at}
            id_user={post.profiles.id}
            username_user={post.profiles.username}
            contents={post.posts.content}
            photos={post.posts.photo_urls}
            publish={post.posts.published}
            avatar={post.profiles?.avatar_url}
            Valid={post.profiles?.isValid}
          />
        </div>
      ))}
    </main>
  );
}

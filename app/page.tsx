import { createClient } from "@/utils/supabase/server";
import New from "@/components/ux/new";
import Card from "@/components/ux/card";

// Home component definition
export default async function Home() {
  const supabase = createClient();

  // Fetch post data
  const { data: posts, error: postError } = await supabase
    .from("posts")
    .select("*, profiles(id,username, avatar_url, isValid)");

  if (postError) {
    console.error(postError);
    return <div>Error fetching posts</div>;
  }

  return (
    <main className="flex flex-col justify-center max-w-7xl w-full">
      <New />
      {posts?.map((post, id) => (
        <div key={id} className="w-full h-full">
          <Card
            pollOptions={post.poll_options}
            id={post.id}
            created={post.created_at}
            id_user={post.profiles.username}
            contents={post.content}
            photos={post.photo_urls}
            publish={post.published}
            avatar={post.profiles?.avatar_url}
            Valid={post.profiles.isValid}
          />
        </div>
      ))}
    </main>
  );
}

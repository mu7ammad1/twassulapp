import Card from "@/components/ux/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import New from "@/components/ux/new";

export default async function Page({ params }: { params: { post: string } }) {
  const supabase = createClient();

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("*, profiles(id,username, avatar_url,isValid),like (id)")
    .eq("id", `${params.post}`)
    .single();

  if (postError) {
    console.error(postError);
    return <div>Error fetching posts</div>;
  }

  return (
    <main>
      <section className={cn(`w-full my-3 text-left flex gap-3 flex-col`)}>
        <div className="w-full h-full">
          <Card
            pollOptions={post?.poll_options}
            id={post.id}
            created={post.created_at}
            id_user={post.profiles.username}
            contents={post.content}
            photos={post.photo_urls}
            publish={post.published}
            avatar={post.profiles.avatar_url}
            Valid={post.profiles.isValid}
            likes={post.like.length}
          />
        </div>
        <h1 className={`flex text-left`}>14 Comments</h1>
        <div className={`w-full flex justify-center gap-3`}>
          <New />
        </div>
      </section>
    </main>
  );
}

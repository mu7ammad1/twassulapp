import { createClient } from "@/utils/supabase/server";
import Card from "@/components/ux/card";

export default async function ForYou() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const kk = user ? supabase
    .rpc('get_user_posts', {
      target_user_id: user?.id
    }) : supabase.from("posts_with_stats").select("*")


  const { data, error } = await kk


  if (error) {
    console.error('Error:', error);  // في حال وجود خطأ، يتم طباعة الخطأ
  }


  return (
    <main className="flex flex-col justify-center max-w-7xl w-full border rounded-2xl border-none px-3 py-2">
      {data?.map(({ post_id, created_at, post_user_id, post_content, photo_urls, post_published, user_vote, user_liked, option_one, option_two, option_three, option_four, author_username, author_full_name, author_avatar, profile_website, profile_bio, is_following, published, profile_links, likes_count, followers_count }: any) => (
        <div key={post_id} className="w-full h-full first:border-none gap-5">
          <Card
            id={post_id}
            created={created_at}
            id_user={post_user_id}
            username_user={author_username}
            contents={post_content}
            photos={photo_urls}
            publish={post_published}
            avatar={author_avatar}
            Valid={published}
            likes={likes_count}
            full_name={author_full_name}
            bio={profile_bio}
            is_following={is_following}
            user_liked={user_liked}
            user={user?.id}
            option_one={option_one}
            option_two={option_two}
            option_three={option_three}
            option_four={option_four}
            followers_count={followers_count}
            user_vote={user_vote}
          />
        </div>
      ))}
    </main>
  );
}

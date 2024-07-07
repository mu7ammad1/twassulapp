import Image from "next/image";
import { Button } from "@/components/ui/button";
import Card from "@/components/ux/card";
import photo1 from "@/image/pexels-curiosophotography-288100.jpg";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import New from "@/components/ux/new";

export default async function Page({ params }: { params: { post: string } }) {
  const supabase = createClient();

  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select();

  if (profileError) {
    console.error(profileError);
    return <div>Error fetching profile</div>;
  }

  const { data: following_id, error: followingError } = await supabase
    .from("follows")
    .select()
    .eq("following_id", `${params.post}`);

  if (followingError) {
    console.error(followingError);
    return <div>Error fetching following data</div>;
  }

  const { data: follower_id, error: followerError } = await supabase
    .from("follows")
    .select()
    .eq("follower_id", `${params.post}`);

  if (followerError) {
    console.error(followerError);
    return <div>Error fetching follower data</div>;
  }

  const { data: posts, error: postError } = await supabase
    .from("post")
    .select()
    .eq("id", `${params.post}`);

  if (postError) {
    console.error(postError);
    return <div>Error fetching posts</div>;
  }

  // Create a map of avatars and isValid by username
  const avatarMap = profile.reduce((acc: any, profile) => {
    acc[profile.username] = {
      avatar: profile.avatar,
      isValid: profile.isValid,
    };
    return acc;
  }, {});

  return (
    <main>
      <section className={cn(`w-full my-3 text-left flex gap-3 flex-col`)}>
        {posts?.map(
          ({
            id,
            created_at,
            update_at,
            post_id_user,
            content,
            photo_urls,
            published,
            poll_options,
            poll_votes,
            avatar_id,
            risk,
          }) => (
            <div key={id} className="w-full h-full">
              <Card
                pollOptions={poll_options}
                id={id}
                created={created_at}
                id_user={post_id_user}
                contents={content}
                photos={photo_urls}
                publish={published}
                avatar={avatarMap[post_id_user]?.avatar} // Add avatar from the profileMap
                Valid={avatarMap[post_id_user]?.isValid} // Add isValid from the profileMap
              />
            </div>
          )
        )}
        <h1 className={`flex text-left`}>14 Comments</h1>
        <div className={`w-full flex justify-center gap-3`}>
          <New />
        </div>
      </section>
    </main>
  );
}

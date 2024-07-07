// Import necessary components and utilities
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import New from "@/components/ux/new";
import Card from "@/components/ux/card";
import { GetServerSideProps } from "next";

// Type definitions for posts and profiles
type Post = {
  id: any;
  created_at: any;
  update_at?: any;
  post_id_user: any;
  content: any;
  photo_urls?: any[];
  published: any;
  poll_options?: any;
  poll_votes?: any;
  avatar_id?: any;
  risk?: any;
};

type Profile = {
  username: any;
  avatar?: any;
  isValid: any;
};

// Home component definition
export default async function Home() {
  const supabase = createClient();

  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  // Fetch post data
  const { data: posts, error: postError } = await supabase
    .from("post")
    .select("*");

  if (postError) {
    console.error(postError);
    return <div>Error fetching posts</div>;
  }

  // Fetch profile data with avatars and isValid
  const { data: profiles, error: profileError } = await supabase
    .from("profile")
    .select("username, avatar, isValid");

  if (profileError) {
    console.error(profileError);
    return <div>Error fetching profiles</div>;
  }

  // Create a map of avatars and isValid by username
  const profileMap = profiles.reduce(
    (
      acc: { [key: string]: { avatar?: string; isValid: boolean } },
      profile
    ) => {
      acc[profile.username] = {
        avatar: profile.avatar,
        isValid: profile.isValid,
      };
      return acc;
    },
    {}
  );

  return (
    <main className="flex flex-col justify-center max-w-7xl w-full">
      <New />
      {posts?.map((post: Post) => (
        <div key={post.id} className="w-full h-full">
          <Card
            pollOptions={post.poll_options}
            id={post.id}
            created={post.created_at}
            id_user={post.post_id_user}
            contents={post.content}
            photos={post.photo_urls}
            publish={post.published}
            avatar={profileMap[post.post_id_user]?.avatar}
            Valid={profileMap[post.post_id_user]?.isValid}
          />
        </div>
      ))}
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            {isSupabaseConnected && <AuthButton />}
          </div>
        </nav>
      </div>
    </main>
  );
}

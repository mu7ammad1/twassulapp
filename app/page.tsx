// Import necessary components and utilities
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import New from "@/components/ux/new";
import Card from "@/components/ux/card";
import { GetServerSideProps } from "next";

// Type definitions for posts and profile
type Post = {
  id: any;
  created_at: any;
  update_at?: any;
  user_id: any;
  content: any;
  photo_urls?: any[];
  published: any;
  poll_options?: any;
  poll_votes?: any;
  avatar_id?: any;
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
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username, avatar_url, isValid");

  if (profileError) {
    console.error(profileError);
    return <div>Error fetching profile</div>;
  }

  // Create a map of avatars and isValid by username
  const profileMap = profile.reduce(
    (
      acc: { [key: string]: { avatar?: string; isValid: boolean } },
      profile
    ) => {
      acc[profile.username] = {
        avatar: profile.avatar_url,
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
            id_user={post.user_id}
            contents={post.content}
            photos={post.photo_urls}
            publish={post.published}
            avatar={profileMap[post.user_id]?.avatar}
            Valid={profileMap[post.user_id]?.isValid}
          />
        </div>
      ))}
    </main>
  );
}

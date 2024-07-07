import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import New from "@/components/ux/new";
import Card from "@/components/ux/card";

export default async function Index() {
  const supabase = createClient();

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
  const profileMap = profiles.reduce((acc: any, profile) => {
    acc[profile.username] = {
      avatar: profile.avatar,
      isValid: profile.isValid,
    };
    return acc;
  }, {});

  return (
    <main className="flex flex-col justify-center max-w-7xl w-full">
      <New />
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
              avatar={profileMap[post_id_user]?.avatar} // Add avatar from the profileMap
              Valid={profileMap[post_id_user]?.isValid} // Add isValid from the profileMap
            />
          </div>
        )
      )}
      <Element />
    </main>
  );
}

export function Element() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
    </div>
  );
}

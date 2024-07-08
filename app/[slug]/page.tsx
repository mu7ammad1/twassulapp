import { Button } from "@/components/ui/button";
import Card from "@/components/ux/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";


import AvatarProfile from "@/components/ux/avatarProfile";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select()
    .eq("username", `${params.slug}`);

  if (profileError) {
    console.error(profileError);
    return <div>Error fetching profile</div>;
  }

  const { data: following_id, error: followingError } = await supabase
    .from("follows")
    .select()
    .eq("following_id", `${params.slug}`);

  if (followingError) {
    console.error(followingError);
    return <div>Error fetching following data</div>;
  }

  const { data: follower_id, error: followerError } = await supabase
    .from("follows")
    .select()
    .eq("follower_id", `${params.slug}`);

  if (followerError) {
    console.error(followerError);
    return <div>Error fetching follower data</div>;
  }

  const { data: posts, error: postError } = await supabase
    .from("post")
    .select()
    .eq("user_id", `${params.slug}`);

  if (postError) {
    console.error(postError);
    return <div>Error fetching posts</div>;
  }

  // Create a map of avatars by username
  const avatarMap = profile.reduce((acc, profile) => {
    acc[profile.username] = profile.avatar;
    return acc;
  }, {});

  return (
    <main>
      {profile?.map(({ id, name, username, bio, avatar, isValid }: any) => (
        <div key={id} className={`mb-5`}>
          <section className={cn(`w-full flex justify-between items-center`)}>
            <div className={`w-full px-16 flex justify-between items-center`}>
              <div className={`text-center`}>
                <p className={`text-xl font-normal`}>{posts?.length}</p>
                <p className={`text-base text-stone-500 font-medium`}>
                  منشورات
                </p>
              </div>
              <div className={`text-center`}>
                <p className={`text-xl font-normal`}>{follower_id?.length}</p>
                <p className={`text-base text-stone-500 font-medium`}>يتابع</p>
              </div>
              <div className={`text-center`}>
                <p className={`text-xl font-normal`}>{following_id?.length}</p>
                <p className={`text-base text-stone-500 font-medium`}>متابع</p>
              </div>
            </div>
            <div className={`relative`}>
              <AvatarProfile imageName={avatar} CN={username.slice(0, 2)} />
            </div>
          </section>
          <section className={cn(`w-full mt-2 text-right`)}>
            <h2
              className={`text-3xl font-medium flex justify-end items-center gap-2`}
            >
              {isValid === true ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : null}
              {name}
            </h2>
            <h2 className={`text-sm font-normal`}>@{username}</h2>
            <h2 className={`text-sm font-normal my-3`}>{bio}</h2>
          </section>
          <section
            className={cn(
              `w-full my-3 text-right flex justify-center items-center gap-3`
            )}
          >
            <Button
              variant={"outline"}
              size={"default"}
              className={`text-base font-normal w-auto bg-stone-800 border-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
            </Button>
            <Button
              variant={"outline"}
              size={"default"}
              className={`text-base font-normal w-full border-white text-stone-800 border-none`}
            >
              متابعة
            </Button>
          </section>
          <section
            className={cn(
              `w-full my-3 text-right flex justify-center items-center gap-3`
            )}
          >
            <Tabs defaultValue="manshorat" className="w-full">
              <TabsList className={`w-full bg-stone-800 gap-5 text-white`}>
                <TabsTrigger value="clips" className={`w-full`}>
                  clap
                </TabsTrigger>
                <TabsTrigger value="reply" className={`w-full`}>
                  ردود
                </TabsTrigger>
                <TabsTrigger value="manshorat" className={`w-full`}>
                  منشورات
                </TabsTrigger>
              </TabsList>
              <TabsContent value="manshorat">
                <section
                  className={cn(
                    `w-full mt-2 text-left flex-col flex justify-center items-center gap-2`
                  )}
                >
                  {posts?.map(
                    ({
                      id,
                      created_at,
                      update_at,
                      user_id,
                      content,
                      photo_urls,
                      published,
                      poll_options,
                      poll_votes,
                      avatar_id,
                      risk,
                    }: any) => (
                      <div key={id} className="w-full h-full">
                        <Card
                          pollOptions={poll_options}
                          id={id}
                          created={created_at}
                          id_user={user_id}
                          contents={content}
                          photos={photo_urls}
                          publish={published}
                          avatar={avatarMap[user_id]} // Adding avatar to the Card component
                        />
                      </div>
                    )
                  )}
                </section>
              </TabsContent>
              <TabsContent value="clips">
                Change your password here.
              </TabsContent>
              <TabsContent value="reply">
                Change your password here.
              </TabsContent>
            </Tabs>
          </section>
        </div>
      ))}
    </main>
  );
}

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";

import AvatarProfile from "@/components/ux/avatarProfile";
import FollowBTN from "./followBTN";
import Card from "./card";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`*, posts (*)`)
    .eq("username", `${params.slug}`)
    .single();

  const { data: follow } = await supabase
    .from("follows")
    .select(`*`)
    .eq("following_id", `${profile?.id}`);

  if (!profile?.id) {
    return <div className="ss">لا يوجد ملف شخصي بهذا الاسم</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error fetching profile</div>;
  }

  return (
    <main className="p-2">
      <div className={`mb-5`}>
        <section className={cn(`w-full flex justify-between items-start`)}>
          <div
            className={cn(`w-full mt-2 text-left flex justify-start flex-col`)}
          >
            <h2
              className={`text-3xl font-medium flex justify-start items-start gap-2`}
            >
              {profile?.full_name}
              {profile?.isValid === true ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : null}
            </h2>
            <h2 className={`text-sm font-normal`}>@{profile?.username}</h2>
          </div>
          <div className={`relative`}>
            <AvatarProfile
              imageName={profile.avatar_url}
              CN={profile?.username.slice(0, 2)}
            />
          </div>
        </section>
        <section className={cn(`w-full my-2 text-right`)}>
          <h2 className={`text-sm font-normal my-3`}>{profile?.bio}</h2>
        </section>
        <section
          className={cn(
            `w-full my-3 text-right flex justify-center items-center gap-3`
          )}
        >
          <FollowBTN username={profile?.id} initialLength={follow?.length} />
        </section>
        <section
          className={cn(
            `w-full my-3 text-right flex justify-center items-center gap-3`
          )}
        >
          <Tabs defaultValue="manshorat" className="w-full">
            <TabsList
              className={`w-full bg-stone-500/0 border-spacing-4 border-b-2 border-stone-800 rounded-none gap-5 text-white pb-5`}
            >
              <TabsTrigger
                value="clips"
                className={`w-full bg-white/0 focus-visible:bg-stone-500`}
              >
                clap
              </TabsTrigger>
              <TabsTrigger value="reply" className={`w-full`}>
                ردود
              </TabsTrigger>
              <TabsTrigger
                value="manshorat"
                className={`w-full visited:bg-black`}
                aria-setsize={20}
              >
                منشورات
              </TabsTrigger>
            </TabsList>
            <TabsContent value="manshorat">
              <section
                className={cn(
                  `w-full mt-2 text-left flex-col flex justify-center items-center gap-2`
                )}
              >
                {profile?.posts == 0 && `لا يوجد منشورات`}
                {profile?.posts?.map(
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
                    username,
                  }: any) => (
                    <div key={id} className="w-full h-full first:border-none">
                      <Card
                        pollOptions={poll_options}
                        id={id}
                        created={created_at}
                        id_user={profile?.username}
                        contents={content}
                        photos={photo_urls}
                        publish={published}
                        avatar={profile?.avatar_url}
                      />
                    </div>
                  )
                )}
              </section>
            </TabsContent>
            <TabsContent value="clips">clips........</TabsContent>
            <TabsContent value="reply">reply........</TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
}

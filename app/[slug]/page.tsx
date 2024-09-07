import { Button } from "@/components/ui/button";
import Card from "@/components/ux/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";

import AvatarProfile from "@/components/ux/avatarProfile";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*, posts (*)")
    .eq("username", `${params.slug}`)
    .single();

  if (error) {
    console.error(error);
    return <div>Error fetching profile</div>;
  }

  return (
    <main>
      <div className={`mb-5`}>
        <section className={cn(`w-full flex justify-between items-center`)}>
          <div
            className={`w-full px-20 max-md:px-10 max-sm:gap-5 flex justify-between items-center`}
          >
            <div className={`text-center`}>
              <p className={`text-xl font-normal`}>{profile?.posts?.length}</p>
              <p className={`text-base text-stone-500 font-medium`}>منشورات</p>
            </div>
            <div className={`text-center`}>
              <p className={`text-xl font-normal`}>
                {profile?.follower_id?.length}
              </p>
              <p className={`text-base text-stone-500 font-medium`}>يتابع</p>
            </div>
            <div className={`text-center`}>
              <p className={`text-xl font-normal`}>
                {profile?.following_id?.length}
              </p>
              <p className={`text-base text-stone-500 font-medium`}>متابع</p>
            </div>
          </div>
          <div className={`relative`}>
            <AvatarProfile
              imageName={profile.avatar_url}
              CN={profile?.username.slice(0, 2)}
            />
          </div>
        </section>
        <section className={cn(`w-full mt-2 text-right`)}>
          <h2
            className={`text-3xl font-medium flex justify-end items-center gap-2`}
          >
            {profile?.isValid === true ? (
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
            {profile?.full_name}
          </h2>
          <h2 className={`text-sm font-normal`}>@{profile?.username}</h2>
          <h2 className={`text-sm font-normal my-3`}>{profile?.bio}</h2>
        </section>
        <section
          className={cn(
            `w-full my-5 text-right flex justify-center items-center gap-3`
          )}
        >
          <Button
            variant={"outline"}
            size={"sm"}
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
                    <div key={id} className="w-full h-full">
                      <Card
                        pollOptions={poll_options}
                        id={id}
                        created={created_at}
                        id_user={profile?.username}
                        contents={content}
                        photos={photo_urls}
                        publish={published}
                        avatar={profile?.avatar_url} // Adding avatar to the Card component
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

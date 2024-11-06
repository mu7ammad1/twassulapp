import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import New from "@/components/ux/new";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"; // استدعاء Dialog
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon, Ellipsis, List, LucideGitCommitVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SaveBTN from "@/components/ux/SaveBTN";
import { Button } from "@/components/ui/button";
import ImageDisplayView from "@/components/ux/imageDisplayView";
import Back from "./Back";

const Card = dynamic(() => import("@/components/ux/card"), {
  ssr: true,
});

export default async function Page({ params }: { params: { post: string } }) {
  const supabase = createClient();

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select(
      "*, profiles(id,username, avatar_url,isValid,full_name,bio),like (*)"
    )

    .eq("id", `${params.post}`)
    .single();

  if (postError) {
    console.error(postError);
    return <div>Error fetching posts</div>;
  }
  const timeAgo = formatDistanceToNow(parseISO(post.created_at), {
    addSuffix: true,
  });

  return (
    <main className={`p-2`}>
      <div className={`flex justify-between items-center w-full `}>
        <Ellipsis size={12} />
        <Link href={`/${post.profiles.username}/${post.id}`}>المنشور</Link>
        <Back />
      </div>
      <section className={cn(`w-full my-3 text-left flex gap-3 flex-col`)}>
        <div className="w-full h-full">
          <div className={cn(`w-full py-2`)}>
            <main className="w-full">
              <section className={"w-full border-none shadow-none"}>
                <div className={`flex items-center`}>
                  <div className={`flex `}>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className={`flex`}>
                          <Avatar className="size-7 p-0">
                            <AvatarImage src={post.profiles?.avatar_url} />
                            <AvatarFallback>VC</AvatarFallback>
                          </Avatar>
                          {post?.profiles.Valid === true ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-5 -translate-x-3 translate-y-4 rounded-full bg-stone-900 z-10"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-5 -translate-x-3 translate-y-4 rounded-full fill-white/0"
                            ></svg>
                          )}
                        </div>
                      </HoverCardTrigger>

                      <HoverCardContent className="w-80 rounded-3xl bg-stone-900 border-stone-800 text-white">
                        <div className="flex justify-start space-x-4">
                          <Avatar>
                            <AvatarImage src={post.profiles?.avatar_url} />
                            <AvatarFallback>VC</AvatarFallback>
                          </Avatar>
                          <div className="">
                            <h4 className="text-xs font-semibold">
                              {post.profiles.full_name}
                            </h4>
                            <p className="text-sm">{post.profiles.bio}</p>
                            <div className="flex items-center pt-2">
                              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                              <span className="text-xs text-muted-foreground">
                                Joined December 2021
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <Link
                    href={`/${post.profiles.username}`.toLowerCase()}
                    className={`text-base lowercase -translate-x-2`}
                  >
                    <p>@{post.profiles.username}</p>
                  </Link>
                  <span className={`text-xs text-stone-500`}>{timeAgo}</span>
                </div>
              </section>

              <section className={`pt-2`}>
                <p
                  className="text-sm font-light text-right"
                  dir="auto"
                >
                  {post.content}
                </p>
                <div>
                  {post.poll_options && post.poll_options.length > 0 && (
                    <div>
                      {post.poll_options.map((option: any, index: number) => (
                        <Button
                          key={index}
                          variant={"outline"}
                          size={"default"}
                          className={`bg-stone-500/0 focus-within:bg-emerald-500 focus-within:border-emerald-500 w-full my-1 rounded-full`}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                <div className={"flex flex-col justify-center my-2"}>
                  <Carousel_Images post={post} />
                </div>
              </section>

              <section className={`flex justify-between items-center`}>
                <div className={`flex gap-3`}>
                  <div className={`flex gap-2 items-center justify-center`}>
                    <SaveBTN
                      post_id={post.id}
                      likes={post.likes}
                      userID={post.profiles.id}
                    />
                  </div>
                 
                </div>
                <div>
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
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                    />
                  </svg>
                </div>
              </section>
            </main>
          </div>
        </div>
        <h1 className={`flex text-xs text-left`}>14 Comments</h1>
        <div className={`w-full flex justify-center gap-3`}>
          <New />
        </div>
      </section>
    </main>
  );
}

function Carousel_Images({ post }: any) {
  return (
    <Carousel className="basis-full ">
      <CarouselContent className="w-full h-full z-50">
        {post?.photo_urls?.map((id: string) => (
          <CarouselItem key={id} className="basis-auto">
            <Dialog>
              <DialogTrigger asChild>
                <ImageDisplayView imageName={id} />
              </DialogTrigger>
              <DialogContent
                aria-labelledby="dialog-images"
                className="max-w-full max-h-full bg-black/30 backdrop-blur-3xl h-full w-full border-none flex flex-col justify-around items-center"
              >
                <Carousel className="w-auto h-auto flex justify-center items-center">
                  <CarouselContent className="w-auto h-auto">
                    {post?.photo_urls?.map((photoId: string, id: string) => (
                      <CarouselItem
                        key={id}
                        className="w-full h-full max-w-full max-h-full flex justify-center items-center"
                      >
                        <img
                          key={photoId}
                          src={photoId}
                          alt={`Image ${id}`}
                          loading="eager"
                          className="h-full w-full max-w-full max-h-[80vh] object-contain rounded-3xl"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div
                  className={`flex justify-center items-end gap-5 h-16 w-full`}
                >
                  <div
                    className={`flex justify-center items-center gap-5 bg-stone-800 pr-3 pl-3 py-3 rounded-full`}
                  >
                    <Avatar>
                      <AvatarImage src={post.profiles?.avatar_url} />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="destructive"
                      size={"icon"}
                      className="rounded-full"
                    >
                      <LucideGitCommitVertical absoluteStrokeWidth size={32} />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import ImageDisplayView from "./imageDisplayView";
import Avatar_card_profile from "./avatar_card_profile";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // استدعاء Dialog

const Contents = dynamic(() => import("./LinkA"), {
  ssr: true,
});

const SaveBTN = dynamic(() => import("./SaveBTN"), {
  ssr: true,
});

export default function Card({
  id,
  created,
  id_user,
  username_user,
  contents,
  photos,
  Valid,
  pollOptions,
  avatar,
  likes,
}: any) {
  // حساب الفارق الزمني باستخدام date-fns
  const timeAgo = formatDistanceToNow(parseISO(created), { addSuffix: true });

  return (
    <div
      className={cn(`w-full bg-stone-950 border-b border-stone-800 p-2 py-5`)}
    >
      <div className={"w-full border-none shadow-none flex justify-between"}>
        <div className={`flex items-center`}>
          <div className={`flex`}>
            <Avatar_card_profile imageName={avatar} />
            {Valid === true ? (
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
          <Link
            href={`/${username_user}`.toLowerCase()}
            className={`text-base lowercase -translate-x-2`}
          >
            <p>@{username_user}</p>
          </Link>
          <span className={`text-xs text-stone-500`}>{timeAgo}</span>
        </div>
        <div className={`flex justify-center items-center gap-2`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5 p-0 m-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </div>
      </div>

      <section className={`grid grid-cols-[0px_minmax(100%,_1fr)_100px]`}>
        <div
          className={`w-[1.3px] h-[100%] translate-x-1 bg-stone-700 relative left-3.5 mt-3 flex justify-center items-end`}
        ></div>
        <section className={``}>
          <section className={`py-3 pt-3`}>
            <Contents params={contents} />
            <div className={"flex flex-col justify-center my-2"}>
              <div>
                {pollOptions && pollOptions.length > 0 && (
                  <div>
                    {pollOptions.map((option: any, index: number) => (
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

              <Carousel className={`basis-full`}>
                <CarouselContent className={`basis-full max-h-96 pl-14`}>
                  {photos?.map((id: any) => (
                    <CarouselItem key={id} className={`basis-auto p-1`}>
                      <Dialog>
                        <DialogTrigger asChild className="first:bg-stone-900">
                          <ImageDisplayView imageName={id} />
                        </DialogTrigger>
                        <DialogContent className="w-full h-full p-0 max-w-full max-h-full bg-white/7 backdrop-blur-3xl border-none *:*:bg-white *:*:rounded-xl">
                          <img
                            src={id}
                            alt="Full size image"
                            className="w-full h-full max-h-dvh p-5 object-contain rounded-3xl"
                          />
                        </DialogContent>
                      </Dialog>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </section>

          <section className={`py-0 pl-12 flex justify-between items-center`}>
            <div className={`flex gap-3`}>
              <div className={`flex gap-2 items-center justify-center`}>
                <SaveBTN post_id={id} likes={likes} userID={id_user} />
              </div>
              <Dialog>
                <DialogTrigger asChild className="first:bg-stone-900">
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
                </DialogTrigger>
                <DialogContent className="w-2/3 h-full max-w-full max-h-full bg-white/0 border-none *:bg-white *:border-blue-900 *:border *:*:p-5 *:rounded-xl">
                 <div className="w-full h-full p-5">pp</div>
                </DialogContent>
              </Dialog>
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
        </section>
      </section>
    </div>
  );
}

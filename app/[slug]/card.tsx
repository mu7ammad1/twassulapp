import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { formatDistanceToNow, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

import dynamic from "next/dynamic";
import Avatar_card_profile from "@/components/ux/avatar_card_profile";
import LinkA from "@/components/ux/LinkA";
import { Button } from "@/components/ui/button";
import ImageDisplayView from "@/components/ux/imageDisplayView";
import SaveBTN from "@/components/ux/SaveBTN";
import Menucard from "./menucard";

export default function Card({
  id,
  created,
  id_user,
  contents,
  photos,
  Valid,
  pollOptions,
  avatar,
  likes,
}: any) {
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
            href={`/${id_user}`.toLowerCase()}
            className={`text-base lowercase -translate-x-2`}
          >
            <p>@{id_user}</p>
          </Link>
          <span className={`text-xs text-stone-500`}>{timeAgo}</span>
        </div>
        <div className={`flex justify-center items-center gap-2`}>
        <Menucard />
        </div>
      </div>
      <div className={`py-2 pt-3`}>
        <LinkA params={contents} />
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
          <Carousel className={`basis-full `}>
            <CarouselContent className={`basis-full max-h-80`}>
              {photos?.map((id: any) => (
                <CarouselItem key={id} className={`basis-auto`}>
                  <ImageDisplayView imageName={id} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className={`py-0 flex justify-between items-center`}>
        <div className={`flex gap-3`}>
          <div className={`flex gap-2`}>
            <SaveBTN post_id={id} likes={likes} />
          </div>
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
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:fill-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

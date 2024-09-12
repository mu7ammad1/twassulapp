"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import Favicon from "@/public/favicon.ico";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Menu() {
  const pathname = usePathname();
  const profile = (
    <Link href={`/profile`}>
      <Button
        variant="outline"
        size={"default"}
        className={`border-none rounded-full shadow-none text-lg py-7 bg-white/0 hover:bg-yellow-50/0`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={`${pathname === "/profile" ? `none` : `none`}`}
          stroke={`${pathname === "/profile" ? `white` : `gray`}`}
          strokeWidth={1.8}
          x="0px"
          y="0px"
          width="32"
          height="32"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </Button>
    </Link>
  );
  return (
    <div
      className={`md:px-5 fixed bottom-0 left-0 md:w-auto w-full md:h-full flex flex-col justify-around items-center max-md:bg-stone-950`}
    >
      <Link href={`/`} className="max-md:hidden">
        <Image src={Favicon} alt="favicon" />
      </Link>
      <div
        className={`w-full flex flex-col max-md:flex-row justify-around items-center gap-3`}
      >
        <Link href={`/`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg py-7 bg-white/0 hover:bg-yellow-50/0`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill={`${pathname === "/" ? `white` : `none`}`}
              stroke={`${pathname === "/" ? `white` : `gray`}`}
              strokeWidth={`3`}
            >
              <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"></path>
            </svg>
          </Button>
        </Link>
        <Link href={`/search`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg py-7 bg-white/0 hover:bg-yellow-50/0`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              x="0px"
              y="0px"
              width="32"
              height="32"
              fill={`none`}
              stroke={`${pathname === "/search" ? `white` : `gray`}`}
              strokeWidth={`2`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>
        </Link>
        <Link href={`/chat`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg py-7 bg-white/0 hover:bg-yellow-50/0`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={`${pathname === "/chat" ? `white` : `none`}`}
              stroke={`${pathname === "/chat" ? `white` : `gray`}`}
              strokeWidth={`2`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
          </Button>
        </Link>
        <Link href={`/notifications`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg py-7 bg-white/0 hover:bg-yellow-50/0`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill={`${pathname === "/notifications" ? `white` : `none`}`}
              stroke={`${pathname === "/notifications" ? `white` : `gray`}`}
              strokeWidth={`2`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </Button>
        </Link>
        <span className={`md:hidden`}>{profile}</span>
      </div>
      <div
        className={`w-full flex flex-col max-md:flex-row justify-center items-center max-md:hidden`}
      >
        <Link href={`/`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg py-7 hover:bg-white ${
              pathname === "/" ? "bg-white text-stone-800" : "bg-stone-800"
            }`}
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
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Button>
        </Link>
        {profile}
      </div>
    </div>
  );
}

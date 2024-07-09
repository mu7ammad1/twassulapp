"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default async function Menu() {
  const pathname = usePathname();

  return (
    <div
      className={`px-5 max-sm:w-full max-lg:px-0 max-lg:w-3/4 flex flex-col max-lg:flex-row  w-full sticky top-3 max-lg:justify-center max-lg:flex max-lg:items-center`}
    >
      <div
        className={`max-lg:*:w-full max-lg:w-full max-lg:mr-5 flex flex-col max-lg:flex-row max-lg:justify-center max-lg:items-center max-lg:*:*:w-full max-lg:*:*:rounded-none *:*:max-lg:my-0`}
      >
        <Link href={`/`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg my-1 py-6 hover:bg-white ${
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
        <Link href={`/search`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg my-1 py-6 hover:bg-white ${
              pathname === "/search"
                ? "bg-white text-stone-800"
                : "bg-stone-800"
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>
        </Link>
        <Link href={`/chat`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg my-1 py-6 hover:bg-white ${
              pathname === "/chat" ? "bg-white text-stone-800" : "bg-stone-800"
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
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
          </Button>
        </Link>
        <Link href={`/notifications`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg my-1 py-6 hover:bg-white ${
              pathname === "/notifications"
                ? "bg-white text-stone-800"
                : "bg-stone-800"
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
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>
          </Button>
        </Link>
        <Link href={`/new`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg my-1 py-6 hover:bg-white ${
              pathname === `/new` ? "bg-white text-stone-800" : "bg-stone-800"
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
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Button>
        </Link>
        <Link href={`/profile`}>
          <Button
            variant="outline"
            size={"default"}
            className={`border-none rounded-full shadow-none text-lg my-1 py-6 hover:bg-white ${
              pathname === `/profile`
                ? "bg-white text-stone-800"
                : "bg-stone-800"
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
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Avatar_card_profile from "./avatar_card_profile";

import { createClient } from "@/utils/supabase/server";
import InputSearch from "./inputSearch";

export default async function Search() {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .limit(20);

  return (
    <div className={`w-full bg-stone-950 sticky top-3`}>
      <div className={`w-full mt-1`}>
        <InputSearch />
        {profile?.map(({ id, username, isValid, avatar_url, bio }) => (
          <div key={id} className={`mb-1 text-white`}>
            <div
              className={
                "w-full border-none shadow-none rounded-lg my-1 bg-stone-900 p-2 flex justify-between"
              }
            >
              <div>
                <div className={`flex items-center gap-2`}>
                  <Avatar_card_profile imageName={avatar_url} />
                  <Link
                    href={`/${username}`.toLowerCase()}
                    className={`text-base lowercase`}
                  >
                    @{username}
                  </Link>
                  {isValid === true ? (
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
                </div>
                <div className="ml-10 mr-5">
                  <p className="line-clamp-1">{bio}</p>
                </div>
              </div>
              <Button
                variant={"outline"}
                size={"icon"}
                className={`shadow-none hover:bg-white bg-stone-800 rounded-full border-none`}
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
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { SubmitButton } from "@/app/login/submit-button";

export default function SaveBTN({ post_id, user_liked, user }: any) {
  const [isLiked, setIsLiked] = useState(user_liked);

  const supabase = createClient();




  const handleLiked = async () => {
    const { error, status } = await supabase
      .from("likes")
      .insert({ post_id: post_id, user_id: user });

    if (!error) {
      setIsLiked(true);
    }
    if (status) {
      console.log(status);

    }
  }


  const handleDeleteLiked = async () => {
    // إلغاء الإعجاب
    const { error, status } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", post_id)
      .eq("user_id", user);
    console.log(status);

    if (!error) {
      setIsLiked(false);
    }

  }


  return (
    <form className={`flex gap-2 items-center justify-center`}>
      <SubmitButton
        formAction={!isLiked ? handleLiked : handleDeleteLiked}
        pendingText={
          <span className="p-2 hover:bg-stone-800 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isLiked ? "red" : "none"} // يتغير اللون إلى الأحمر عند الإعجاب
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={isLiked ? "red" : "currentColor"} // يتغير لون الخط إلى الأحمر عند الإعجاب
              className="w-6 h-6 hover:fill-teal-500 hover:stroke-teal-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </span>
        }
        className="flex items-center gap-1"
      >
        <span className="p-2 hover:bg-stone-800 *:hover:text-red-500 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "red" : "none"} // يتغير اللون إلى الأحمر عند الإعجاب
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={isLiked ? "red" : "currentColor"} // يتغير لون الخط إلى الأحمر عند الإعجاب
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </span>
      </SubmitButton>
    </form>
  );
}


































// follows = id,following_id,follower_id
// reply = id,created_at,user_id,post_id
// likes = id,created_at,user_id,post_id
// comments = id,created_at,user_id,content,photo_urls,poll_options,poll_votes,post_id
// profiles = id,update_at,username,full_name,avatar_url,bio,isValid,links
// posts = id,created_at,user_id,content,photo_urls,published,poll_options,poll_votes,retch: '5000'::numeric














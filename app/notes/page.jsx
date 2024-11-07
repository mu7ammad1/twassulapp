"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    // Fetch initial posts
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("views_posts")
        .select(
          "*, profiles(id,username, avatar_url,isValid,full_name,bio),like (*)"
        );
      if (error) console.error("Error fetching posts:", error);
      else setPosts(data);
    };

    fetchPosts();

    // Set up real-time subscription using the `channel` API
    const channel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          setPosts((prevPosts) => [payload.new, ...prevPosts]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts" },
        (payload) => {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === payload.new.id ? payload.new : post
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts" },
        (payload) => {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    // Cleanup on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      <h1>Real-time Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;

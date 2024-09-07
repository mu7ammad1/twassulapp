import { SubmitButton } from "@/app/login/submit-button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SaveBTN({ username, link }: any) {
  const supabase = createClient();

  const Insert = async (formData: FormData) => {
    "use server";

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/login");
    }

    const { data, error } = await supabase
      .from("love")
      .insert([{ username: username, link: link }])
      .select();
  };

  const { data: love } = await supabase.from("love").select().eq(`link`, link);

  const { data: IsUsername } = await supabase
    .from("love")
    .select("*")
    .eq(`username`, `username1`);

  return (
    <form className={`flex gap-2`}>
      <SubmitButton formAction={Insert} pendingText={`loading..`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 hover:fill-rose-500 hover:stroke-rose-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </SubmitButton>
      <main>
        <div className={`w-full`}>{love?.length}</div>
        {IsUsername?.map(({ id, username }: any) => (
          <div>{username === `username2` ? `1` : `0`}</div>
        ))}
      </main>
    </form>
  );
}

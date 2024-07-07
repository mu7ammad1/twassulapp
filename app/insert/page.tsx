import { createClient } from "@/utils/supabase/server";
import { SubmitButton } from "./submit-button";

export default function SaveBTN({ username, link }: any) {
  const Insert = async (formData: FormData) => {
    "use server";

    const supabase = createClient();

    const { data, error } = await supabase
      .from("save")
      .insert([{ username: username, link: link }])
      .select();
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-white">
        <SubmitButton
          formAction={Insert}
          className="bg-rose-700 rounded-md px-4 py-2 text-white mb-2"
          pendingText="Signing In..."
        >
          save
        </SubmitButton>
      </form>
    </div>
  );
}

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SignInComponent from "./sign";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect(`/`);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full px-8 gap-2 lg:max-w-lg">
      <h1 className="text-xl my-3">انشاء حساب</h1>
      <SignInComponent
        searchParams={{
          message: searchParams.message,
        }}
      />
    </div>
  );
}

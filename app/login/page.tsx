import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import SignInComponent from "./sign";
import LoginComponent from "./login";

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
    <div className="flex flex-col justify-center items-center w-full px-8 gap-2 lg:max-w-md">
      <LoginComponent
        searchParams={{
          message: searchParams.message,
        }}
      />
      <br />
      <SignInComponent
        searchParams={{
          message: searchParams.message,
        }}
      />
    </div>
  );
}

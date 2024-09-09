import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Input } from "@/components/ui/input";

export default async function LoginComponent({
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

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  return (
    <form className="flex-1 flex flex-col w-full justify-center items-center gap-4 my-5 *:w-full">
      <Input
        className="rounded-xl px-4 py-5 bg-inherit border"
        name="email"
        placeholder="you@example.com"
        required
        dir="rtl"
      />
      <Input
        className="rounded-xl px-4 py-5 bg-inherit border"
        type="password"
        name="password"
        placeholder="••••••••"
        required
        dir="rtl"
      />
      <SubmitButton
        formAction={signIn}
        className="border bg-white rounded-xl px-0 py-3 text-foreground hover:bg-white/95"
        pendingText="Signing In..."
      >
        Sign In
      </SubmitButton>
      {searchParams?.message && (
        <p className="mt-4 p-4 text-white bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}

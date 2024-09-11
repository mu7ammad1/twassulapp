import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Input } from "@/components/ui/input";

export default async function SignInComponent({
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

  const signUp = async (formData: FormData) => {
    "use server";

    const avatar_url = `https://slcxhoelsccxiuwegpom.supabase.co/storage/v1/object/sign/avatars/avatar/default?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2F2YXRhci9kZWZhdWx0IiwiaWF0IjoxNzI0ODQ0OTU1LCJleHAiOjQ4Nzg0NDQ5NTV9.73Uruf5P_s2IzUbF9UTfNeFo_zPHiHl6mfK2Kb5RJLU&t=2024-08-28T11%3A36%3A04.575Z`;

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;
    const full_name = formData.get("full_name") as string;

    const supabase = createClient();

    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (signUpError) {
      return redirect("/login?message=Could not authenticate user");
    }

    const { data, error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: user.user?.id,
        username: username,
        full_name: full_name,
        avatar_url: avatar_url,
      })
      .select();

    if (profileError) {
      console.error("Profile creation error:", profileError);
    } else {
      console.log("Profile created:", data);
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <form className="flex-1 flex flex-col w-full justify-center items-center gap-4 my-5 *:w-full *:text-lg">
      <Input
        className="rounded-xl bg-inherit border py-7 px-4"
        name="full_name"
        placeholder="اسم بالكامل"
        required
        dir="rtl"
      />
      <Input
        className="rounded-xl bg-inherit border py-7 px-4"
        name="email"
        placeholder="you@example.com"
        required
        dir="rtl"
      />
      <Input
        className="rounded-xl bg-inherit border py-7 px-4"
        type="password"
        name="password"
        placeholder="••••••••"
        required
        dir="rtl"
      />
      <Input
        className="rounded-xl bg-inherit border py-7 px-4"
        name="username"
        placeholder="username"
        required
        dir="rtl"
      />
      <SubmitButton
        formAction={signUp}
        className="border bg-white rounded-xl text-foreground p-3 hover:bg-white/80"
        pendingText="Signing Up..."
      >
        Sign Up
      </SubmitButton>
      {searchParams?.message && (
        <p className="mt-4 p-4 text-white bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}

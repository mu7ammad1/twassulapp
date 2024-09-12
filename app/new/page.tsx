import New from "@/components/ux/new";
import { createClient } from "@/utils/supabase/server";

export default async function NewPage() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return <div>userError</div>;
  }
  const { data: profile, error: updatedProfileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (updatedProfileError) {
    console.error("Error fetching updated profile:", updatedProfileError);
    return <div>Error fetching updated profile information</div>;
  }
  return (
    <main>
      <New id={user} profile={profile} />
    </main>
  );
}

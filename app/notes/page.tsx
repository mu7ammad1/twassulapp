import Insert from "@/components/ux/_post/insert";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();

  // استخدم العلاقة واحد إلى واحد
  const { data: save, error } = await supabase
    .from("cities")
    .select(`
      id,
      name,
      countries!countries_id_fkey (
        id,
        name
      )
    `);

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <main>
      <pre>{JSON.stringify(save, null, 2)}</pre>
    </main>
  );
}

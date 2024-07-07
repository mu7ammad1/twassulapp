import { createClient } from "@/utils/supabase/server";

export default async function Insert({ id }: any) {
  const supabase = createClient();
  const { data: save } = await supabase.from("save").select().eq(`link`, id);

  return (
    <main>
      <div className={`w-full`}>{save?.length}</div>
    </main>
  );
}

import { createClient } from "@/utils/supabase/server";

export default function Insert({ id }: any) {
  return (
    <div>
      <Save id={id} />
    </div>
  );
}

export async function Save({ id }: any) {
  const supabase = createClient();
  const { data: save } = await supabase.from("save").select();

  return (
    <main>
      <div className={`w-full`}>
        {save?.length}
        {save?.map(({ username, id, like_post }) => (
          <div key={id} className={`mb-5 text-yellow-500`}>
            <p className={`bg-stone-100 p-3 mb-1 rounded-lg`}>{like_post}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

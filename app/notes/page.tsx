import Insert from "@/components/ux/_post/insert";
import V from "@/components/ux/v";
import Vv from "@/components/ux/vv";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: save } = await supabase.from("save").select()

  return (
    <main>
      <div className={`w-full`}>
        {save?.length}
        {/* {save?.map(({ username, id, like_post }) => (
          <div key={id} className={`mb-5 text-yellow-500`}>
            {id === 3 ? `` : ``}
            <p className={`bg-stone-100 p-3 mb-1 rounded-lg`}>
              {id} === {username} === {like_post}
            </p>
          </div>
        ))} */}
        <Insert />
        {/* <Vv />
        <V imageName='1719955822316_251698' /> */}
      </div>
    </main>
  );
}

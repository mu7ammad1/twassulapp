import dynamic from "next/dynamic";

const New = dynamic(() => import("@/components/ux/new"), {
  ssr: false,
});

export default async function NewPage() {
  return (
    <main>
      <New />
    </main>
  );
}

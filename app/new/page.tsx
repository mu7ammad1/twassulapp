import dynamic from "next/dynamic";

const New = dynamic(() => import("@/components/ux/new"), {
  ssr: true,
});

export default async function NewPage() {
  return (
    <main>
      <New />
    </main>
  );
}

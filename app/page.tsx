import LikeYou from "@/components/view/likeYou";
import ForYou from "@/components/view/forYou";

export default async function Home() {
  return (
    <main className="flex flex-col justify-center max-w-7xl w-full">
      <h1 className="text-xl text-center">For You</h1>
      <ForYou />
      <h1 className="text-xl text-center">Like You</h1>
      <LikeYou />
    </main>
  );
}

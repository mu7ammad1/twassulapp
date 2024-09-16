import { Button } from "@/components/ui/button";

export default function Notifications() {
  return (
    <main>
      <section className="flex justify-center items-center gap-3">
        <Button
          variant={"secondary"}
          className={`bg-secondary-foreground text-white hover:bg-stone-800`}
        >
          Following
        </Button>
        <Button
          variant={"secondary"}
          className={`bg-secondary-foreground text-white hover:bg-stone-800`}
        >
          love
        </Button>
        <Button
          variant={"secondary"}
          className={`bg-secondary-foreground text-white hover:bg-stone-800`}
        >
          other
        </Button>
      </section>
    </main>
  );
}

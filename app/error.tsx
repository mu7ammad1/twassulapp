"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div>
      <p> حدث خطأ، يرجى إعادة المحاولة لاحقًا.</p>
      <Button variant={"secondary"} size={"default"} onClick={() => router.refresh()}>
        اعد المحاولة
      </Button>
    </div>
  );
}

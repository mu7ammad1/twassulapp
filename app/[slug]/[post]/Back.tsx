"use client";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  return (
    <Button variant={"secondary"} size={"icon"} className={`rounded-full border`} type="button" onClick={() => router.back()}>
      <MoveRight size={16} />
    </Button>
  );
}

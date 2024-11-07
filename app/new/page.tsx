import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const New = dynamic(() => import("@/components/ux/new"), {
  ssr: false,
});

export default async function NewPage() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="w-full border-none bg-stone-900">
        <DialogHeader className={`p-0 m-0`}>
          <DialogTitle className="flex justify-between items-center w-full">انشاء منشور جديد</DialogTitle>
          <DialogDescription className="w-full">
            <New />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

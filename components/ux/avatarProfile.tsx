import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

function AvatarProfile({ imageName, CN }: any) {
  return (
    <div className={cn(`-p-1 border-4 border-stone-500 rounded-full`)}>
      <Avatar
        className={cn(
          `w-20 h-20 rounded-full object-cover object-center m-0 border-4 border-white/0 `
        )}
      >
        <AvatarImage src={imageName} />
        <AvatarFallback className={`bg-stone-800`}>{CN}</AvatarFallback>
      </Avatar>
     
    </div>
  );
}

export default AvatarProfile;

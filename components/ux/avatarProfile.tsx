import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

function AvatarProfile({ imageName, CN }: any) {
  return (
    <div className={cn(`-p-1 border-4 border-green-500 rounded-full`)}>
      <Avatar
        className={cn(
          `w-20 max-md:w-16 max-md:h-16 h-20 rounded-full object-cover object-center m-0 border-4 border-white/0 `
        )}
      >
        <AvatarImage className="object-cover" src={imageName} />
        <AvatarFallback className={`bg-stone-800`}>{CN}</AvatarFallback>
      </Avatar>
     
    </div>
  );
}

export default AvatarProfile;

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";


function Avatar_card_profile({ imageName }: any) {

  return (
    <Avatar className={`w-9 h-9 rounded-full p-0 m-0`}>
      <AvatarImage className="rounded-full object-cover w-9 h-9" src={imageName} />
      <AvatarFallback className="bg-stone-800">CN</AvatarFallback>
    </Avatar>
  );
}

export default Avatar_card_profile;

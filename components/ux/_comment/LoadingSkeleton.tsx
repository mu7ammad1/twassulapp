import Spinner from "@/image/Spinner.svg";
import Image from "next/image";

export default function LoadingSkeleton() {
  return (
    <div className="flex justify-center items-center">
      <Image src={Spinner} alt="Spinner" className={`animate-spin w-24 h-24`} />
    </div>
  );
}

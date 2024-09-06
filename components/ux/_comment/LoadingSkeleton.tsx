import Spinner from "@/image/Spinner.svg";
import Image from "next/image";

export default function LoadingSkeleton() {
  return (
    <div className="flex justify-center items-center mt-10">
      <Image src={Spinner} alt="Spinner" className={`animate-spin w-20 h-20`} />
    </div>
  );
}

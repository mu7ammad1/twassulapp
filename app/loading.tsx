import LoadingSkeleton from "@/components/ux/_comment/LoadingSkeleton";
import { Suspense } from "react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <div className={`mt-10`}>
        <LoadingSkeleton size={`5em`} />
      </div>
    </Suspense>
  );
}

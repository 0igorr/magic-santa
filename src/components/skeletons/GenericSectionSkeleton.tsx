import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface GenericSectionSkeletonProps {
  height?: string;
  bgClass?: string;
}

const GenericSectionSkeleton = memo(({ height = "py-16", bgClass = "bg-background" }: GenericSectionSkeletonProps) => {
  return (
    <section className={`${height} ${bgClass} px-4`}>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <Skeleton className={`h-10 w-3/4 mx-auto mb-4 ${bgClass === "bg-secondary" ? "bg-white/10" : ""}`} />
          <Skeleton className={`h-5 w-1/2 mx-auto ${bgClass === "bg-secondary" ? "bg-white/10" : ""}`} />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className={`h-16 w-full rounded-lg ${bgClass === "bg-secondary" ? "bg-white/10" : ""}`} />
          ))}
        </div>
      </div>
    </section>
  );
});

GenericSectionSkeleton.displayName = "GenericSectionSkeleton";

export default GenericSectionSkeleton;

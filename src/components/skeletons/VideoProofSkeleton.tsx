import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const VideoProofSkeleton = memo(() => {
  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-10 md:h-12 w-3/4 mx-auto mb-4" />
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-5 h-5 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-10 w-64 mx-auto rounded-full" />
        </div>

        {/* Carousel skeleton */}
        <div className="relative max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex gap-3 lg:gap-4 justify-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex-none w-[200px] lg:w-[220px] xl:w-[240px]">
                <Skeleton className="rounded-2xl aspect-[9/16] w-full" />
              </div>
            ))}
          </div>
          
          {/* Dots skeleton */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-2 h-2 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

VideoProofSkeleton.displayName = "VideoProofSkeleton";

export default VideoProofSkeleton;

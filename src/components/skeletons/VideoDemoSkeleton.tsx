import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const VideoDemoSkeleton = memo(() => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-secondary">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <Skeleton className="h-4 w-32 mx-auto mb-4 bg-white/10" />
          
          {/* Headline */}
          <Skeleton className="h-10 md:h-12 w-full max-w-lg mx-auto mb-3 bg-white/10" />
          <Skeleton className="h-10 md:h-12 w-3/4 mx-auto mb-6 bg-white/10" />
          
          {/* Description */}
          <Skeleton className="h-5 w-full max-w-xl mx-auto mb-2 bg-white/10" />
          <Skeleton className="h-5 w-5/6 mx-auto mb-2 bg-white/10" />
          <Skeleton className="h-5 w-4/6 mx-auto mb-8 bg-white/10" />
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="p-3 rounded-xl bg-white/5">
                <Skeleton className="w-5 h-5 mx-auto mb-2 rounded bg-white/10" />
                <Skeleton className="h-8 w-16 mx-auto mb-2 bg-white/10" />
                <Skeleton className="h-3 w-20 mx-auto bg-white/10" />
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <Skeleton className="h-14 w-48 mx-auto rounded-full bg-white/10" />
        </div>
      </div>
    </section>
  );
});

VideoDemoSkeleton.displayName = "VideoDemoSkeleton";

export default VideoDemoSkeleton;

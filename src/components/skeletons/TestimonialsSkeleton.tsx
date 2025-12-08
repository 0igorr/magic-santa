import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TestimonialsSkeleton = memo(() => {
  return (
    <section className="py-12 md:py-20 px-4 bg-secondary overflow-hidden">
      <div className="container mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-10 md:mb-16 px-4">
          <Skeleton className="h-10 md:h-12 w-72 mx-auto mb-3 bg-white/10" />
          <Skeleton className="h-6 w-64 mx-auto bg-white/10" />
        </div>

        {/* Testimonials cards skeleton */}
        <div className="flex gap-4 justify-center overflow-hidden">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 md:w-80 p-5 md:p-6 rounded-lg bg-white/10 border border-white/20"
            >
              <div className="flex gap-1 mb-3 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-4 h-4 md:w-5 md:h-5 rounded bg-white/10" />
                ))}
              </div>
              <Skeleton className="h-4 w-full mb-2 bg-white/10" />
              <Skeleton className="h-4 w-5/6 mb-2 bg-white/10" />
              <Skeleton className="h-4 w-4/6 mb-4 bg-white/10" />
              <Skeleton className="h-4 w-24 bg-white/10" />
            </div>
          ))}
        </div>

        {/* Benefits skeleton */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-20 space-y-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex gap-4 items-start">
              <Skeleton className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10" />
              <div className="flex-1">
                <Skeleton className="h-6 w-48 mb-2 bg-white/10" />
                <Skeleton className="h-4 w-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

TestimonialsSkeleton.displayName = "TestimonialsSkeleton";

export default TestimonialsSkeleton;

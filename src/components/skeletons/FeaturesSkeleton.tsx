import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturesSkeleton = memo(() => {
  return (
    <section className="py-12 md:py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <Skeleton className="h-10 md:h-12 w-3/4 max-w-lg mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 max-w-md mx-auto" />
        </div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-6 rounded-xl border border-border bg-card">
              <Skeleton className="w-12 h-12 rounded-lg mb-4" />
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSkeleton.displayName = "FeaturesSkeleton";

export default FeaturesSkeleton;

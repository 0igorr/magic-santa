import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FooterSkeleton = memo(() => {
  return (
    <footer className="bg-secondary py-10 md:py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Column 1 */}
          <div>
            <Skeleton className="h-7 w-48 mb-4 bg-white/10" />
            <Skeleton className="h-4 w-full mb-2 bg-white/10" />
            <Skeleton className="h-4 w-5/6 bg-white/10" />
          </div>
          
          {/* Column 2 */}
          <div>
            <Skeleton className="h-5 w-24 mb-4 bg-white/10" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-36 bg-white/10" />
              ))}
            </div>
          </div>
          
          {/* Column 3 */}
          <div>
            <Skeleton className="h-5 w-20 mb-4 bg-white/10" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-44 bg-white/10" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <Skeleton className="h-4 w-64 mx-auto bg-white/10" />
        </div>
      </div>
    </footer>
  );
});

FooterSkeleton.displayName = "FooterSkeleton";

export default FooterSkeleton;

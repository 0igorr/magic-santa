import { memo } from "react";

// Reduced decorative elements from 20 to 8 for performance
const decorativeStars = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${15 + (i * 10)}%`,
  top: `${10 + (i * 10)}%`,
  fontSize: `${14 + (i % 3) * 4}px`,
}));

const Pricing = memo(() => {
  return (
    <section id="pricing" className="py-12 md:py-20 px-4 bg-secondary relative overflow-hidden">
      {/* Optimized Decorative Stars - reduced count and static positions */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        {decorativeStars.map((star) => (
          <div
            key={star.id}
            className="absolute text-accent"
            style={{
              left: star.left,
              top: star.top,
              fontSize: star.fontSize,
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </section>
  );
});

Pricing.displayName = "Pricing";

export default Pricing;

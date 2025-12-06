import { memo, useEffect, useState, useMemo } from "react";

// Reduced from 18 to 12 snowflakes for better performance
const SNOWFLAKE_COUNT = 12;

const Snowfall = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  // Generate snowflakes only once using useMemo
  const snowflakes = useMemo(
    () =>
      Array.from({ length: SNOWFLAKE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 18,
        size: Math.random() > 0.5 ? "text-xs" : "text-sm",
      })),
    []
  );

  // Delay snowfall render to prioritize LCP (increased to 2.5s)
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={`snowflake absolute text-white opacity-60 ${flake.size}`}
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            willChange: "transform",
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
});

Snowfall.displayName = "Snowfall";

export default Snowfall;

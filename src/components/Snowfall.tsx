import { memo, useEffect, useState, useMemo } from "react";

// Reduced snowflake count for performance
const SNOWFLAKE_COUNT = 10;

const Snowfall = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  // Generate snowflakes only once using useMemo
  const snowflakes = useMemo(
    () =>
      Array.from({ length: SNOWFLAKE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 15 + Math.random() * 15,
        size: Math.random() > 0.6 ? "text-xs" : "text-sm",
      })),
    []
  );

  // Delay snowfall render to prioritize LCP (3 seconds after load)
  useEffect(() => {
    // Use requestIdleCallback for better performance
    const scheduleSnowfall = () => {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
          setIsVisible(true);
        });
      } else {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(scheduleSnowfall, 3000);
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
          className={`snowflake absolute text-white opacity-50 ${flake.size}`}
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
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
import type { CSSProperties } from "react";

const rainDrops = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  left: `${2 + ((index * 9) % 96)}%`,
  top: `${-8 - (index % 12) * 8}%`,
  duration: `${5.4 + (index % 5) * 0.7}s`,
  delay: `${(index % 7) * 0.6}s`,
  opacity: 0.12 + (index % 4) * 0.06,
  size: `${5 + (index % 4) * 3}px`,
}));

function RainParticles() {
  return (
    <div className="site-rain" aria-hidden="true">
      {rainDrops.map((drop) => (
        <span
          key={drop.id}
          className="site-rain__drop"
          style={
            {
              left: drop.left,
              top: drop.top,
              animationDuration: drop.duration,
              animationDelay: drop.delay,
              opacity: drop.opacity,
              width: drop.size,
              height: drop.size,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default RainParticles;

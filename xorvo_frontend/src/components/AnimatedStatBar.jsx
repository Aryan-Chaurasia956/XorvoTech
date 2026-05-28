import { useEffect, useState } from "react";

const AnimatedStatBar = ({
  percentage,
  text,
  isVisible,
  delay = 0,
}) => {
  const [width, setWidth] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      // Animate the width
      setWidth(percentage);

      // Animate the counter
      let startTime;
      let animationFrame;
      const duration = 1500;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * percentage));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, delay);

    return () => clearTimeout(timeout);
  }, [percentage, isVisible, delay]);

  return (
    <div 
      className="space-y-4 transition-all duration-700"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="flex items-baseline gap-3">
        <span className="text-2xl md:text-3xl font-bold text-foreground">
          {count}%
        </span>
        <p className="text-sm md:text-base text-muted-foreground flex-1">
          {text}
        </p>
      </div>
      
      <div className="relative h-3 bg-secondary/30 rounded-full overflow-hidden backdrop-blur-sm border border-border/50">
        {/* Animated Fill */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-accent/80 rounded-full transition-all duration-1500 ease-out"
          style={{ 
            width: `${width}%`,
            transitionDelay: `${delay}ms`
          }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
        
        {/* Animated Border Highlight */}
        <div
          className="absolute top-0 left-0 h-full border-2 border-accent/50 rounded-full transition-all duration-1500 ease-out"
          style={{ 
            width: `${width}%`,
            transitionDelay: `${delay}ms`
          }}
        ></div>
      </div>
    </div>
  );
};

export default AnimatedStatBar;

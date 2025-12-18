import { useEffect, useState } from "react";

const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  isVisible,
  className = "",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isVisible]);

  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </div>
  );
};

export default AnimatedCounter;

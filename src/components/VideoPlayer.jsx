import { useState, useEffect, useRef } from "react";

const VideoPlayer = ({ src, className, poster, ...props }) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    let observer;
    
    if (videoRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "200px", // Start loading 200px before video enters viewport
          threshold: 0.1,
        }
      );

      observer.observe(videoRef.current);
    } else {
      setIsInView(true);
    }

    return () => {
      if (observer && videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={videoRef} className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="text-white">Loading video...</div>
        </div>
      )}
      {isInView && (
        <video
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoadStart={handleLoad}
          controls
          poster={poster}
          preload="metadata"
          {...props}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;

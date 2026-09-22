import { useRef, useState, useEffect } from 'react';

interface SectionVideoProps {
  videoUrl: string;
  className?: string;
  rounded?: string;
  overlayOpacity?: number;
  autoPlay?: boolean;
}

export default function SectionVideo({
  videoUrl,
  className = '',
  rounded = 'rounded-none',
  overlayOpacity = 0,
  autoPlay = true,
}: SectionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setLoaded(false);
    setError(false);

    const handleLoaded = () => setLoaded(true);
    const handleError = () => setError(true);

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('error', handleError);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && autoPlay && !error) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener('loadeddata', handleLoaded);
      video.removeEventListener('error', handleError);
    };
  }, [autoPlay, error, videoUrl]);

  if (error) {
    return <div className={`bg-audaz-black ${rounded} ${className}`} />;
  }

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        loop
        playsInline
        preload="auto"
        autoPlay={autoPlay}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}

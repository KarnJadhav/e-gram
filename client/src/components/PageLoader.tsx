import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PageLoader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      loaderRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out', yoyo: true, repeat: 1 }
    );
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div ref={loaderRef} className="flex flex-col items-center gap-2">
        <svg className="animate-spin" width="48" height="48" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="4" opacity="0.2" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span className="text-blue-700 font-semibold text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default PageLoader;

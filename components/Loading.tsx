'use client';

import { useEffect, useState, useRef } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

export default function Loading() {
  const { resourcesReady, setLoading } = useLoading();
  const [fadeOut, setFadeOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const loadingStartTime = useRef<number>(Date.now());

  useEffect(() => {
    if (resourcesReady) {
      const elapsedTime = Date.now() - loadingStartTime.current;
      const remainingTime = Math.max(0, 2000 - elapsedTime);

      // Wait for minimum 2 seconds before starting fade-out
      setTimeout(() => {
        setFadeOut(true);

        // Wait for fade-out transition (1000ms) to complete before hiding
        setTimeout(() => {
          setIsVisible(false);
          // Only now set isLoading to false, allowing animations to start
          setLoading(false);
        }, 1000);
      }, remainingTime);
    }
  }, [resourcesReady, setLoading]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`loading-overlay fixed inset-0 z-[9999] bg-gradient-to-b from-green-500 to-green-900 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-white/10 blur-3xl animate-pulse" />
        </div>
        <div className="relative animate-pulse">
          <div
            className="text-white drop-shadow-2xl"
            style={{
              animation: 'float 3s ease-in-out infinite',
              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
            }}
          >
            <style jsx>{`
              @keyframes float {
                0%, 100% {
                  transform: translateY(0px) scale(1);
                }
                50% {
                  transform: translateY(-10px) scale(1.02);
                }
              }
            `}</style>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              Agro App
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  resourcesReady: boolean;
  setLoading: (loading: boolean) => void;
  setResourcesReady: (ready: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  resourcesReady: false,
  setLoading: () => {},
  setResourcesReady: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [resourcesReady, setResourcesReady] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Wait for all images to load
      const images = document.querySelectorAll('img');
      const imagePromises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails to load
        });
      });

      Promise.all(imagePromises).then(() => {
        // Small delay to ensure everything is ready
        setTimeout(() => {
          setResourcesReady(true);
        }, 300);
      });
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      resourcesReady,
      setLoading: setIsLoading, 
      setResourcesReady 
    }}>
      {children}
    </LoadingContext.Provider>
  );
}


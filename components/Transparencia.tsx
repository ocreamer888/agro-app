'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useLoading } from '@/contexts/LoadingContext';

const Transparencia = () => {
    const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();

  // Set initial hidden states immediately on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states immediately to prevent flash
      if (bgRef.current) {
        gsap.set(bgRef.current, {
          opacity: 0,
          scale: 1.1,
        });
      }
      
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          opacity: 0,
          y: 50,
          filter: 'blur(10px)',
        });
      }

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, {
          opacity: 0,
          y: 30,
          filter: 'blur(8px)',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Set up intersection observer when loading completes
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Check if element is in viewport with refined threshold
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Professional timeline with refined timing
              const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
              });

              // 1. Background: Smooth fade + scale animation (parallax effect)
              if (bgRef.current) {
                tl.to(bgRef.current, {
                  opacity: 1,
                  scale: 1,
                  duration: 1.2,
                  ease: 'power2.out',
                }, 0); // Start immediately
              }

              // 2. Title: Smooth reveal with blur and slide
              if (titleRef.current) {
                tl.to(titleRef.current, {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  duration: 1,
                  ease: 'expo.out', // Smooth exponential easing
                }, 0.3); // Start 0.3s after background begins
              }

              // 3. Subtitle: Smooth reveal after title
              if (subtitleRef.current) {
                tl.to(subtitleRef.current, {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  duration: 0.9,
                  ease: 'expo.out',
                }, 0.6); // Start 0.6s after background (0.3s after title starts)
              }

              // Prevent re-triggering
              observer.unobserve(entry.target);
            }
          });
        },
        { 
          threshold: 0.15, // Trigger when 15% visible for earlier animation
          rootMargin: '0px 0px -50px 0px', // Start slightly before fully in view
        }
      );

      if (heroRef.current) {
        observer.observe(heroRef.current);
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-4"
    >
      <div 
        ref={containerRef}
        className="relative flex flex-col w-full h-full min-h-[96vh] items-center justify-center p-10 text-center rounded-3xl"
      >
        {/* Background Image with smooth fade and scale animation */}
        <div ref={bgRef} className="absolute inset-0 overflow-hidden">
          <Image
            src="/agro-app-hero-4.png"
            alt="Conecta con agricultores"
            fill
            priority
            quality={100}
            className="object-cover rounded-3xl object-center"
            style={{ willChange: 'transform, opacity' }} // Optimize for animation
          />
          
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-3xl" />
        </div>
        
        {/* Main title with smooth reveal */}
        <div className="relative z-10 text-center max-w-4xl mx-auto pt-4 gap-4">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-balance leading-tight text-white drop-shadow-2xl"
            style={{ willChange: 'transform, opacity, filter' }} // Optimize for animation
          >
            La plataforma más transparente del mercado de la agricultura sostenible en Costa Rica
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-zinc-100 mb-12 max-w-xl mx-auto pt-4 drop-shadow-2xl"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            Un espacio donde hacer trampa es imposible. Transparencia y trazabilidad en todos los procesos, desde la producción hasta la entrega.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Transparencia;
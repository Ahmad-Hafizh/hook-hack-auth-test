"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollColorSectionProps {
  children: React.ReactNode;
  startColor: string;
  endColor: string;
  className?: string;
}

export function ScrollColorSection({
  children,
  startColor,
  endColor,
  className = "",
}: ScrollColorSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState(startColor);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate how much of this section has been scrolled into view
      const visibleFromTop = windowHeight - rect.top;
      const scrollPercentage = (visibleFromTop / sectionHeight) * 100;

      let scrollProgress = 0;

      if (scrollPercentage <= 50) {
        // 0-20% scrolled - stay at start color (white)
        scrollProgress = 0;
      } else if (scrollPercentage >= 55) {
        // 26%+ scrolled - fully at end color
        scrollProgress = 1;
      } else {
        // 20-26% - smooth transition zone
        scrollProgress = (scrollPercentage - 50) / 6;
      }

      // Apply smooth easing
      const easedProgress = smoothStep(scrollProgress);

      // Interpolate between start and end colors
      const interpolatedColor = interpolateColor(startColor, endColor, easedProgress);
      setBackgroundColor(interpolatedColor);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [startColor, endColor]);

  return (
    <div
      ref={sectionRef}
      className={`transition-colors duration-700 ease-in-out ${className}`}
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
}

// Smooth step function
function smoothStep(t: number): number {
  return t * t * (3 - 2 * t);
}

// Helper function to interpolate between two hex colors
function interpolateColor(color1: string, color2: string, factor: number): string {
  const hex1 = color1.replace("#", "");
  const hex2 = color2.replace("#", "");

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

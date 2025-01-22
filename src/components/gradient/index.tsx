'use client';

import { useEffect, useRef } from 'react';
import { Gradient } from './gradient';
import { BackgroundFragment } from './_fragment';

type GradientBackgroundProps = {
  children: React.ReactNode;
  theme: BackgroundFragment;
  speed?: number | null;
};
export function GradientBackground({ children, theme, speed }: GradientBackgroundProps) {
  const gradientRef = useRef<Gradient>(null);

  useEffect(() => {
    const canvas = document.querySelector('#gradient-canvas') as HTMLElement;
    if (canvas) {
      canvas.style.setProperty('--gradient-color-1', theme.color1.hex);
      canvas.style.setProperty('--gradient-color-2', theme.color2.hex);
      canvas.style.setProperty('--gradient-color-3', theme.color3.hex);
      canvas.style.setProperty('--gradient-color-4', theme.color4.hex);
      gradientRef.current?.initGradient('#gradient-canvas');
      if (speed) {
        gradientRef.current?.setSpeed(speed);
      }
    }
  }, [theme, speed]);

  useEffect(() => {
    // Only initialize if we haven't already
    if (!gradientRef.current) {
      // Initialize gradient
      gradientRef.current = new Gradient();
      // Call initGradient with the canvas selector
      const element = document.body;
      gradientRef.current.initGradient('#gradient-canvas');
      if (speed) gradientRef.current.setSpeed(speed);
      element?.classList.add('!opacity-100');
    }

    // Cleanup function
    return () => {
      if (gradientRef.current) {
        gradientRef.current.disconnect();
        gradientRef.current = null;
      }
    };
  }, []);

  return children;
}

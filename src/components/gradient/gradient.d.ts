export class Gradient {
  constructor();
  initGradient(
    selector: string,
    options?: {
      speed?: number;
    }
  ): void;
  disconnect(): void;
  setSpeed(n: number): void;
}

export interface GradientProps {
  // ... existing props ...
  speed?: number; // Speed multiplier for the animation
}

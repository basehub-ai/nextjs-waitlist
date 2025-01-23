'use client'

import { useEffect, useRef } from 'react'
import { Gradient } from './gradient'
import { BackgroundFragment } from './_fragment'

type GradientBackgroundProps = BackgroundFragment & {
  children: React.ReactNode
}
export function GradientBackground({
  children,
  color1,
  color2,
  color3,
  color4,
  speed,
}: GradientBackgroundProps) {
  const gradientRef = useRef<Gradient>(null)

  useEffect(() => {
    const canvas = document.querySelector('#gradient-canvas') as HTMLElement
    if (canvas) {
      canvas.style.setProperty('--gradient-color-1', color1.hex)
      canvas.style.setProperty('--gradient-color-2', color2.hex)
      canvas.style.setProperty('--gradient-color-3', color3.hex)
      canvas.style.setProperty('--gradient-color-4', color4.hex)
      gradientRef.current?.initGradient('#gradient-canvas')
      if (speed) {
        gradientRef.current?.setSpeed(speed)
      }
    }
  }, [color1, color2, color3, color4, speed])

  useEffect(() => {
    // Only initialize if we haven't already
    if (!gradientRef.current) {
      // Initialize gradient
      gradientRef.current = new Gradient()
      // Call initGradient with the canvas selector
      const element = document.body
      gradientRef.current.initGradient('#gradient-canvas')
      if (speed) gradientRef.current.setSpeed(speed)
      element?.classList.add('!opacity-100')
    }

    // Cleanup function
    return () => {
      if (gradientRef.current) {
        gradientRef.current.disconnect()
        gradientRef.current = null
      }
    }
  }, [])

  return children
}

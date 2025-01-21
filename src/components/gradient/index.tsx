'use client'

import { PropsWithChildren, useEffect, useRef } from 'react'

// Import the Gradient class from a separate file to keep code organized
import { Gradient } from './gradient'

export function GradientBackground({ children }: PropsWithChildren) {
    const gradientRef = useRef<Gradient>(null)

    useEffect(() => {
        // Only initialize if we haven't already
        if (!gradientRef.current) {
            // Initialize gradient
            gradientRef.current = new Gradient()

            // Call initGradient with the canvas selector
            const element = document.body;
            gradientRef.current.initGradient('#gradient-canvas')
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

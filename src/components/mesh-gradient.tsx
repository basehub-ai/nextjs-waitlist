'use client'

import { MeshGradient, MeshGradientProps } from '@paper-design/shaders-react'
import { useEffect } from 'react'

export function MeshGradientComponent({ speed, ...props }: MeshGradientProps) {
  useEffect(() => {
    document.body.classList.add('opacity-100')
  }, [])

  return <MeshGradient {...props} speed={speed ? speed / 10 : 0.25} />
}

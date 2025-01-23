import { fragmentOn } from 'basehub'

export const backgroundFragment = fragmentOn('Background', {
  color1: {
    hex: true,
  },
  color2: {
    hex: true,
  },
  color3: {
    hex: true,
  },
  color4: {
    hex: true,
  },
  speed: true,
})

export type BackgroundFragment = fragmentOn.infer<typeof backgroundFragment>

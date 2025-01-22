import { fragmentOn } from 'basehub';

export const backgroundFragment = fragmentOn('Background', {
  gradient1: {
    hex: true,
  },
  gradient2: {
    hex: true,
  },
  gradient3: {
    hex: true,
  },
  gradient4: {
    hex: true,
  },
});

export type BackgroundFragment = fragmentOn.infer<typeof backgroundFragment>;

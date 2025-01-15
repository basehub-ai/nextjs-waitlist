import { Pump } from 'basehub/react-pump';
import { fragmentOn } from 'basehub';
import colors from 'tailwindcss/colors';

export const themeFragment = fragmentOn('Theme', { accent: true, grayScale: true });

export type BaseHubTheme = fragmentOn.infer<typeof themeFragment>;

const CONTRAST_WARNING_COLORS: (keyof typeof colors)[] = ['amber', 'cyan', 'green', 'lime', 'yellow'];

export function BaseHubThemeProvider() {
  return (
    <Pump queries={[{ settings: { theme: themeFragment } }]}>
      {async ([data]) => {
        'use server';
        const accent = colors[data.settings.theme.accent];
        const grayScale = colors[data.settings.theme.grayScale];

        const css = Object.entries(accent).map(([key, value]) => {
          const rgb = hexToRgb(value); // (is used in the tailwind.config.ts to add colors with alpha values)

          return `--accent-${key}: ${value}; --accent-rgb-${key}: ${rgb};`;
        });

        Object.entries(grayScale).forEach(([key, value]) => {
          const rgb = hexToRgb(value);

          css.push(`--grayscale-${key}: ${value}; --grayscale-rgb-${key}: ${rgb};`);
        });

        if (CONTRAST_WARNING_COLORS.includes(data.settings.theme.accent)) {
          css.push(`--textOnAccent: ${colors.gray[950]};`);
        }

        return (
          <style>{`
      :root {
        ${css.join('\n')}
      }
      `}</style>
        );
      }}
    </Pump>
  );
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) throw new Error('Invalid hex color');

  return [parseInt(result[1]!, 16), parseInt(result[2]!, 16), parseInt(result[3]!, 16)].join(' ');
}

export const isTailwindColor = (color: string): color is keyof typeof colors => {
  return Object.keys(colors).includes(color);
};

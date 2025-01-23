import clsx from 'clsx'
import { BaseHubImage } from 'basehub/next-image'
import type { ImageProps } from 'next/image'
import { fragmentOn } from 'basehub'

export const darkLightImageFragment = fragmentOn('Logo', {
  dark: {
    url: true,
    alt: true,
    width: true,
    height: true,
    blurDataURL: true,
    aspectRatio: true,
  },
  light: {
    url: true,
    alt: true,
    width: true,
    height: true,
    blurDataURL: true,
  },
})

type DarkLightImageFragment = fragmentOn.infer<typeof darkLightImageFragment>

type DarkLightImageProps = DarkLightImageFragment &
  Omit<ImageProps, 'src' | 'alt'> & {
    alt?: string
    withPlaceholder?: boolean
  }

export function DarkLightImage({
  alt,
  dark,
  light,
  className,
  width,
  height,
  withPlaceholder,
  ...props
}: DarkLightImageProps) {
  return (
    <>
      <BaseHubImage
        alt={dark.alt ?? alt ?? ''}
        className={clsx('hidden dark:block', className)}
        height={height ?? dark.height}
        src={dark.url}
        width={width ?? dark.width}
        {...props}
        {...(withPlaceholder && dark.blurDataURL
          ? {
              placeholder: 'blur',
              blurDataURL: dark.blurDataURL,
            }
          : {})}
      />
      {light ? (
        <BaseHubImage
          alt={light.alt ?? alt ?? ''}
          className={clsx(dark && 'dark:hidden', className)}
          height={height ?? light.height}
          src={light.url}
          width={width ?? light.width}
          {...props}
          {...(withPlaceholder && light.blurDataURL
            ? {
                placeholder: 'blur',
                blurDataURL: light.blurDataURL,
              }
            : {})}
        />
      ) : null}
    </>
  )
}

export function DarkLightImageAutoscale(props: DarkLightImageProps) {
  const [aspectRatioWidth, aspectRatioHeight] = props.dark.aspectRatio
    .split('/')
    .map(Number)
  const aspectRatio = (aspectRatioWidth ?? 0) / (aspectRatioHeight ?? 0)
  let logoStyle

  switch (true) {
    case aspectRatio <= 1.2:
      logoStyle = 'square'
      break
    case aspectRatio < 1.4:
      logoStyle = '4/3'
      break
    case aspectRatio < 4:
      logoStyle = 'portrait'
      break
    default:
      logoStyle = 'landscape'
      break
  }

  return (
    <DarkLightImage
      priority
      alt="logo"
      className={clsx('w-auto max-w-[200px] object-contain', {
        'h-10': logoStyle === 'square',
        'h-9': logoStyle === '4/3',
        'h-8': logoStyle === 'portrait',
        'h-6': logoStyle === 'landscape',
      })}
      style={{
        aspectRatio: props.dark.aspectRatio,
      }}
      {...props}
    />
  )
}

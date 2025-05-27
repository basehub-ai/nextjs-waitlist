import type { MetadataRoute } from 'next'
export const siteHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || 'nextjs-waitlist.basehub.com'
export const siteUrl = `https://${siteHost}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/manifesto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}

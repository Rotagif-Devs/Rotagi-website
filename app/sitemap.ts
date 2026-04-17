import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rotagif.org';

  // Core pages
  const routes = [
    '',
    '/about',
    '/programs',
    '/events',
    '/blog',
    '/partner',
    '/contact',
    '/donate',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}

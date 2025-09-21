import { MetadataRoute } from 'next';
import { getPosts, getCategories, getTags } from '@/lib/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  try {
    // Add blog posts
    const postsResponse = await getPosts({ pageSize: 1000 });
    if (postsResponse?.data) {
      postsResponse.data.forEach((post) => {
        sitemap.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }

    // Add categories
    const categories = await getCategories();
    categories.forEach((category) => {
      sitemap.push({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      });
    });

    // Add tags
    const tags = await getTags();
    tags.forEach((tag) => {
      sitemap.push({
        url: `${baseUrl}/tag/${tag.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.4,
      });
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return sitemap;
}
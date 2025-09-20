import Image from 'next/image';
import Link from 'next/link';
import { StrapiBlogPost, StrapiMedia } from '@/lib/strapi';

interface BlogPostCardProps {
  post: StrapiBlogPost;
}

function getStrapiImageUrl(media: StrapiMedia | undefined): string {
  if (!media) return '';
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${baseUrl}${media.url}`;
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {post.coverImage && (
        <div className="relative h-48 w-full">
          <Image
            src={getStrapiImageUrl(post.coverImage)}
            alt={post.coverImage.alternativeText || post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories?.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md hover:bg-primary/20 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-3 line-clamp-2">
          <Link 
            href={`/blog/${post.slug}`}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {post.author && <span>By {post.author}</span>}
            {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.slug}`}
                  className="text-xs px-2 py-1 bg-muted/20 rounded hover:bg-muted/30 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
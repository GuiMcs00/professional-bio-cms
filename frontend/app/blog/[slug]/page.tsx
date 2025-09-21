import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getPosts, getGlobal, StrapiMedia } from '@/lib/strapi';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Prose } from '@/components/ui/Prose';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const global = await getGlobal();

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const seo = post.seo;
  const siteName = global?.siteName || 'Professional Bio CMS';

  return {
    title: seo?.title || `${post.title} | ${siteName}`,
    description: seo?.description || post.excerpt || `Read ${post.title} on ${siteName}`,
    robots: seo?.noindex ? 'noindex' : 'index,follow',
    alternates: seo?.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    openGraph: {
      title: seo?.title || post.title,
      description: seo?.description || post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: seo?.ogImage ? [getStrapiImageUrl(seo.ogImage)] : 
              post.coverImage ? [getStrapiImageUrl(post.coverImage)] : undefined,
    },
  };
}

export async function generateStaticParams() {
  try {
    const response = await getPosts({ pageSize: 100 });
    if (!response?.data) return [];
    
    return response.data.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <Section className="py-20">
        <Container size="md">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-md hover:bg-primary/20 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <Heading level={1} className="mb-6">
                {post.title}
              </Heading>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
                {post.author && <span>By {post.author}</span>}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                )}
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              )}

              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
                  <Image
                    src={getStrapiImageUrl(post.coverImage)}
                    alt={post.coverImage.alternativeText || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </header>

            {/* Content */}
            <Prose className="mb-12">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Prose>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <footer className="border-t border-border pt-8">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/tag/${tag.slug}`}
                      className="text-sm px-3 py-1 bg-muted/20 rounded-md hover:bg-muted/30 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </footer>
            )}
          </div>
        </Container>
      </Section>
    </article>
  );
}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByTagSlug, getTags, getGlobal } from '@/lib/strapi';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { BlogPostCard } from '@/components/ui/BlogPostCard';
import { Pagination } from '@/components/ui/Pagination';

interface TagPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find(t => t.slug === slug);
  const global = await getGlobal();

  if (!tag) {
    return {
      title: 'Tag Not Found',
    };
  }

  const siteName = global?.siteName || 'Professional Bio CMS';

  return {
    title: `#${tag.name} | ${siteName}`,
    description: `Browse posts tagged with ${tag.name}`,
  };
}

export async function generateStaticParams() {
  try {
    const tags = await getTags();
    return tags.map((tag) => ({
      slug: tag.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const pageSize = 10;

  const tags = await getTags();
  const tag = tags.find(t => t.slug === slug);

  if (!tag) {
    notFound();
  }

  const response = await getPostsByTagSlug(slug, {
    page: currentPage,
    pageSize,
  });

  if (!response || !response.data) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <Heading level={1} className="mb-8">#{tag.name}</Heading>
            <p className="text-muted-foreground">No posts found with this tag.</p>
          </div>
        </Container>
      </Section>
    );
  }

  const posts = response.data;
  const pagination = response.meta?.pagination;

  return (
    <Section className="py-20">
      <Container>
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <Heading level={1} className="mb-4">
              #{tag.name}
            </Heading>
            <p className="text-lg text-muted-foreground">
              Posts tagged with {tag.name}
            </p>
          </header>
          
          {posts.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground">No posts published with this tag yet.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
              
              {pagination && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pageCount}
                  basePath={`/tag/${slug}`}
                />
              )}
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
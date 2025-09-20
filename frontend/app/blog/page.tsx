import { Metadata } from 'next';
import { getPosts, getGlobal } from '@/lib/strapi';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { BlogPostCard } from '@/components/ui/BlogPostCard';
import { Pagination } from '@/components/ui/Pagination';

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  
  return {
    title: `Blog | ${global?.siteName || 'Professional Bio CMS'}`,
    description: 'Read our latest blog posts and articles',
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const pageSize = 10;

  const response = await getPosts({
    page: currentPage,
    pageSize,
  });

  if (!response || !response.data) {
    return (
      <Section className="py-20">
        <Container>
          <div className="text-center">
            <Heading level={1} className="mb-8">Blog</Heading>
            <p className="text-muted-foreground">No blog posts found.</p>
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
          <Heading level={1} className="text-center mb-12">
            Blog
          </Heading>
          
          {posts.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground">No blog posts published yet.</p>
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
                  basePath="/blog"
                />
              )}
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
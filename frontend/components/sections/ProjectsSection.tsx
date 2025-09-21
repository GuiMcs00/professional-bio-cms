import Image from 'next/image';
import { StrapiProjects, StrapiMedia } from '@/lib/strapi';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

interface ProjectsSectionProps {
  section: StrapiProjects;
}

function getStrapiImageUrl(media: StrapiMedia | undefined): string {
  if (!media) return '';
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${baseUrl}${media.url}`;
}

export function ProjectsSection({ section }: ProjectsSectionProps) {
  if (!section.items || section.items.length === 0) {
    return null;
  }

  return (
    <Section id="projects" className="bg-muted/5">
      <Container>
        <div className="max-w-6xl mx-auto">
          <Heading level={2} className="text-center mb-12">
            Projects
          </Heading>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {section.items.map((project, index) => (
              <div
                key={project.id || index}
                className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {project.thumbnail && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={getStrapiImageUrl(project.thumbnail)}
                      alt={project.thumbnail.alternativeText || project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  {project.description && (
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tag.id || tagIndex}
                          className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md"
                        >
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        View Project
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground font-medium"
                      >
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
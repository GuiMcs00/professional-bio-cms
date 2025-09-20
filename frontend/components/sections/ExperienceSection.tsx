import { StrapiExperience } from '@/lib/strapi';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

interface ExperienceSectionProps {
  section: StrapiExperience;
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'Present';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export function ExperienceSection({ section }: ExperienceSectionProps) {
  if (!section.items || section.items.length === 0) {
    return null;
  }

  return (
    <Section id="experience" className="bg-muted/5">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Heading level={2} className="text-center mb-12">
            Experience
          </Heading>
          <div className="space-y-8">
            {section.items.map((item, index) => (
              <div
                key={item.id || index}
                className="relative pl-8 border-l-2 border-primary/20 last:border-l-0"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                <div className="pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(item.startDate)} - {formatDate(item.endDate)}
                    </span>
                  </div>
                  <p className="text-lg text-primary mb-4">{item.company}</p>
                  {item.description && (
                    <div
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
import { StrapiAbout } from '@/lib/strapi';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Prose } from '@/components/ui/Prose';

interface AboutSectionProps {
  section: StrapiAbout;
}

export function AboutSection({ section }: AboutSectionProps) {
  return (
    <Section id="about">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Heading level={2} className="text-center mb-12">
            About Me
          </Heading>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Prose>
                <div dangerouslySetInnerHTML={{ __html: section.markdown }} />
              </Prose>
            </div>
            {section.highlights && section.highlights.length > 0 && (
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-6">Highlights</h3>
                <ul className="space-y-3">
                  {section.highlights.map((highlight, index) => (
                    <li
                      key={highlight.id || index}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
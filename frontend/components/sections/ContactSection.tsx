import { StrapiContact } from '@/lib/strapi';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

interface ContactSectionProps {
  section: StrapiContact;
}

export function ContactSection({ section }: ContactSectionProps) {
  return (
    <Section id="contact">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <Heading level={2} className="mb-12">
            Get In Touch
          </Heading>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {section.email && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Email</h3>
                <a
                  href={`mailto:${section.email}`}
                  className="text-primary hover:text-primary/80 block"
                >
                  {section.email}
                </a>
              </div>
            )}
            {section.phone && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Phone</h3>
                <a
                  href={`tel:${section.phone}`}
                  className="text-primary hover:text-primary/80 block"
                >
                  {section.phone}
                </a>
              </div>
            )}
            {section.location && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-muted-foreground">{section.location}</p>
              </div>
            )}
          </div>
          {section.socials && (
            <div className="mt-12">
              <h3 className="text-lg font-semibold mb-6">Follow Me</h3>
              <div className="flex justify-center gap-6">
                {Object.entries(section.socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
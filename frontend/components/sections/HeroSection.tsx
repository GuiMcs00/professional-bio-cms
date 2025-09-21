import Image from 'next/image';
import { StrapiHero, StrapiMedia } from '@/lib/strapi';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

interface HeroSectionProps {
  section: StrapiHero;
}

function getStrapiImageUrl(media: StrapiMedia | undefined): string {
  if (!media) return '';
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${baseUrl}${media.url}`;
}

export function HeroSection({ section }: HeroSectionProps) {
  return (
    <Section className="pt-20 pb-16 lg:pt-32 lg:pb-24">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <Heading level={1} className="mb-6">
              {section.title}
            </Heading>
            {section.subtitle && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {section.subtitle}
              </p>
            )}
            {section.ctaText && section.ctaUrl && (
              <a
                href={section.ctaUrl}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
              >
                {section.ctaText}
              </a>
            )}
          </div>
          {section.avatar && (
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                <Image
                  src={getStrapiImageUrl(section.avatar)}
                  alt={section.avatar.alternativeText || section.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
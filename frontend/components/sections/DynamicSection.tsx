import { StrapiHomepageSection } from '@/lib/strapi';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ExperienceSection } from './ExperienceSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { ContactSection } from './ContactSection';

interface DynamicSectionProps {
  section: StrapiHomepageSection;
}

export function DynamicSection({ section }: DynamicSectionProps) {
  switch (section.__component) {
    case 'shared.hero':
      return <HeroSection section={section} />;
    case 'shared.about':
      return <AboutSection section={section} />;
    case 'shared.experience':
      return <ExperienceSection section={section} />;
    case 'shared.skills':
      return <SkillsSection section={section} />;
    case 'shared.projects':
      return <ProjectsSection section={section} />;
    case 'shared.contact':
      return <ContactSection section={section} />;
    default:
      console.warn('Unknown section component:', (section as { __component: string }).__component);
      return null;
  }
}
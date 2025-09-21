import { StrapiSkills } from '@/lib/strapi';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';

interface SkillsSectionProps {
  section: StrapiSkills;
}

export function SkillsSection({ section }: SkillsSectionProps) {
  if (!section.items || section.items.length === 0) {
    return null;
  }

  // Group skills by category
  const skillsByCategory = section.items.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof section.items>);

  return (
    <Section id="skills">
      <Container>
        <div className="max-w-6xl mx-auto">
          <Heading level={2} className="text-center mb-12">
            Skills
          </Heading>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category} className="space-y-6">
                <h3 className="text-xl font-semibold text-center">{category}</h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={skill.id || index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
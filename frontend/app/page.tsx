import { getHomepage } from '@/lib/strapi';
import { DynamicSection } from '@/components/sections/DynamicSection';

export default async function Home() {
  const homepage = await getHomepage();

  if (!homepage || !homepage.sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome</h1>
          <p className="text-muted-foreground">
            Configure your homepage content in Strapi CMS
          </p>
        </div>
      </div>
    );
  }

  return (
    <main>
      {homepage.sections.map((section, index) => (
        <DynamicSection key={`${section.__component}-${index}`} section={section} />
      ))}
    </main>
  );
}
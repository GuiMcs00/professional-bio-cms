import type { Metadata } from "next";
import { Suspense } from "react";
import { getGlobal } from "@/lib/strapi";
import { PreviewIndicator } from "@/components/ui/PreviewIndicator";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  
  if (!global) {
    return {
      title: "Professional Bio CMS",
      description: "A professional biography and blog website",
    };
  }

  const defaultSeo = global.defaultSeo;
  
  return {
    title: global.siteName,
    description: global.siteDescription,
    openGraph: {
      title: defaultSeo?.title || global.siteName,
      description: defaultSeo?.description || global.siteDescription,
      siteName: global.siteName,
      images: defaultSeo?.ogImage ? [
        {
          url: `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${defaultSeo.ogImage.url}`,
          width: defaultSeo.ogImage.width,
          height: defaultSeo.ogImage.height,
          alt: defaultSeo.ogImage.alternativeText || global.siteName,
        }
      ] : undefined,
    },
    robots: defaultSeo?.noindex ? 'noindex' : 'index,follow',
    alternates: defaultSeo?.canonicalUrl ? { canonical: defaultSeo.canonicalUrl } : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={null}>
          <PreviewIndicator />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

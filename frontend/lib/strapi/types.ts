// Types for Strapi API responses
export interface StrapiSEO {
  id: number;
  title?: string;
  description?: string;
  ogImage?: StrapiMedia;
  noindex?: boolean;
  canonicalUrl?: string;
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiGlobal {
  id: number;
  siteName: string;
  siteDescription: string;
  defaultSeo?: StrapiSEO;
  logo?: StrapiMedia;
  socialLinks?: Record<string, string>;
  theme: 'system' | 'light' | 'dark';
}

export interface StrapiHero {
  id: number;
  __component: 'shared.hero';
  title: string;
  subtitle?: string;
  avatar?: StrapiMedia;
  ctaText?: string;
  ctaUrl?: string;
}

export interface StrapiHighlight {
  id: number;
  text: string;
}

export interface StrapiAbout {
  id: number;
  __component: 'shared.about';
  markdown: string;
  highlights?: StrapiHighlight[];
}

export interface StrapiExperienceItem {
  id: number;
  role: string;
  company: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface StrapiExperience {
  id: number;
  __component: 'shared.experience';
  items?: StrapiExperienceItem[];
}

export interface StrapiSkillItem {
  id: number;
  name: string;
  level: number;
  category?: string;
}

export interface StrapiSkills {
  id: number;
  __component: 'shared.skills';
  items?: StrapiSkillItem[];
}

export interface StrapiProjectItem {
  id: number;
  title: string;
  description?: string;
  url?: string;
  repoUrl?: string;
  thumbnail?: StrapiMedia;
  tags?: StrapiHighlight[];
}

export interface StrapiProjects {
  id: number;
  __component: 'shared.projects';
  items?: StrapiProjectItem[];
}

export interface StrapiContact {
  id: number;
  __component: 'shared.contact';
  email?: string;
  phone?: string;
  location?: string;
  socials?: Record<string, string>;
}

export type StrapiHomepageSection = 
  | StrapiHero 
  | StrapiAbout 
  | StrapiExperience 
  | StrapiSkills 
  | StrapiProjects 
  | StrapiContact;

export interface StrapiHomepage {
  id: number;
  sections?: StrapiHomepageSection[];
}

export interface StrapiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface StrapiTag {
  id: number;
  name: string;
  slug: string;
}

export interface StrapiBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: StrapiMedia;
  content: string;
  publishedAt?: string;
  author?: string;
  categories?: StrapiCategory[];
  tags?: StrapiTag[];
  seo?: StrapiSEO;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiErrorResponse {
  error: {
    status: number;
    name: string;
    message: string;
  };
}
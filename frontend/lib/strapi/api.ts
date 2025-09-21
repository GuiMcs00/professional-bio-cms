import { draftMode } from 'next/headers';
import {
  StrapiResponse,
  StrapiGlobal,
  StrapiHomepage,
  StrapiBlogPost,
  StrapiCategory,
  StrapiTag,
} from './types';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_PREVIEW_TOKEN = process.env.STRAPI_PREVIEW_TOKEN;

interface FetchOptions {
  populate?: string | string[];
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  publicationState?: 'live' | 'preview';
}

async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<StrapiResponse<T>> {
  const { isEnabled: isDraftMode } = await draftMode();
  
  const params = new URLSearchParams();
  
  // Handle populate
  if (options.populate) {
    if (Array.isArray(options.populate)) {
      options.populate.forEach(field => params.append('populate', field));
    } else {
      params.append('populate', options.populate);
    }
  }
  
  // Handle filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      params.append(`filters[${key}]`, String(value));
    });
  }
  
  // Handle sort
  if (options.sort) {
    if (Array.isArray(options.sort)) {
      options.sort.forEach(field => params.append('sort', field));
    } else {
      params.append('sort', options.sort);
    }
  }
  
  // Handle pagination
  if (options.pagination) {
    if (options.pagination.page) {
      params.append('pagination[page]', String(options.pagination.page));
    }
    if (options.pagination.pageSize) {
      params.append('pagination[pageSize]', String(options.pagination.pageSize));
    }
  }
  
  // Handle draft mode
  if (isDraftMode && STRAPI_PREVIEW_TOKEN) {
    params.append('publicationState', 'preview');
  } else {
    params.append('publicationState', 'live');
  }
  
  const url = `${STRAPI_URL}/api/${endpoint}?${params.toString()}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': isDraftMode && STRAPI_PREVIEW_TOKEN ? `Bearer ${STRAPI_PREVIEW_TOKEN}` : '',
      },
      next: { revalidate: 60 },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

export async function getGlobal(): Promise<StrapiGlobal | null> {
  try {
    const response = await fetchAPI<StrapiGlobal>('global', {
      populate: ['defaultSeo', 'defaultSeo.ogImage', 'logo'],
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching global:', error);
    return null;
  }
}

export async function getHomepage(): Promise<StrapiHomepage | null> {
  try {
    const response = await fetchAPI<StrapiHomepage>('homepage', {
      populate: 'deep',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

export async function getPosts(options: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
} = {}): Promise<StrapiResponse<StrapiBlogPost[]> | null> {
  try {
    const filters: Record<string, unknown> = {};
    
    if (options.category) {
      filters['categories.slug'] = { $eq: options.category };
    }
    
    if (options.tag) {
      filters['tags.slug'] = { $eq: options.tag };
    }
    
    const response = await fetchAPI<StrapiBlogPost[]>('blog-posts', {
      populate: ['coverImage', 'categories', 'tags', 'seo', 'seo.ogImage'],
      filters,
      sort: ['publishedAt:desc'],
      pagination: {
        page: options.page || 1,
        pageSize: options.pageSize || 10,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}

export async function getPostBySlug(slug: string): Promise<StrapiBlogPost | null> {
  try {
    const response = await fetchAPI<StrapiBlogPost[]>('blog-posts', {
      populate: ['coverImage', 'categories', 'tags', 'seo', 'seo.ogImage'],
      filters: { slug: { $eq: slug } },
    });
    return response.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

export async function getCategories(): Promise<StrapiCategory[]> {
  try {
    const response = await fetchAPI<StrapiCategory[]>('categories', {
      sort: ['name:asc'],
    });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getTags(): Promise<StrapiTag[]> {
  try {
    const response = await fetchAPI<StrapiTag[]>('tags', {
      sort: ['name:asc'],
    });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export async function getPostsByCategorySlug(
  categorySlug: string,
  options: { page?: number; pageSize?: number } = {}
): Promise<StrapiResponse<StrapiBlogPost[]> | null> {
  return getPosts({
    ...options,
    category: categorySlug,
  });
}

export async function getPostsByTagSlug(
  tagSlug: string,
  options: { page?: number; pageSize?: number } = {}
): Promise<StrapiResponse<StrapiBlogPost[]> | null> {
  return getPosts({
    ...options,
    tag: tagSlug,
  });
}
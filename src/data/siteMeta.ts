import { profile } from './profile';

export const siteMeta = {
  title: 'Naimish K | Full Stack Developer, Python & AI Engineer',
  description:
    'Full stack developer and AI engineer building web apps, Django/FastAPI backends, React frontends, and practical AI automation for startups and growing teams.',
  keywords: [
    'Full Stack Developer',
    'Python Developer',
    'Django Developer',
    'React Developer',
    'AI Engineer',
    'AI Developer',
    'FastAPI Developer',
    'Machine Learning Developer',
    'LangChain Developer',
    'LLM Developer',
    'API Integration',
    'Web Development',
    'SaaS Development',
    'AI Automation',
    'Backend Development',
    'Frontend Development',
    'Freelance Developer India',
  ],
  author: profile.name,
  siteName: `${profile.name} Portfolio`,
  locale: 'en_IN',
  themeColor: '#05070b',
  backgroundColor: '#05070b',
  twitterHandle: '@nymiss',
  jobTitle: 'Full Stack Developer & AI Engineer',
  services: [
    'Website Development',
    'Web Applications',
    'AI Automation',
    'API Integrations',
  ],
} as const;

export function getSiteUrl(): string {
  const url = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');
  return url || 'https://nymiss.dev';
}

export function getOgImageUrl(): string {
  return `${getSiteUrl()}/og-image.jpg`;
}

export type PageMeta = {
  title: string;
  description: string;
  path?: string;
  robots?: string;
  type?: 'website' | 'profile';
};

export const homePageMeta: PageMeta = {
  title: siteMeta.title,
  description: siteMeta.description,
  path: '/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  type: 'website',
};

export const notFoundPageMeta: PageMeta = {
  title: `Page Not Found | ${profile.name}`,
  description: 'This page does not exist. Return to the homepage to explore projects, services, and contact options.',
  path: '/404',
  robots: 'noindex, nofollow',
  type: 'website',
};

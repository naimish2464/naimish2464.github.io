import { profile } from './profile';

export const siteMeta = {
  title: 'Nymiss K | Freelance Full-Stack Developer & AI Automation Specialist',
  description:
    'I help businesses build high-performance websites, web applications, and automation systems that drive growth, save time, and improve customer experiences.',
  keywords: [
    'Freelance Developer',
    'Full Stack Developer',
    'Web Developer',
    'AI Automation Developer',
    'React Developer',
    'Node.js Developer',
    'API Integration Expert',
    'Website Development',
    'Web Application Development',
    'India Freelance Developer',
  ],
  author: profile.name,
  siteName: profile.name,
  locale: 'en_IN',
  themeColor: '#05070b',
  backgroundColor: '#05070b',
  twitterHandle: '@nymiss',
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

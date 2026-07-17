import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getOgImageUrl,
  getSiteUrl,
  homePageMeta,
  notFoundPageMeta,
  siteMeta,
  type PageMeta,
} from '../data/siteMeta';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function resolvePageMeta(pathname: string): PageMeta {
  if (pathname === '/' || pathname === '') {
    return homePageMeta;
  }
  return notFoundPageMeta;
}

export default function SEOHead() {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = getSiteUrl();
    const ogImage = getOgImageUrl();
    const page = resolvePageMeta(location.pathname);
    const canonicalPath = page.path === '/404' ? location.pathname : page.path || '/';
    const canonicalUrl =
      page.path === '/404'
        ? `${siteUrl}${location.pathname}`
        : `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}`;

    document.title = page.title;
    document.documentElement.lang = 'en';

    upsertMeta('name', 'description', page.description);
    upsertMeta('name', 'keywords', siteMeta.keywords.join(', '));
    upsertMeta('name', 'author', siteMeta.author);
    upsertMeta('name', 'theme-color', siteMeta.themeColor);
    upsertMeta('name', 'robots', page.robots || 'index, follow');
    upsertMeta('name', 'googlebot', page.robots || 'index, follow');

    upsertLink('canonical', canonicalUrl);

    upsertMeta('property', 'og:title', page.title);
    upsertMeta('property', 'og:description', page.description);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:alt', `${siteMeta.author} — ${siteMeta.jobTitle}`);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:type', page.type || 'website');
    upsertMeta('property', 'og:site_name', siteMeta.siteName);
    upsertMeta('property', 'og:locale', siteMeta.locale);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', siteMeta.twitterHandle);
    upsertMeta('name', 'twitter:creator', siteMeta.twitterHandle);
    upsertMeta('name', 'twitter:title', page.title);
    upsertMeta('name', 'twitter:description', page.description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertMeta('name', 'twitter:image:alt', `${siteMeta.author} — ${siteMeta.jobTitle}`);
  }, [location.pathname]);

  return null;
}

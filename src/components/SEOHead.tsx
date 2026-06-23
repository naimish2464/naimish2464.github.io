import { useEffect } from 'react';
import { getOgImageUrl, getSiteUrl, siteMeta } from '../data/siteMeta';

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

export default function SEOHead() {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    const ogImage = getOgImageUrl();

    document.title = siteMeta.title;
    upsertMeta('name', 'description', siteMeta.description);
    upsertMeta('name', 'keywords', siteMeta.keywords.join(', '));
    upsertMeta('name', 'author', siteMeta.author);
    upsertMeta('name', 'theme-color', siteMeta.themeColor);
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta('name', 'googlebot', 'index, follow');

    upsertLink('canonical', siteUrl);

    upsertMeta('property', 'og:title', siteMeta.title);
    upsertMeta('property', 'og:description', siteMeta.description);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:url', siteUrl);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', siteMeta.siteName);
    upsertMeta('property', 'og:locale', siteMeta.locale);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', siteMeta.title);
    upsertMeta('name', 'twitter:description', siteMeta.description);
    upsertMeta('name', 'twitter:image', ogImage);
  }, []);

  return null;
}

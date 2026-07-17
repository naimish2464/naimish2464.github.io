import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import { staticProjects } from '../data/projects';
import { faqContent } from '../data/homeContent';
import { getOgImageUrl, getSiteUrl, siteMeta } from '../data/siteMeta';

const SCHEMA_SCRIPT_ID = 'portfolio-jsonld';

const SEOSchema = () => {
  const location = useLocation();
  const siteUrl = getSiteUrl();

  useEffect(() => {
    document.getElementById(SCHEMA_SCRIPT_ID)?.remove();

    if (location.pathname !== '/' && location.pathname !== '') {
      return;
    }

    const imageUrl = getOgImageUrl();

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: siteMeta.siteName,
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: imageUrl,
          },
          sameAs: [profile.github, profile.linkedin],
          contactPoint: {
            '@type': 'ContactPoint',
            email: profile.email,
            contactType: 'sales',
            availableLanguage: ['English'],
          },
        },
        {
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          name: profile.name,
          alternateName: 'Nymiss',
          jobTitle: siteMeta.jobTitle,
          description: siteMeta.description,
          url: siteUrl,
          image: imageUrl,
          email: profile.email,
          knowsAbout: [...siteMeta.keywords],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN',
          },
          sameAs: [profile.github, profile.linkedin],
          worksFor: {
            '@id': `${siteUrl}/#organization`,
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: siteUrl,
          name: siteMeta.title,
          description: siteMeta.description,
          inLanguage: 'en-IN',
          publisher: {
            '@id': `${siteUrl}/#person`,
          },
        },
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/#webpage`,
          url: siteUrl,
          name: siteMeta.title,
          description: siteMeta.description,
          isPartOf: {
            '@id': `${siteUrl}/#website`,
          },
          about: {
            '@id': `${siteUrl}/#person`,
          },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: imageUrl,
          },
          breadcrumb: {
            '@id': `${siteUrl}/#breadcrumb`,
          },
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${siteUrl}/#service`,
          name: `${profile.name} — Freelance Development Services`,
          description: siteMeta.description,
          url: siteUrl,
          image: imageUrl,
          priceRange: '$$',
          areaServed: {
            '@type': 'Place',
            name: 'Worldwide',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Freelance Services',
            itemListElement: siteMeta.services.map((service) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service,
              },
            })),
          },
          provider: {
            '@id': `${siteUrl}/#person`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${siteUrl}/#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: `${siteUrl}/#services`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Projects',
              item: `${siteUrl}/#projects`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: 'Contact',
              item: `${siteUrl}/#contact`,
            },
          ],
        },
        {
          '@type': 'ItemList',
          '@id': `${siteUrl}/#projects`,
          name: 'Featured Projects',
          itemListElement: staticProjects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'SoftwareApplication',
              '@id': `${siteUrl}/#project-${project.slug}`,
              name: project.title,
              description: project.metaDescription,
              applicationCategory: project.category === 'AI/ML' ? 'BusinessApplication' : 'WebApplication',
              operatingSystem: 'Web',
              url: project.url,
              image: typeof project.image === 'string' ? project.image : undefined,
              keywords: project.keywords.join(', '),
              featureList: project.features.join(', '),
              author: {
                '@id': `${siteUrl}/#person`,
              },
            },
          })),
        },
        {
          '@type': 'FAQPage',
          '@id': `${siteUrl}/#faq`,
          mainEntity: faqContent.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
      ],
    };

    const script = document.createElement('script');
    script.id = SCHEMA_SCRIPT_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [location.pathname, siteUrl]);

  return null;
};

export default SEOSchema;

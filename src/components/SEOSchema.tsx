import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { profile } from '../data/profile';
import { getSiteUrl, siteMeta } from '../data/siteMeta';

const SEOSchema = () => {
  const location = useLocation();
  const siteUrl = getSiteUrl();

  useEffect(() => {
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((script) => script.remove());

    const script = document.createElement('script');
    script.type = 'application/ld+json';

    let schemaData;

    if (location.pathname === '/' || location.pathname === '') {
      const imageUrl = `${siteUrl}/og-image.jpg`;

      schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${siteUrl}/#person`,
            name: profile.name,
            jobTitle: 'Freelance Full-Stack Developer & AI Automation Specialist',
            description: siteMeta.description,
            url: siteUrl,
            image: imageUrl,
            email: `mailto:${profile.email}`,
            telephone: profile.whatsapp,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'IN',
              addressRegion: 'India',
            },
            sameAs: [profile.github, profile.linkedin, profile.whatsappUrl],
          },
          {
            '@type': 'ProfessionalService',
            '@id': `${siteUrl}/#service`,
            name: `${profile.name} - Freelance Development Services`,
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
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: siteMeta.title,
            description: siteMeta.description,
            publisher: {
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
            ],
          },
        ],
      };
    }

    if (schemaData) {
      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }

    return () => {
      script.remove();
    };
  }, [location.pathname, siteUrl]);

  return null;
};

export default SEOSchema;

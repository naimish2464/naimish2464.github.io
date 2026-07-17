export interface Project {
  id: string;
  slug: string;
  title: string;
  type: string;
  /** Short card description shown on the homepage */
  description: string;
  /** Longer summary for schema / future case-study pages */
  summary: string;
  metaDescription: string;
  ogDescription: string;
  twitterDescription: string;
  keywords: string[];
  url: string;
  image: string;
  imageAlt: string;
  logo?: string;
  tech: string[];
  features: string[];
  category: 'AI/ML' | 'Web Apps' | 'Automation' | 'APIs';
}

export interface ProjectMeta {
  title?: string;
  description?: string;
  image?: string;
  logo?: string;
  url: string;
}

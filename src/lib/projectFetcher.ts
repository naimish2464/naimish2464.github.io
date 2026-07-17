import { staticProjects } from '../data/projects';
import type { Project, ProjectMeta } from '../types/project';

const CACHE_KEY = 'portfolio_projects_v4';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

type CachePayload = {
  savedAt: number;
  projects: Project[];
};

export function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function readCache(): Project[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CachePayload;
    if (!parsed?.savedAt || !Array.isArray(parsed.projects)) return null;
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null;

    const valid = parsed.projects.filter((p) => p?.url && isValidUrl(p.url));
    if (!valid.length) return null;

    // Bundled asset URLs are content-hashed and change between builds,
    // so always take image/logo from the current static data.
    return valid.map((cached) => {
      const base = staticProjects.find((p) => p.id === cached.id);
      return base ? { ...cached, image: base.image, logo: base.logo } : cached;
    });
  } catch {
    return null;
  }
}

function writeCache(projects: Project[]): void {
  try {
    const payload: CachePayload = { savedAt: Date.now(), projects };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota / private-mode failures
  }
}

/**
 * Fetches Open Graph / meta tags for a live URL via Microlink.
 * Falls back gracefully when the request fails or CORS/rate limits apply.
 */
async function fetchLiveMeta(url: string): Promise<ProjectMeta | null> {
  if (!isValidUrl(url)) return null;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);

  try {
    const endpoint = `https://api.microlink.io/?url=${encodeURIComponent(url)}&palette=false&audio=false&video=false&iframe=false`;
    const response = await fetch(endpoint, { signal: controller.signal });

    if (!response.ok) return null;

    const json = (await response.json()) as {
      status?: string;
      data?: {
        title?: string;
        description?: string;
        image?: { url?: string } | string;
        logo?: { url?: string } | string;
        url?: string;
      };
    };

    if (json.status !== 'success' || !json.data) return null;

    const imageUrl =
      typeof json.data.image === 'string'
        ? json.data.image
        : json.data.image?.url;
    const logoUrl =
      typeof json.data.logo === 'string'
        ? json.data.logo
        : json.data.logo?.url;

    return {
      url: json.data.url && isValidUrl(json.data.url) ? json.data.url : url,
      title: json.data.title,
      description: json.data.description,
      image: imageUrl && isValidUrl(imageUrl) ? imageUrl : undefined,
      logo: logoUrl && isValidUrl(logoUrl) ? logoUrl : undefined,
    };
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

function mergeWithStatic(base: Project, meta: ProjectMeta | null): Project {
  if (!meta) return base;

  return {
    ...base,
    // Keep curated content and local screenshots — only enrich the logo
    logo: base.logo || meta.logo,
    url: isValidUrl(meta.url) ? meta.url : base.url,
  };
}

/**
 * Loads portfolio projects in parallel with localStorage caching.
 * Always returns curated static data as a safe fallback.
 */
export async function loadProjects(): Promise<Project[]> {
  const cached = readCache();
  if (cached) return cached;

  try {
    const metas = await Promise.all(
      staticProjects.map((project) => fetchLiveMeta(project.url))
    );

    const projects = staticProjects.map((project, index) =>
      mergeWithStatic(project, metas[index])
    );

    writeCache(projects);
    return projects;
  } catch {
    return staticProjects;
  }
}

export function getStaticProjects(): Project[] {
  return staticProjects;
}

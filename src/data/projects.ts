import type { Project } from '../types/project';
import airecruiterImage from '../assets/airecruiter.png';
import shiptimeImage from '../assets/shiptime.png';
import crescofyImage from '../assets/crescofy.png';
import mundoprintsImage from '../assets/mundoprints.png';
import candidateaiImage from '../assets/candidateai.png';
import blockandmortarImage from '../assets/blockandmortar.png';

/** Curated portfolio projects with SEO metadata for cards, schema, and social previews. */
export const staticProjects: Project[] = [
  {
    id: 'yourbestrecruiter',
    slug: 'yourbestrecruiter-ai-recruitment-platform',
    title: 'YourBestRecruiter.AI — AI Recruitment Platform',
    type: 'AI-powered Recruitment Platform',
    description:
      'Hiring teams were drowning in resumes and manual screening. I helped build an AI recruitment platform that creates jobs, ranks candidates with semantic search, and schedules interviews from one dashboard.',
    summary:
      'YourBestRecruiter.AI is an AI recruitment product for teams that need faster, fairer hiring. It covers job creation through shortlist — semantic CV search, intelligent ranking, analytics, and interview scheduling — so recruiters spend less time sorting and more time talking to the right people.',
    metaDescription:
      'AI recruitment platform with semantic CV search, candidate ranking, analytics, and interview scheduling for faster, clearer hiring decisions.',
    ogDescription:
      'See how YourBestRecruiter.AI uses LLMs and semantic search to automate hiring from job posts to interview scheduling.',
    twitterDescription:
      'AI hiring platform: semantic resume search, ranking, analytics, and interview scheduling in one workflow.',
    keywords: [
      'AI recruitment platform',
      'AI hiring software',
      'semantic CV search',
      'LLM developer',
      'candidate ranking',
      'AI automation',
    ],
    url: 'https://yourbestrecruiter.ai/',
    image: airecruiterImage,
    imageAlt:
      'YourBestRecruiter.AI dashboard showing AI-powered candidate matching and recruitment analytics',
    logo: 'https://www.google.com/s2/favicons?domain=yourbestrecruiter.ai&sz=128',
    tech: ['AI / LLM', 'Semantic Search', 'Candidate Ranking', 'Resume Processing', 'Dashboard Analytics', 'Workflow Automation'],
    features: [
      'AI-powered candidate matching against role requirements',
      'Semantic search across resumes and profiles',
      'Automated ranking of applicants',
      'Interview scheduling workflow',
      'Recruitment analytics dashboard',
      'Multi-platform job posting support',
    ],
    category: 'AI/ML',
  },
  {
    id: 'shiptime',
    slug: 'shiptime-shipping-logistics-platform',
    title: 'ShipTime — Shipping Rate Comparison & Logistics Platform',
    type: 'Shipping & Logistics Platform',
    description:
      'Ecommerce sellers needed one place to compare carriers instead of juggling portals. ShipTime compares rates across 25+ couriers, prints labels, tracks parcels, and handles returns in a single logistics workflow.',
    summary:
      'ShipTime is a shipping and logistics platform built for ecommerce teams. It aggregates courier rates, generates labels, tracks shipments, manages returns, and plugs into storefronts so fulfillment stays predictable as order volume grows.',
    metaDescription:
      'Shipping logistics platform comparing 25+ courier rates with label generation, tracking, returns, and ecommerce integrations.',
    ogDescription:
      'ShipTime helps ecommerce brands compare courier rates, generate labels, track shipments, and automate returns.',
    twitterDescription:
      'Compare 25+ courier rates, print labels, track shipments, and manage returns from one logistics dashboard.',
    keywords: [
      'shipping rate comparison',
      'ecommerce logistics',
      'courier API integration',
      'API integration',
      'shipping automation',
      'label generation',
    ],
    url: 'https://shiptime.com/',
    image: shiptimeImage,
    imageAlt:
      'ShipTime logistics dashboard comparing shipping rates and tracking ecommerce shipments',
    logo: 'https://www.google.com/s2/favicons?domain=shiptime.com&sz=128',
    tech: ['Courier APIs', 'Payment Integration', 'Shipping APIs', 'Tracking APIs', 'Dashboard', 'Logistics Automation'],
    features: [
      'Live shipping rate comparison',
      'Integrations with 25+ couriers',
      'Label generation and shipment tracking',
      'Return management workflows',
      'Ecommerce platform integrations',
      'Custom branded tracking pages',
    ],
    category: 'APIs',
  },
  {
    id: 'crescofy',
    slug: 'crescofy-ai-crm-erp-platform',
    title: 'Crescofy — AI CRM, ERP & Production Planning',
    type: 'AI-powered CRM + ERP + Production Planning',
    description:
      'Wholesale and production teams were running CRM, inventory, and planning in separate tools. Crescofy unifies sales, ecommerce, stock, and production planning with forecasting that helps leaders plan demand instead of guessing.',
    summary:
      'Crescofy is an AI-enabled business platform that combines CRM, B2B ecommerce, inventory, and production planning. Predictive sales insights and demand forecasting help operators see what to stock, build, and sell next.',
    metaDescription:
      'AI CRM and ERP platform with inventory, production planning, B2B ecommerce, and demand forecasting for wholesale teams.',
    ogDescription:
      'Crescofy brings CRM, inventory, production planning, and AI demand forecasting into one business platform.',
    twitterDescription:
      'AI-assisted CRM, ERP, inventory, and production planning with demand forecasting for growing wholesalers.',
    keywords: [
      'AI CRM',
      'ERP software',
      'demand forecasting',
      'machine learning developer',
      'SaaS development',
      'inventory management',
    ],
    url: 'https://www.crescofy.com/',
    image: crescofyImage,
    imageAlt:
      'Crescofy AI business platform showing CRM analytics, inventory, and production planning views',
    logo: 'https://www.google.com/s2/favicons?domain=crescofy.com&sz=128',
    tech: ['Machine Learning', 'Analytics Dashboard', 'CRM', 'ERP', 'Forecasting', 'Inventory System'],
    features: [
      'AI-assisted sales insights',
      'Demand forecasting for inventory',
      'Warehouse and stock management',
      'Production planning tools',
      'B2B ecommerce portal',
      'KPI reporting dashboard',
    ],
    category: 'AI/ML',
  },
  {
    id: 'mundoprints',
    slug: 'mundo-prints-custom-printing-ecommerce',
    title: 'Mundo Prints — Custom Printing Ecommerce Website',
    type: 'Custom Printing & Ecommerce Platform',
    description:
      'A print shop needed an online catalog that made custom orders easy to place. Mundo Prints is a responsive ecommerce site with product categories, ordering flow, and enquiry forms built for mobile shoppers.',
    summary:
      'Mundo Prints is a custom printing ecommerce website for customers who want to browse products, place orders, and enquire about print services online. The focus was clarity, mobile usability, and a straightforward order path.',
    metaDescription:
      'Custom printing ecommerce website with product catalog, online ordering, and enquiry forms for Mundoprints India.',
    ogDescription:
      'Mundo Prints: a responsive ecommerce website for custom printing services, catalogs, and customer enquiries.',
    twitterDescription:
      'Ecommerce website for custom printing — product catalog, order flow, and mobile-friendly enquiry forms.',
    keywords: [
      'ecommerce website development',
      'custom printing website',
      'React developer',
      'frontend development',
      'responsive web design',
      'online ordering',
    ],
    url: 'https://mundoprints.in/',
    image: mundoprintsImage,
    imageAlt:
      'Mundo Prints ecommerce website showing custom printing product catalog and services',
    logo: 'https://www.google.com/s2/favicons?domain=mundoprints.in&sz=128',
    tech: ['Ecommerce', 'Product Catalog', 'Responsive UI', 'Order Workflow'],
    features: [
      'Browsable product catalog',
      'Custom printing service pages',
      'Online order placement',
      'Organized product categories',
      'Contact and enquiry forms',
      'Mobile-first responsive layout',
    ],
    category: 'Web Apps',
  },
  {
    id: 'yourbestcandidate',
    slug: 'yourbestcandidate-ai-candidate-screening',
    title: 'YourBestCandidate.AI — AI Candidate Screening',
    type: 'AI Candidate Screening Platform',
    description:
      'Recruiters needed faster shortlists without missing strong applicants buried in PDFs. This AI screening product parses resumes, runs semantic search, and ranks candidates so hiring managers see the best fits first.',
    summary:
      'YourBestCandidate.AI is an AI candidate screening platform that parses CVs, searches profiles semantically, ranks applicants with ML, and surfaces hiring recommendations. It integrates with recruiting tools so screening fits existing workflows.',
    metaDescription:
      'AI candidate screening with resume parsing, semantic search, ML ranking, and hiring recommendations for recruiters.',
    ogDescription:
      'YourBestCandidate.AI parses resumes, ranks applicants with ML, and helps recruiters shortlist faster.',
    twitterDescription:
      'AI resume screening, semantic candidate search, and ranking for recruiters who need clearer shortlists.',
    keywords: [
      'AI candidate screening',
      'resume parsing',
      'NLP',
      'machine learning developer',
      'LLM developer',
      'recruitment AI',
    ],
    url: 'https://yourbestcandidate.ai/',
    image: candidateaiImage,
    imageAlt:
      'YourBestCandidate.AI interface for AI resume screening, semantic search, and candidate ranking',
    logo: 'https://www.google.com/s2/favicons?domain=yourbestcandidate.ai&sz=128',
    tech: ['GPT', 'LLM', 'Vector Search', 'Resume Parsing', 'AI Ranking', 'NLP'],
    features: [
      'AI resume and CV screening',
      'Structured CV parsing',
      'Semantic candidate search',
      'ML-based candidate ranking',
      'Recruitly integration',
      'Hiring analytics dashboard',
    ],
    category: 'AI/ML',
  },
  {
    id: 'blockandmortar',
    slug: 'block-and-mortar-ai-construction-planning',
    title: 'Block & Mortar AI — Construction Planning & Cost Estimation',
    type: 'AI Construction Planning & Estimation Platform',
    description:
      'Architects and builders often lose hours to spreadsheets for square footage, materials, and BOQs. Block & Mortar AI helps plan layouts, estimate costs, and generate quantity breakdowns with AI-assisted design adjustments.',
    summary:
      'Block & Mortar AI is a construction planning platform for civil engineers, architects, and builders. It supports layout planning, square footage optimization, material estimates, cost analysis, and BOQ generation so early project numbers are clearer and faster to produce.',
    metaDescription:
      'AI construction planning tool for cost estimation, material quantities, square footage, and BOQ generation for builders.',
    ogDescription:
      'Block & Mortar AI helps builders plan projects, estimate materials and costs, and generate BOQs with AI assistance.',
    twitterDescription:
      'AI construction planning: layouts, cost estimates, material quantities, and BOQ generation in one place.',
    keywords: [
      'AI construction software',
      'cost estimation',
      'BOQ generation',
      'AI engineer',
      'building planning',
      'project analytics',
    ],
    url: 'https://blockandmortar.ai/',
    image: blockandmortarImage,
    imageAlt:
      'Block & Mortar AI construction planning platform showing cost estimation and building layout tools',
    logo: 'https://www.google.com/s2/favicons?domain=blockandmortar.ai&sz=128',
    tech: [
      'AI / LLM',
      'Cost Estimation',
      'BOQ Generation',
      'Project Analytics',
      'Document Management',
      'Secure Auth',
    ],
    features: [
      'AI-assisted building planning and layout suggestions',
      'Construction cost estimation and budgeting',
      'Square footage calculation and optimization',
      'Material quantity estimation',
      'Floor plan and structural planning support',
      'Project cost breakdown and BOQ generation',
    ],
    category: 'AI/ML',
  },
];

export const projectUrls = staticProjects.map((p) => p.url);

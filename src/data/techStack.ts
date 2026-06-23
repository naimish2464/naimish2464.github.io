import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa6';
import {
  SiCss,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';

export type TechItem = {
  name: string;
  icon: IconType;
  color: string;
};

export type TechCategory = {
  category: string;
  items: TechItem[];
};

export const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss, color: '#1572B6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Flask', icon: SiFlask, color: '#FFFFFF' },
      { name: 'Django', icon: SiDjango, color: '#44B78B' },
      { name: 'Java', icon: SiOpenjdk, color: '#437291' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      { name: 'OpenAI', icon: SiOpenai, color: '#FFFFFF' },
      { name: 'Gemini', icon: SiGooglegemini, color: '#8E75B2' },
      { name: 'LangChain', icon: SiLangchain, color: '#47D392' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    ],
  },
];

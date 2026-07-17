import avatarImage from '../assets/profile.png';

export const profile = {
  name: 'Naimish K',
  experienceYears: '5+',
  email: 'contact.nymiss@gmail.com',
  github: 'https://github.com/naimish2464',
  linkedin: 'https://www.linkedin.com/in/nymiss',
  avatarUrl: avatarImage,
} as const;

export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;

import React from 'react';
import { techStack } from '../data/techStack';
import { marqueeContent } from '../data/homeContent';

const techItems = techStack.flatMap((group) => group.items);

function MarqueeTrack({
  children,
  direction = 'left',
  duration = 28,
  label,
  tone = 'role',
}: {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  duration?: number;
  label: string;
  tone?: 'role' | 'tech';
}) {
  return (
    <div className={`marquee-row marquee-row--${tone}`} aria-label={label}>
      <div
        className={`marquee-track marquee-track--${direction}`}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export function MarqueeSection() {
  return (
    <section
      className="marquee-section relative py-10 sm:py-12 md:py-14"
      aria-label="Roles and technologies"
    >
      <div className="marquee-section__glow" aria-hidden="true" />

      <div className="space-y-5 sm:space-y-6">
        <MarqueeTrack label="Roles and designations" direction="left" duration={34} tone="role">
          {marqueeContent.designations.map((item) => (
            <React.Fragment key={item}>
              <span className="marquee-item marquee-item--role">{item}</span>
              <span className="marquee-sep" aria-hidden="true">
                /
              </span>
            </React.Fragment>
          ))}
        </MarqueeTrack>

        <MarqueeTrack label="Tech stack" direction="right" duration={40} tone="tech">
          {techItems.map((item) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={item.name}>
                <span className="marquee-item marquee-item--tech">
                  <Icon className="marquee-icon" style={{ color: item.color }} aria-hidden="true" />
                  <span>{item.name}</span>
                </span>
                <span className="marquee-sep marquee-sep--dot" aria-hidden="true" />
              </React.Fragment>
            );
          })}
        </MarqueeTrack>
      </div>
    </section>
  );
}

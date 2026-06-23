import React from 'react';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignmentClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-4 ${alignmentClass} ${className}`}>
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
          {eyebrow}
        </span>
      ) : null}

      <h2 className="text-h2 font-bold text-white">{title}</h2>

      {description ? (
        <p className="max-w-2xl text-body-lg text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}

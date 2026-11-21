import { useEffect, useRef } from 'react';
import { profile } from '../data/profile';

const MAX_OFFSET = 10;

/**
 * Standalone hero identity visual — cyan ambient glow + soft pointer parallax.
 * No card chrome; motion disabled for reduced-motion / coarse pointers.
 */
export function HeroIdentity({ visible }: { visible: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const finePointer = window.matchMedia('(pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const canParallax = () => finePointer.matches && !reduceMotion.matches;

    let rafId = 0;
    let running = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const apply = () => {
      frame.style.setProperty('--hero-parallax-x', `${currentX.toFixed(2)}px`);
      frame.style.setProperty('--hero-parallax-y', `${currentY.toFixed(2)}px`);
    };

    const tick = () => {
      if (!running) return;
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      apply();

      if (Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05) {
        currentX = targetX;
        currentY = targetY;
        apply();
        running = false;
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !canParallax()) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canParallax()) return;
      const rect = frame.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;
      const midY = rect.top + rect.height / 2;
      const nx = (event.clientX - midX) / Math.max(rect.width / 2, 1);
      const ny = (event.clientY - midY) / Math.max(rect.height / 2, 1);
      targetX = Math.max(-1, Math.min(1, nx)) * MAX_OFFSET;
      targetY = Math.max(-1, Math.min(1, ny)) * MAX_OFFSET;
      start();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    const syncCapability = () => {
      if (!canParallax()) {
        targetX = 0;
        targetY = 0;
        currentX = 0;
        currentY = 0;
        apply();
        if (rafId) cancelAnimationFrame(rafId);
        running = false;
        rafId = 0;
      }
    };

    apply();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    finePointer.addEventListener('change', syncCapability);
    reduceMotion.addEventListener('change', syncCapability);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      finePointer.removeEventListener('change', syncCapability);
      reduceMotion.removeEventListener('change', syncCapability);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <aside
      className={`hero-identity ${visible ? 'is-visible' : ''}`}
      aria-label={`${profile.name}, full stack developer and AI engineer`}
    >
      <div ref={frameRef} className="hero-identity__frame">
        <div className="hero-identity__glow" aria-hidden="true" />
        <img
          src={profile.avatarUrl}
          alt={`Portrait of ${profile.name}, full stack developer and AI engineer`}
          width={420}
          height={420}
          fetchPriority="high"
          className="hero-identity__image"
        />
      </div>
      <p className="hero-identity__caption">
        <span className="hero-identity__name">{profile.name}</span>
        <span className="hero-identity__role">Full Stack Developer & AI Engineer</span>
      </p>
    </aside>
  );
}

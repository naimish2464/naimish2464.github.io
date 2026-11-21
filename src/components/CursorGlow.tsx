import { useEffect, useRef } from 'react';

/**
 * Large soft radial glow that springs toward the pointer.
 * Writes CSS vars via rAF — no React state per frame.
 */
export function CursorGlow() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const finePointer = window.matchMedia('(pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const canEnable = () => finePointer.matches && !reduceMotion.matches;

    let rafId = 0;
    let running = false;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let velX = 0;
    let velY = 0;

    // Critically-damped spring (no bounce / overshoot feel)
    const stiffness = 180;
    const damping = 28;
    const mass = 1;

    const setVisible = (visible: boolean) => {
      layer.style.opacity = visible ? '1' : '0';
    };

    const applyPosition = () => {
      layer.style.setProperty('--cursor-x', `${currentX}px`);
      layer.style.setProperty('--cursor-y', `${currentY}px`);
    };

    const tick = (now: number) => {
      if (!running) return;

      const last = (tick as unknown as { _last?: number })._last ?? now;
      (tick as unknown as { _last?: number })._last = now;
      const dt = Math.min((now - last) / 1000, 0.032);

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const ax = (stiffness * dx - damping * velX) / mass;
      const ay = (stiffness * dy - damping * velY) / mass;

      velX += ax * dt;
      velY += ay * dt;
      currentX += velX * dt;
      currentY += velY * dt;

      applyPosition();

      const settled =
        Math.abs(dx) < 0.15 &&
        Math.abs(dy) < 0.15 &&
        Math.abs(velX) < 0.15 &&
        Math.abs(velY) < 0.15;

      if (settled) {
        running = false;
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (running || !canEnable()) return;
      running = true;
      (tick as unknown as { _last?: number })._last = undefined;
      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canEnable()) return;
      targetX = event.clientX;
      targetY = event.clientY;
      setVisible(true);
      startLoop();
    };

    const onVisibility = () => {
      if (document.hidden) {
        setVisible(false);
        if (rafId) cancelAnimationFrame(rafId);
        running = false;
        rafId = 0;
      }
    };

    const syncCapability = () => {
      if (!canEnable()) {
        setVisible(false);
        if (rafId) cancelAnimationFrame(rafId);
        running = false;
        rafId = 0;
        return;
      }
      applyPosition();
    };

    applyPosition();
    syncCapability();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    finePointer.addEventListener('change', syncCapability);
    reduceMotion.addEventListener('change', syncCapability);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      finePointer.removeEventListener('change', syncCapability);
      reduceMotion.removeEventListener('change', syncCapability);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={layerRef} className="cursor-glow" aria-hidden="true" />;
}

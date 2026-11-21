import React, { useEffect, useMemo, useState } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

/** Stable across the app lifecycle — ParticlesProvider requires this. */
async function initParticles(engine: Engine) {
  await loadSlim(engine);
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isFinePointer(): boolean {
  return window.matchMedia('(pointer: fine)').matches;
}

function isNarrowViewport(): boolean {
  return window.matchMedia('(max-width: 768px)').matches;
}

/**
 * Vincent Garreau Particles.js Default demo options
 * (https://vincentgarreau.com/particles.js/ → demo/particles.json)
 * Adapted only for a behind-UI transparent layer.
 */
function buildOptions(interactive: boolean, mobile: boolean): ISourceOptions {
  return {
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    detectRetina: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    interactivity: {
      detectsOn: 'window',
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: interactive,
          mode: 'repulse',
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        repulse: {
          distance: 200,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: 'ease-out-quad',
        },
      },
    },
    particles: {
      number: {
        value: mobile ? 14 : 28,
        density: {
          enable: true,
          width: 800,
          height: 800,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.28,
      },
      size: {
        value: { min: 1, max: 5 },
      },
      links: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        outModes: {
          default: 'out',
        },
      },
    },
    style: {
      pointerEvents: 'none',
    },
  };
}

/**
 * Official Particles.js Default demo feel:
 * floating linked dots + soft hover repulse.
 * Window mouse detection keeps the UI fully clickable.
 */
export function ParticlesBackground() {
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const sync = () => {
      const reduce = prefersReducedMotion();
      setEnabled(!reduce);
      setInteractive(!reduce && isFinePointer());
      setMobile(isNarrowViewport());
    };

    sync();

    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerMq = window.matchMedia('(pointer: fine)');
    const widthMq = window.matchMedia('(max-width: 768px)');

    reduceMq.addEventListener('change', sync);
    pointerMq.addEventListener('change', sync);
    widthMq.addEventListener('change', sync);

    return () => {
      reduceMq.removeEventListener('change', sync);
      pointerMq.removeEventListener('change', sync);
      widthMq.removeEventListener('change', sync);
    };
  }, []);

  const options = useMemo(
    () => buildOptions(interactive, mobile),
    [interactive, mobile],
  );

  if (!enabled) return null;

  return (
    <ParticlesProvider init={initParticles}>
      <Particles
        id="portfolio-particles"
        className="portfolio-particles"
        options={options}
      />
    </ParticlesProvider>
  );
}

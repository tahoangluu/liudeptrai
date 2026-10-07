import confetti from 'canvas-confetti';

export function fireCardCelebration() {
  if (typeof window === 'undefined') return;

  const count = 120;
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Romantic pink, rose, gold, champagne colors
  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#fef08a', '#fbbf24', '#ffffff', '#e879f9'];

  fire(0.25, {
    spread: 30,
    startVelocity: 55,
    colors,
  });

  fire(0.2, {
    spread: 60,
    colors,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.9,
    colors,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors,
  });

  fire(0.1, {
    spread: 140,
    startVelocity: 45,
    colors,
  });
}

export function fireGentleHearts() {
  if (typeof window === 'undefined') return;

  const end = Date.now() + 1500;
  const colors = ['#f43f5e', '#ec4899', '#fda4af', '#fef08a'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
      shapes: ['circle'],
      scalar: 1.2,
      zIndex: 9999,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
      shapes: ['circle'],
      scalar: 1.2,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

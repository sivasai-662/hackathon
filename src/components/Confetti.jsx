import { useEffect, useRef } from "react";

// Lottie-based confetti wrapper with graceful fallback.
export default function Confetti({ show = false, assetPath = '/lottie/confetti.json' }) {
  const container = useRef(null);
  const anim = useRef(null);

  useEffect(() => {
    let cancelled = false;
    if (!show) {
      // clear instance if exists
      if (anim.current && anim.current.destroy) anim.current.destroy();
      return;
    }

    // try to dynamically import lottie-web; if not available, do small fallback animation
    import('lottie-web').then((lottie) => {
      if (cancelled) return;
      try {
        anim.current = lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: assetPath,
        });
        // auto cleanup after playing
        setTimeout(() => { if (anim.current && anim.current.destroy) anim.current.destroy(); }, 4200);
      } catch (err) {
        // fallback: nothing
        console.warn('Lottie failed to play confetti:', err);
      }
    }).catch(() => {
      // lottie not installed — graceful no-op fallback
      // (the project previously had a lightweight CSS confetti; keep simple fallback)
      const el = container.current;
      if (!el) return;
      const colors = ['#ffd700','#00b4d8','#90e0ef','#00c853','#ff6b6b','#9b5de5'];
      const pieces = Array.from({ length: 24 }).map((_, i) => {
        const span = document.createElement('span');
        span.className = 'confetti';
        span.style.left = `${Math.random() * 100}%`;
        span.style.background = colors[i % colors.length];
        span.style.animationDelay = `${Math.random() * 0.6}s`;
        el.appendChild(span);
        return span;
      });
      setTimeout(() => pieces.forEach(p => p.remove()), 2200);
    });

    return () => { cancelled = true; if (anim.current && anim.current.destroy) anim.current.destroy(); };
  }, [show, assetPath]);

  if (!show) return null;

  return (
    <div aria-hidden className="confetti-root" ref={container} />
  );
}

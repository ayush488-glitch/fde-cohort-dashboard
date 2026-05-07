/* global React */
const { useEffect, useRef, useState } = React;

// IntersectionObserver helper — adds .in to elements with .reveal-on-scroll
function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    const els = root.querySelectorAll(".reveal-on-scroll");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.01, rootMargin: "0px 0px -5% 0px" });
    els.forEach(el => io.observe(el));
    // Safety: any reveal element still un-revealed after 3s gets shown anyway.
    // Protects against tall elements on short viewports never clearing the threshold.
    const t = setTimeout(() => {
      els.forEach(el => { if (!el.classList.contains("in")) el.classList.add("in"); });
    }, 3000);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [rootRef]);
}

// Ease-out count-up for numerals
function CountUp({ to, duration = 1400, prefix = "", suffix = "", decimals = 0, className = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setV(to * eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) run(); });
    }, { threshold: 0.01 });
    io.observe(el);
    // Safety fallback: if observer hasn't fired in 2s (e.g. element off-screen on mobile), snap to value.
    const fallback = setTimeout(() => { if (!started.current) { started.current = true; setV(to); } }, 2000);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [to, duration]);
  const display = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
  return <span ref={ref} className={className}>{prefix}{display}{suffix}</span>;
}

window.useReveal = useReveal;
window.CountUp = CountUp;

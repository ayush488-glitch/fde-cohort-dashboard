/* global React */
const { useEffect, useRef, useState } = React;

// IntersectionObserver helper — adds .in to elements with .reveal-on-scroll
function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    const els = root.querySelectorAll(".reveal-on-scroll");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

// Ease-out count-up for numerals
function CountUp({ to, duration = 1400, prefix = "", suffix = "", decimals = 0, className = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setV(to * eased);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  const display = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
  return <span ref={ref} className={className}>{prefix}{display}{suffix}</span>;
}

window.useReveal = useReveal;
window.CountUp = CountUp;

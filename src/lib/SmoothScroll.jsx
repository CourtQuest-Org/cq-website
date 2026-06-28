import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

/** Access the shared Lenis instance (for anchor scrolling). */
export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const instance = new Lenis({
      duration: reduce ? 0 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
    });
    setLenis(instance);

    const raf = (time) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

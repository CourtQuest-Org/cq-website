import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import Logo from "./Logo";
import { useLenis } from "../lib/SmoothScroll";
import { APP_STORE_URL } from "../lib/links";
import "./Navbar.css";

const LINKS = [
  { label: "The App", href: "#about" },
  { label: "About Us", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [collapsed, setCollapsed] = useState(false);
  const [pinging, setPinging] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();
  const wasCollapsed = useRef(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > window.innerHeight * 0.6;
    if (next !== wasCollapsed.current) {
      wasCollapsed.current = next;
      setCollapsed(next);
      if (next) {
        setPinging(true);
        setTimeout(() => setPinging(false), 650);
      }
    }
  });

  const go = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="nav-float">
      <a
        href="#home"
        className="nav-pill nav-pill-logo"
        aria-label="CourtQuest — home"
        onClick={(e) => go(e, "#home")}
      >
        <Logo collapsed={collapsed} pinging={pinging} />
      </a>

      <nav className="nav-pills-group">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="nav-pill nav-pill-link"
            onClick={(e) => go(e, l.href)}
          >
            {l.label}
          </a>
        ))}

        <a
          href={APP_STORE_URL}
          className="nav-pill nav-pill-cta"
          target="_blank"
          rel="noreferrer"
        >
          Get the app
        </a>
      </nav>

      <button
        type="button"
        className={`nav-pill nav-burger${menuOpen ? " is-open" : ""}`}
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="nav-burger-bars" aria-hidden="true">
          <span /><span /><span />
        </span>
      </button>

      {menuOpen && (
        <>
          <div
            className="nav-menu-scrim"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <nav className="nav-menu">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-menu-link"
                onClick={(e) => go(e, l.href)}
              >
                {l.label}
              </a>
            ))}

            <a
              href={APP_STORE_URL}
              className="nav-menu-link nav-menu-cta"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Get the app
            </a>
          </nav>
        </>
      )}
    </div>
  );
}

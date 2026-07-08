import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import Logo from "./Logo";
import { useLenis } from "../lib/SmoothScroll";
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
  const lenis = useLenis();
  const wasCollapsed = useRef(false);

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
      </nav>
    </div>
  );
}

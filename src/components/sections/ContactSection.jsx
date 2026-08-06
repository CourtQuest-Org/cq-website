import { useRef } from "react";
import { Mail, Camera, Heart, Apple } from "lucide-react";
import { APP_STORE_URL } from "../../lib/links";
import {
  trackAppStore,
  trackEmail,
  trackFollow,
  trackSupport,
  trackPrivacy,
  useSectionView,
  PLACEMENTS,
} from "../../lib/analytics";
import "./ContactSection.css";

const LINKS = [
  {
    icon: Apple,
    label: "Get the app",
    value: "Download on iOS",
    href: APP_STORE_URL,
    track: trackAppStore,
  },
  {
    icon: Mail,
    label: "Email us",
    value: "enhanceyourquest@gmail.com",
    href: "mailto:enhanceyourquest@gmail.com",
    track: trackEmail,
  },
  {
    icon: Camera,
    label: "Follow",
    value: "@courtquest",
    href: "https://www.instagram.com/courtquest/",
    track: trackFollow,
  },
  {
    icon: Heart,
    label: "Support",
    value: "Buy us a Coffee!",
    href: "https://buymeacoffee.com/courtquest",
    track: trackSupport,
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  useSectionView(ref, "contact");

  return (
    <section id="contact" className="scene contact-scene" ref={ref}>
      <div className="scene-inner">
        <h2 className="contact-title">
          Elevate your play,
          <br />
          <em>embrace the quest.</em>
        </h2>

        <ul className="contact-links">
          {LINKS.map(({ icon: Icon, label, value, href, track }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                onClick={() => track(PLACEMENTS.CONTACT)}
              >
                <span className="contact-meta">
                  <Icon size={16} strokeWidth={1.6} />
                  {label}
                </span>
                <span className="contact-value">{value}</span>
                <span className="contact-arrow">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="contact-foot">
          <span>CourtQuest © 2026</span>
          <a
            className="contact-legal"
            href="/privacy.html"
            onClick={() => trackPrivacy(PLACEMENTS.FOOTER)}
          >
            Privacy Policy
          </a>
          <a
            className="contact-legal"
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackAppStore(PLACEMENTS.FOOTER)}
          >
            Now on the App Store
          </a>
        </footer>
      </div>
    </section>
  );
}

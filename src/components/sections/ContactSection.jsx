import { Mail, Camera, Heart } from "lucide-react";

const LINKS = [
  {
    icon: Mail,
    label: "Email us",
    value: "enhanceyourquest@gmail.com",
    href: "mailto:enhanceyourquest@gmail.com",
  },
  {
    icon: Camera,
    label: "Follow",
    value: "@courtquest",
    href: "https://www.instagram.com/courtquest/",
  },
  {
    icon: Heart,
    label: "Support",
    value: "Back the quest",
    href: "https://gofund.me/aef0dc55",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="scene contact-scene">
      <div className="scene-inner">
        <h2 className="contact-title">
          Elevate your play,
          <br />
          <em>embrace the quest.</em>
        </h2>

        <ul className="contact-links">
          {LINKS.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
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
          <span>iOS app coming soon</span>
        </footer>
      </div>
    </section>
  );
}

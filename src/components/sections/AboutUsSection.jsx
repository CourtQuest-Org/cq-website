import { motion } from "motion/react";
import BrandName from "../BrandName";
import "./AboutUsSection.css";

const TEAM = [
  { name: "Aadhya Mittapalli", role: "Co-Founder" },
  { name: "Vedant Chaudhari", role: "Co-Founder" },
  { name: "Vihaan Kerekatte", role: "Co-Founder" },
  { name: "Jia Mathur", role: "Marketing & Outreach" },
  { name: "Vedanth Iyengar", role: "Finance" },
];

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export default function AboutUsSection() {
  return (
    <section id="team" className="scene team-scene">
      <div className="scene-inner">
        <header className="scene-head">
          <h2 className="scene-title">
            A team building the fastest way to <em>get on court.</em>
          </h2>
          <p className="scene-lead">
            We're players first — frustrated by full courts and wasted drives.{" "}
            <BrandName /> is the tool we wanted, built by the people who needed it.
          </p>
        </header>

        <ul className="roster">
          {TEAM.map((m, i) => (
            <motion.li
              key={m.name}
              className="roster-row"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="roster-avatar" aria-hidden="true">
                {initials(m.name)}
              </span>
              <span className="roster-name">{m.name}</span>
              <span className="roster-role">{m.role}</span>
              <span className="roster-idx">{String(i + 1).padStart(2, "0")}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

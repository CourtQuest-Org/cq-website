import { motion } from "motion/react";
import { MapPin, MousePointerClick, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: MapPin,
    no: "01",
    title: "Find courts fast",
    body: "See open courts near you in real time, powered by live availability and accurate Google Maps routing. No more circling busy lots or guessing which court is free.",
  },
  {
    icon: MousePointerClick,
    no: "02",
    title: "Just one button",
    body: "Pick your sport, press once, and CourtQuest scores every nearby court by travel time and how busy it is — then sends you to the best one. That simple.",
  },
  {
    icon: Sparkles,
    no: "03",
    title: "More sports, soon",
    body: "Tennis today, with more courts and sports rolling out. Every quest you take helps the map get smarter.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutAppSection() {
  return (
    <section id="about" className="scene app-scene">
      <div className="scene-inner">
        <header className="scene-head">
          <span className="hud-label">02 — The App</span>
          <h2 className="scene-title">
            One tap between you and <em>open play.</em>
          </h2>
          <p className="scene-lead">
            CourtQuest turns the hunt for a free court into a single decision.
            It blends where you are, how far you'll travel, and how busy each
            court is — and hands you the answer.
          </p>
        </header>

        <div className="feature-rail">
          {FEATURES.map(({ icon: Icon, no, title, body }) => (
            <motion.article
              key={no}
              className="feature-card"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="feature-no">{no}</span>
              <Icon className="feature-ic" size={26} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

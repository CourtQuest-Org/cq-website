import { motion } from "motion/react";
import { MapPin, MousePointerClick, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: MapPin,
    no: "01",
    title: "Find courts fast",
    body: "See open courts near you in real time, powered by live availability and accurate routing. No more circling busy lots or pulling up to a full court.",
  },
  {
    icon: MousePointerClick,
    no: "02",
    title: "Just one button",
    body: "Pick your sport, press once. CourtQuest scores every nearby court by travel time and how busy it is — then sends you straight to the best one. That simple.",
  },
  {
    icon: Sparkles,
    no: "03",
    title: "More sports, soon",
    body: "Tennis first. More courts and sports rolling out as we grow. Every quest you take helps the map get smarter for everyone.",
  },
];

export default function AboutAppSection() {
  return (
    <section id="about" className="scene app-scene">
      <div className="scene-inner">
        <header className="scene-head">
          <h2 className="scene-title">
            One tap between you and <em>open play.</em>
          </h2>
          <p className="scene-lead">
            You shouldn't have to drive around guessing which courts are open.
            CourtQuest blends your location, travel time, and live busyness
            data — and just hands you the answer.
          </p>
        </header>

        <div className="feature-list">
          {FEATURES.map(({ icon: Icon, no, title, body }, i) => (
            <motion.div
              key={no}
              className="feature-row"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.25, 1, 0.4, 1] }}
            >
              <span className="feature-row-no">{no}</span>
              <div className="feature-row-content">
                <Icon className="feature-row-icon" size={22} strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

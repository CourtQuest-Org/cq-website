import { motion } from "motion/react";
import { MapPin, MousePointerClick, Sparkles } from "lucide-react";
import appMap from "../../assets/app-map.jpg";
import appSports from "../../assets/app-sports.jpg";
import appCourt from "../../assets/app-court.jpg";

const FEATURES = [
  {
    icon: MapPin,
    no: "01",
    title: "Find courts fast",
    body: "See open courts near you in real time, powered by updated availability and accurate routing. No more circling busy lots or pulling up to a full court.",
    image: appMap,
    imageAlt: "CourtQuest map with a ranked list of nearby tennis courts",
  },
  {
    icon: MousePointerClick,
    no: "02",
    title: "Just one button",
    body: "Pick your sport, press once. CourtQuest scores every nearby court by travel time and how busy it is — then sends you straight to the best one.",
    image: appCourt,
    imageAlt: "CourtQuest court detail screen showing courts and busyness",
  },
  {
    icon: Sparkles,
    no: "03",
    title: "Built for every game",
    body: "Supporting tennis, pickleball, basketball, and more — CourtQuest already speaks your sport. New courts get added regularly, so the map keeps growing right alongside your quests.",
    image: appSports,
    imageAlt: "CourtQuest sport selection screen",
  },
];

// Render text with the "Quest" in every "CourtQuest" accented in brand pink.
function accentQuest(text) {
  return text.split("CourtQuest").flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <span key={i}>
            Court<span className="accent">Quest</span>
          </span>,
          part,
        ]
  );
}

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
            Court<span className="accent">Quest</span> blends your location, travel time, and busyness
            data — so you can start the quest.
          </p>
        </header>

        <div className="feature-list">
          {FEATURES.map(({ icon: Icon, no, title, body, image, imageAlt }, i) => (
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
                <p>{accentQuest(body)}</p>
              </div>
              {image && (
                <div className="feature-row-shot">
                  <img src={image} alt={imageAlt} loading="lazy" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

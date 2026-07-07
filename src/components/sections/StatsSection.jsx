import { motion } from "motion/react";

const STATS = [
  {
    value: "One tap",
    label: "From your location to an open court",
  },
  {
    value: "Trusted data",
    label: "Availability you can count on",
  },
  {
    value: "Zero guessing",
    label: "We find it. You just show up.",
  },
];

export default function StatsSection() {
  return (
    <section className="stats-scene">
      <div className="stats-inner">
        {STATS.map(({ value, label }, i) => (
          <motion.div
            key={value}
            className="stat-item"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, delay: i * 0.1, ease: [0.25, 1, 0.4, 1] }}
          >
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

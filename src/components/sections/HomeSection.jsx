import { motion } from "motion/react";

const line = {
  hidden: { y: "110%" },
  visible: (i) => ({
    y: "0%",
    transition: { delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HomeSection() {
  return (
    <section id="home" className="scene home">
      <div className="grid-bg" />
      <div className="home-radar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="scene-inner home-inner">
        <span className="hud-label">01 — Locate</span>

        <h1 className="home-title">
          {["Find your court.", "Start your quest."].map((t, i) => (
            <span className="line-mask" key={t}>
              <motion.span
                className="line"
                custom={i}
                variants={line}
                initial="hidden"
                animate="visible"
              >
                {t}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="home-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          The nearest, least-busy court — in one tap. CourtQuest reads live court
          data and your location to send you straight to open play.
        </motion.p>

        <motion.div
          className="home-cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="pill">
            <span className="pill-dot" /> iOS app — coming soon
          </span>
          <a
            className="btn-ghost"
            href="https://courtquest.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Try the web beta ↗
          </a>
        </motion.div>
      </div>

      <a href="#about" className="scroll-cue" aria-hidden="true">
        <span>Scroll to explore</span>
        <span className="scroll-cue-line" />
      </a>
    </section>
  );
}

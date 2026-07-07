import { motion } from "motion/react";
import court1  from "../../assets/tenniscourt1.png";
import court2  from "../../assets/tenniscourt2.jpg";
import court3  from "../../assets/tenniscourt3.jpg";
import court4  from "../../assets/tenniscourt4.webp";
import court5  from "../../assets/tenniscourt5.jpg";
import court6  from "../../assets/tenniscourt6.avif";
import court7  from "../../assets/tenniscourt7.webp";
import court8 from "../../assets/tenniscourt8.jpg";
import court9 from "../../assets/tenniscourt9.avif";
import court10 from "../../assets/tenniscourt10.avif";
import court11 from "../../assets/tenniscourt11.jpg";
import court12 from "../../assets/tenniscourt12.avif";

const COURTS = [
  { src: court1,  location: "Miami, Florida"                },
  { src: court2,  location: "Sedona, Arizona"               },
  { src: court3,  location: "Maldives"                      },
  { src: court4,  location: "Paris, France"                 },
  { src: court5,  location: "Bouton, Saint Lucia"           },
  { src: court6,  location: "Rancho Santa Fe, California"   },
  { src: court7,  location: "Burj Al Arab, Dubai"           },
  { src: court8, location: "Borrego Springs, California"   },
  { src: court9, location: "Positano, Italy"               },
  { src: court10, location: "British Virgin Islands"        },
  { src: court11, location: "Borrego Springs, California"   },
  { src: court12, location: "Queens, New York"              },
];

export default function HomeSection() {
  return (
    <section id="home" className="scene home">

      {/* Full-bleed 6×2 photo grid */}
      <div className="home-gallery">
        {COURTS.map(({ src, location }, i) => (
          <motion.div
            key={location}
            className="court-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.8, ease: "easeOut" }}
          >
            <img src={src} alt={location} loading={i > 6 ? "lazy" : "eager"} />
            <div className="court-card-glass" />
            <div className="court-card-label">{location}</div>
          </motion.div>
        ))}
      </div>

      {/* Dark vignette so text pops */}
      <div className="home-overlay" aria-hidden="true" />

      {/* Text centered over the full grid */}
      <div className="home-content">
        <h1 className="home-title">
          {["Start your quest"].map((t, i) => (
            <span className="line-mask" key={t}>
              <motion.span
                className="line"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.3 + i * 0.14,
                  duration: 0.95,
                  ease: [0.25, 1, 0.4, 1],
                }}
              >
                Start your <span className="accent">quest</span>
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="home-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9, ease: [0.25, 1, 0.4, 1] }}
        >
          No more wasted drives. No more full courts.<br />
          CourtQuest locates the nearest court so you can start your quest.
        </motion.p>

        <motion.p
          className="home-badge"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9, ease: [0.25, 1, 0.4, 1] }}
        >
          Coming soon to iOS
        </motion.p>
      </div>

      <a
        href="#about"
        className="scroll-cue"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById("about");
          if (!target) return;
          const startY = window.scrollY;
          const destY = startY + target.getBoundingClientRect().top;
          const duration = 1400; // ms — higher = slower
          const startTime = performance.now();
          const easeInOut = (t) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const step = (now) => {
            const p = Math.min((now - startTime) / duration, 1);
            window.scrollTo(0, startY + (destY - startY) * easeInOut(p));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }}
      >
        <span>Scroll to explore</span>
        <span className="scroll-cue-line" />
      </a>
    </section>
  );
}

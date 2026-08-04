import { motion } from "motion/react";
import BrandName from "../BrandName";
import { EASE } from "../../lib/motion";
import { APP_STORE_URL } from "../../lib/links";
import "./HomeSection.css";

// Gallery photos resolved by filename — add/remove an entry below and drop the
// matching file in assets/; no separate import block to keep in sync.
const images = import.meta.glob("../../assets/tenniscourt*", {
  eager: true,
  import: "default",
});
const src = (file) => images[`../../assets/${file}`];

const COURTS = [
  { file: "tenniscourt1.png",  location: "Miami, Florida"                },
  { file: "tenniscourt2.jpg",  location: "Sedona, Arizona"               },
  { file: "tenniscourt3.jpg",  location: "Maldives"                      },
  { file: "tenniscourt4.webp", location: "Paris, France"                 },
  { file: "tenniscourt5.jpg",  location: "Bouton, Saint Lucia"           },
  { file: "tenniscourt6.avif", location: "Rancho Santa Fe, California"   },
  { file: "tenniscourt7.webp", location: "Burj Al Arab, Dubai"           },
  { file: "tenniscourt8.jpg",  location: "Borrego Springs, California"   },
  { file: "tenniscourt9.avif", location: "Positano, Italy"               },
  { file: "tenniscourt10.avif", location: "British Virgin Islands"       },
  { file: "tenniscourt11.jpg", location: "Borrego Springs, California"   },
  { file: "tenniscourt12.avif", location: "Queens, New York"             },
];

export default function HomeSection() {
  return (
    <section id="home" className="scene home">

      {/* Full-bleed 6×2 photo grid */}
      <div className="home-gallery">
        {COURTS.map(({ file, location }, i) => (
          <motion.div
            key={file}
            className="court-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.8, ease: "easeOut" }}
          >
            <img src={src(file)} alt={location} loading={i > 6 ? "lazy" : "eager"} />
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
                  ease: EASE,
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
          transition={{ delay: 0.75, duration: 0.9, ease: EASE }}
        >
          No more wasted drives. No more full courts.<br />
          <BrandName /> locates the nearest court so you can start your quest.
        </motion.p>

        <motion.a
          className="home-badge"
          href={APP_STORE_URL}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9, ease: EASE }}
        >
          DOWNLOAD ON iOS
          <span className="home-badge-arrow">↗</span>
        </motion.a>
      </div>
    </section>
  );
}

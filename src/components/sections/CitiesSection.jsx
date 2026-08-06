import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { PINS } from "../../lib/usMap";
import useSheetCities from "../../lib/useSheetCities";
import { useSectionView } from "../../lib/analytics";
import "./CitiesSection.css";

// A single city chip — status dot, city, state abbreviation.
function CityChip({ city, live }) {
  const [name, abbr] = city.split(", ");
  return (
    <span className={`chip ${live ? "chip--live" : "chip--soon"}`}>
      <span className="chip-dot" />
      <span className="chip-name">{name}</span>
      <span className="chip-abbr">{abbr}</span>
    </span>
  );
}

// Belt speed in pixels per second. Paced by distance rather than by a fixed
// cycle time so the chips drift at the same rate no matter how many cities the
// sheet returns or how many copies it takes to fill the viewport.
const SCROLL_SPEED = 55;

// Shown until the sheet responds, and kept if the fetch fails — real cities,
// just static, so the belt never renders as an empty band.
const FALLBACK_LIVE = PINS.filter((p) => p.status === "Done");
const FALLBACK_SOON = PINS.filter((p) => p.status !== "Done");

export default function CitiesSection() {
  const sectionRef = useRef(null);
  useSectionView(sectionRef, "cities");

  const trackRef = useRef(null);
  // How many copies of the city list fill each half of the track. The -50%
  // loop only looks continuous while one half is at least as wide as the
  // viewport — otherwise the tail runs out mid-screen and leaves a bare
  // stretch. Two is the floor; wide screens need more.
  const [setsPerHalf, setSetsPerHalf] = useState(2);
  // Measured width of one copy of the list, used to derive the cycle time.
  const [setWidth, setSetWidth] = useState(0);

  const sheet = useSheetCities();
  // The hook already applies the STATUS === "Done" test. Only take over from
  // the fallback once a fetch has actually produced cities.
  const hasSheet = sheet.live.length > 0 || sheet.upcoming.length > 0;
  const live = hasSheet ? sheet.live : FALLBACK_LIVE;
  const soon = hasSheet ? sheet.upcoming : FALLBACK_SOON;

  const states = new Set(live.map((c) => c.city.split(", ")[1]).filter(Boolean));

  // Live cities first, then upcoming.
  const cities = [...live, ...soon];
  const loop = Array.from({ length: setsPerHalf * 2 }, () => cities).flat();
  // One cycle travels half the track, i.e. `setsPerHalf` copies of the list.
  const duration = setWidth
    ? (setWidth * setsPerHalf) / SCROLL_SPEED
    : undefined;

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const width = track.scrollWidth / (setsPerHalf * 2);
      if (!width) return;
      setSetWidth(width);
      setSetsPerHalf(Math.max(2, Math.ceil(window.innerWidth / width) + 1));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // Re-measure when the sheet swaps in a different number of cities.
  }, [setsPerHalf, cities.length]);

  return (
    <section className="cov-scene" id="cities" ref={sectionRef}>
      <div className="cov-inner">
        <span className="cov-eyebrow">Our coverage</span>
        <p className="cov-line">
          <MapPin size={16} strokeWidth={2.4} className="cov-pin" />
          Live in <strong>{live.length}</strong> cities across{" "}
          <strong>{states.size}</strong> states — more on the way.
        </p>
      </div>

      <div className="belt">
        <div
          className="belt-track"
          ref={trackRef}
          style={duration ? { animationDuration: `${duration}s` } : undefined}
        >
          {loop.map((c, i) => (
            <CityChip
              key={`${c.city}-${i}`}
              city={c.city}
              live={c.status === "Done"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

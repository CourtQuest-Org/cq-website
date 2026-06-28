import { AnimatePresence, motion } from "motion/react";
import pin from "/cqlogo.png";

const PRE = ["C"];
const MID = ["O", "U", "R", "T"];
const POST = ["U", "E", "S", "T"];

const letterVariants = {
  hidden: { width: 0, opacity: 0, filter: "blur(6px)", x: -4 },
  visible: { width: "auto", opacity: 1, filter: "blur(0px)", x: 0 },
};

function Letters({ letters }) {
  return letters.map((ch, i) => (
    <motion.span
      key={i}
      variants={letterVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "inline-block", overflow: "hidden" }}
    >
      {ch}
    </motion.span>
  ));
}

/**
 * Wordmark: COURT[Q]UEST where Q is the app pin.
 * When `collapsed`, OURT and UEST fade out to leave C + pin-Q (CQ).
 */
export default function Logo({ collapsed = false, pinging = false }) {
  return (
    <motion.span className="logo-mark" layout>
      <motion.span className="logo-word" layout>
        <Letters letters={PRE} />
        <AnimatePresence initial={false}>
          {!collapsed && <Letters letters={MID} key="mid" />}
        </AnimatePresence>

        <span className="logo-q" aria-hidden="true">
          <img src={pin} alt="" className="logo-pin" />
          <span className={`logo-ping ${pinging ? "is-on" : ""}`} />
        </span>

        <AnimatePresence initial={false}>
          {!collapsed && <Letters letters={POST} key="post" />}
        </AnimatePresence>
      </motion.span>
    </motion.span>
  );
}

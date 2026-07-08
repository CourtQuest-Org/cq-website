// The CourtQuest wordmark: black "Court" + pink "Quest".
// Colors are driven by the `.court-dark` / `.accent` classes so each context
// (hero, cards, body copy) can restyle them via CSS.
export default function BrandName() {
  return (
    <>
      <span className="court-dark">Court</span>
      <span className="accent">Quest</span>
    </>
  );
}

// Render a plain string, replacing every "CourtQuest" with the branded markup.
export function withBrand(text) {
  return text
    .split("CourtQuest")
    .flatMap((part, i) => (i === 0 ? [part] : [<BrandName key={i} />, part]));
}

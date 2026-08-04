import { useEffect, useState } from "react";

// Reads the CourtQuest "current app data" tab, published as CSV via Google
// Sheets' "Publish to web". That URL is served from Google's CDN with no API
// quota, so it scales to unlimited visitors. Splits cities into `live`
// (STATUS === "Done") and `upcoming` (anything else, e.g. "Data Collection").
//
// The tab is expected to have a header row followed by:
//   CITY | STATUS | SCRAPE STATUS
//
// The link below is the public "Publish to web" CSV URL (not a secret). To
// regenerate: sheet > File > Share > Publish to web > pick the city tab >
// Comma-separated values (.csv) > Publish, then paste the link here.
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJDVtN9QX9ATQ8CmnbTTITA7bA6Ukmz4EOKDNrCQEhECeX0GVr146nZhLNaUUhf1COEi4_BFTwGY_c/pub?gid=1177847975&single=true&output=csv";

// Re-fetch periodically so the belt updates without a page reload. Published
// CSV propagates changes in ~5 min, so polling faster buys nothing.
const REFRESH_MS = 5 * 60 * 1000;

const isLive = (status) => (status || "").trim().toLowerCase() === "done";

// Minimal RFC-4180 CSV parser — handles quoted fields (city names contain
// commas, e.g. "Houston, TX"), escaped quotes, and \r\n line endings.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }
  // Flush trailing field/row (files may not end in a newline).
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function toCities(rows) {
  if (rows.length < 2) return [];
  // Drop the header row; keep rows that have a city name.
  return rows
    .slice(1)
    .map((r) => ({
      city: (r[0] || "").trim(),
      status: (r[1] || "").trim(),
      date: (r[2] || "").trim(),
    }))
    .filter((c) => c.city);
}

export default function useSheetCities() {
  const [state, setState] = useState({
    live: [],
    upcoming: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!CSV_URL || CSV_URL.startsWith("PASTE_")) {
      setState({
        live: [],
        upcoming: [],
        loading: false,
        error: "missing-config",
      });
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        // Cache-bust so a browser doesn't serve a stale copy for hours.
        const res = await fetch(`${CSV_URL}&_cb=${Date.now()}`);
        if (!res.ok) throw new Error(`CSV ${res.status}`);
        const text = await res.text();
        if (cancelled) return;
        const cities = toCities(parseCSV(text));
        setState({
          live: cities.filter((c) => isLive(c.status)),
          upcoming: cities.filter((c) => !isLive(c.status)),
          loading: false,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setState((s) => ({ ...s, loading: false, error: err.message }));
      }
    }

    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return state;
}

// Every analytics event the site sends is named here. Call sites import these
// constants rather than passing raw strings, so the same action fired from
// several buttons lands on one event in the Vercel dashboard, split only by the
// `placement` property.
import { useEffect } from "react";
import { track } from "@vercel/analytics";

export const EVENTS = {
  APP_STORE_CLICK: "app_store_click",
  EMAIL_CLICK: "email_click",
  FOLLOW_CLICK: "follow_click",
  SUPPORT_CLICK: "support_click",
  PRIVACY_CLICK: "privacy_click",
  SECTION_VIEW: "section_view",
};

// Where an outbound link was clicked. Keeping the vocabulary closed means the
// dashboard breakdown stays readable instead of sprouting near-duplicates.
export const PLACEMENTS = {
  HERO: "hero",
  NAVBAR: "navbar",
  MOBILE_MENU: "mobile_menu",
  CONTACT: "contact",
  FOOTER: "footer",
};

export const trackAppStore = (placement) =>
  track(EVENTS.APP_STORE_CLICK, { placement });

export const trackEmail = (placement) =>
  track(EVENTS.EMAIL_CLICK, { placement });

export const trackFollow = (placement) =>
  track(EVENTS.FOLLOW_CLICK, { placement });

export const trackSupport = (placement) =>
  track(EVENTS.SUPPORT_CLICK, { placement });

export const trackPrivacy = (placement) =>
  track(EVENTS.PRIVACY_CLICK, { placement });

// Fires once the first time a section scrolls into view. Comparing counts
// across sections gives the drop-off funnel — how far down the page people get
// before they leave.
export function useSectionView(ref, section) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        track(EVENTS.SECTION_VIEW, { section });
        observer.disconnect();
      },
      // Sections are taller than the viewport, so a percentage threshold can
      // never be met. Trigger when the section covers the middle band of the
      // screen instead — that works whatever the section's height.
      { threshold: 0, rootMargin: "-35% 0px -35% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, section]);
}

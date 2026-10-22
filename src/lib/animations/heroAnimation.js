import { gsap } from "gsap";

const DESKTOP_SCROLL_DISTANCE = 2600;
const MOBILE_SCROLL_DISTANCE = 2100;
const SHORT_VIEWPORT_SCROLL_DISTANCE = 1700;
const MOBILE_BREAKPOINT = 768;
const CARD_REVEAL_START = 0.16;
const CARD_REVEAL_INTERVAL = 0.2;
const CARD_REVEAL_DURATION = 0.1;
const CAR_REVEAL_PROGRESS = 0.8;
const CAR_TEXT_CLEARANCE = 0.015;

export function createHeroAnimation({ root, track, car, trail, reveal }) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const statCards = gsap.utils.toArray(".hero-stat-card", root);
  const heading = reveal.querySelector(".hero-heading");

  const getRevealGeometry = () => {
    const trackBounds = track.getBoundingClientRect();
    const headingBounds = heading.getBoundingClientRect();
    const startX = car.offsetLeft;
    const intendedTravel = Math.max(0, track.clientWidth - startX);
    const textEnd = Math.min(
      track.clientWidth,
      Math.max(0, headingBounds.right - trackBounds.left),
    );
    const eightyPercentPosition = startX + intendedTravel * CAR_REVEAL_PROGRESS;
    const clearTextPosition = textEnd + track.clientWidth * CAR_TEXT_CLEARANCE;
    const carEndX = Math.min(
      track.clientWidth,
      Math.max(eightyPercentPosition, clearTextPosition),
    );

    return {
      carX: carEndX - startX,
      clipRightInset: 100 - (textEnd / track.clientWidth) * 100,
      trailScale: carEndX / track.clientWidth,
    };
  };

  gsap.set(statCards, { autoAlpha: 0, y: 20 });
  gsap.set(reveal, { clipPath: "inset(0 100% 0 0)" });
  gsap.from(car, { autoAlpha: 0, y: 12, duration: 0.7, ease: "power3.out" });

  const scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: () => {
        const distance = window.innerHeight < 500
          ? SHORT_VIEWPORT_SCROLL_DISTANCE
          : window.innerWidth < MOBILE_BREAKPOINT
            ? MOBILE_SCROLL_DISTANCE
            : DESKTOP_SCROLL_DISTANCE;
        return `+=${distance}`;
      },
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  });

  scrollTimeline
    .to(
      car,
      {
        x: () => getRevealGeometry().carX,
        duration: CAR_REVEAL_PROGRESS,
        ease: "none",
      },
      0,
    )
    .fromTo(
      trail,
      { scaleX: 0 },
      {
        scaleX: () => getRevealGeometry().trailScale,
        duration: CAR_REVEAL_PROGRESS,
        ease: "none",
      },
      0,
    )
    .fromTo(
      reveal,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: () => `inset(0 ${getRevealGeometry().clipRightInset}% 0 0)`,
        duration: CAR_REVEAL_PROGRESS,
        ease: "none",
      },
      0,
    )
    .to(
      reveal,
      {
        clipPath: () => `inset(0 ${getRevealGeometry().clipRightInset}% 0 0)`,
        duration: 1 - CAR_REVEAL_PROGRESS,
        ease: "none",
      },
      CAR_REVEAL_PROGRESS,
    );

  statCards.forEach((card, index) => {
    scrollTimeline.to(
      card,
      {
        autoAlpha: 1,
        y: 0,
        duration: CARD_REVEAL_DURATION,
        ease: "power1.out",
      },
      CARD_REVEAL_START + index * CARD_REVEAL_INTERVAL,
    );
  });
}

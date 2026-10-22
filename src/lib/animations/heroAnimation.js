import { gsap } from "gsap";

const DESKTOP_SCROLL_DISTANCE = 1300;
const MOBILE_SCROLL_DISTANCE = 900;
const MOBILE_BREAKPOINT = 700;
const CARD_REVEAL_START = 0.12;
const CARD_REVEAL_INTERVAL = 0.2;
const CARD_REVEAL_DURATION = 0.12;

export function createHeroAnimation({ root, track, car, trail }) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const headingLetters = gsap.utils.toArray(".hero-heading__letter", root);
  const statCards = gsap.utils.toArray(".hero-stat-card", root);

  gsap.set(statCards, { autoAlpha: 0, y: 20 });

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .from(headingLetters, {
      autoAlpha: 0,
      y: 16,
      duration: 0.65,
      stagger: 0.025,
    })
    .from(car, { autoAlpha: 0, y: 12, duration: 0.7 }, 0.12);

  const scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: () =>
        `+=${window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_SCROLL_DISTANCE : DESKTOP_SCROLL_DISTANCE}`,
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
        x: () => {
          const rightPadding = track.clientWidth * 0.035;
          return Math.max(
            0,
            track.clientWidth - car.offsetLeft - car.offsetWidth - rightPadding,
          );
        },
        duration: 1,
        ease: "none",
      },
      0,
    )
    .fromTo(
      trail,
      { scaleX: 0.12 },
      { scaleX: 1, duration: 1, ease: "none" },
      0,
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

"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createHeroAnimation } from "@/lib/animations/heroAnimation";
import HeroStats from "./HeroStats";
import ScrollVisual from "./ScrollVisual";

export default function Hero() {
  const heroRef = useRef(null);
  const trackRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const revealRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      createHeroAnimation({
        root: heroRef.current,
        track: trackRef.current,
        car: carRef.current,
        trail: trailRef.current,
        reveal: revealRef.current,
      });
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <main className="hero-stage" ref={heroRef}>
      <HeroStats group="upper" />
      <ScrollVisual
        trackRef={trackRef}
        carRef={carRef}
        trailRef={trailRef}
        revealRef={revealRef}
      />
      <HeroStats group="lower" />
    </main>
  );
}

"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createHeroAnimation } from "@/lib/animations/heroAnimation";
import HeroHeading from "./HeroHeading";
import HeroStats from "./HeroStats";
import ScrollVisual from "./ScrollVisual";

export default function Hero() {
  const heroRef = useRef(null);
  const trackRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      createHeroAnimation({
        root: heroRef.current,
        track: trackRef.current,
        car: carRef.current,
        trail: trailRef.current,
      });
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <main className="hero-stage" ref={heroRef}>
      <HeroHeading />
      <HeroStats group="upper" />
      <ScrollVisual trackRef={trackRef} carRef={carRef} trailRef={trailRef} />
      <HeroStats group="lower" />
    </main>
  );
}

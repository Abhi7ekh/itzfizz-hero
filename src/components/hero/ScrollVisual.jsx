import Image from "next/image";
import HeroHeading from "./HeroHeading";

export default function ScrollVisual({ trackRef, carRef, trailRef, revealRef }) {
  return (
    <div className="scroll-visual" aria-label="ITZFIZZ branded car moving along a highlight">
      <div className="scroll-visual__road" ref={trackRef}>
        <div className="scroll-visual__reveal" ref={revealRef}>
          <HeroHeading />
        </div>
        <div className="scroll-visual__trail" aria-hidden="true" ref={trailRef} />
        <div className="hero-car" ref={carRef}>
          <Image
            className="hero-car__image"
            src="/images/itzfizz-car-transparent.png"
            alt="ITZFIZZ branded sports car"
            width={2131}
            height={643}
            priority
            sizes="(max-width: 767px) 76vw, (max-width: 1200px) 52vw, 688px"
          />
        </div>
      </div>
    </div>
  );
}

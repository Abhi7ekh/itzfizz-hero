import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollVisual({ trackRef, carRef, trailRef }) {
  return (
    <div className="scroll-visual" aria-label="ITZFIZZ branded car moving along a highlight">
      <div className="scroll-visual__road" ref={trackRef}>
        <div className="scroll-visual__trail" aria-hidden="true" ref={trailRef} />
        <div className="hero-car" ref={carRef}>
          <Image
            className="hero-car__image"
            src="/images/itzfizz-car-transparent.png"
            alt="ITZFIZZ branded sports car"
            width={2131}
            height={643}
            priority
            unoptimized
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
      </div>
    </div>
  );
}

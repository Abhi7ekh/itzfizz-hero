const headingWords = ["WELCOME", "ITZFIZZ"];

export default function HeroHeading() {
  return (
    <h1 className="hero-heading" aria-label="Welcome ITZFIZZ">
      <span className="hero-heading__line" aria-hidden="true">
        {headingWords.map((word) => (
          <span className="hero-heading__word" key={word}>
            {Array.from(word, (letter, index) => (
              <span className="hero-heading__letter" key={`${letter}-${index}`}>
                {letter}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}

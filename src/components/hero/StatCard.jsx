export default function StatCard({ description, revealSide, tone, value }) {
  return (
    <article className={`hero-stat-card hero-stat-card--${tone} hero-stat-card--${revealSide}`}>
      <p className="hero-stat-card__value">{value}</p>
      <p className="hero-stat-card__description">{description}</p>
    </article>
  );
}

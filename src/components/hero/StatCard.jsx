export default function StatCard({ description, tone, value }) {
  return (
    <article className={`hero-stat-card hero-stat-card--${tone}`}>
      <p className="hero-stat-card__value">{value}</p>
      <p className="hero-stat-card__description">{description}</p>
    </article>
  );
}

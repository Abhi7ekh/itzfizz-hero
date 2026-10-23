import { heroStats } from "@/data/heroStats";
import StatCard from "./StatCard";

export default function HeroStats({ group }) {
  const stats = group === "upper" ? heroStats.slice(0, 2) : heroStats.slice(2);

  return (
    <section
      className={`hero-stats hero-stats--${group}`}
      aria-label={group === "upper" ? "First impact statistics" : "Additional impact statistics"}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.id}
          {...stat}
          revealSide={index === 0 ? "left" : "right"}
        />
      ))}
    </section>
  );
}

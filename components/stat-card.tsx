"use client";

import { Dumbbell, Flame, Footprints } from "lucide-react";
import "./stat-card.scss";

type StatType = "workout" | "calories" | "steps";

const iconFor: Record<StatType, React.ComponentType<any>> = {
  workout: Dumbbell,
  calories: Flame,
  steps: Footprints
};

const bgFor: Record<StatType, string> = {
  workout: "stat--blue",
  calories: "stat--orange",
  steps: "stat--purple"
};

interface Props {
  type: StatType;
  title: string;
  value: string;
  subtitle?: string;
}

export default function StatCard({ type, title, value, subtitle }: Props) {
  const Icon = iconFor[type];
  const bg = bgFor[type];
  return (
    <div className={`stat ${bg}`}>
      <div className="stat__iconWrap">
        <Icon className="stat__icon" />
      </div>
      <div className="stat__content">
        <div className="stat__title">{title}</div>
        <div className="stat__value">{value}</div>
        {subtitle ? <div className="stat__subtitle">{subtitle}</div> : null}
      </div>
    </div>
  );
}



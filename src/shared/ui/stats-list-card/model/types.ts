export interface StatsItem {
  label: string;
  value: number;
}

export interface StatsListCardProps {
  title: string;
  statsList: StatsItem[];
}

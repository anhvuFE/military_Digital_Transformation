import Card from "@/components/common/Card";

interface StatItem {
  label: string;
  value: string;
  caption?: string;
}

interface Props {
  items: StatItem[];
  cardClassName?: string;
}

function StatsCards({ items, cardClassName }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} className={cardClassName ?? "card-tonal"}>
          <p className="mb-1 text-xs uppercase tracking-[0.16em] text-muted">{item.label}</p>
          <div className="text-3xl font-extrabold text-olive">{item.value}</div>
          {item.caption && <p className="mt-1 text-sm text-moss">{item.caption}</p>}
        </Card>
      ))}
    </div>
  );
}

export default StatsCards;

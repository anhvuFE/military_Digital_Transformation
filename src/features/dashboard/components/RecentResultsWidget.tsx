import Card from "@/components/common/Card";
import Tag from "@/components/common/Tag";

interface ResultItem {
  id: string;
  title: string;
  date: string;
  score?: number;
  passed?: boolean;
}

interface Props {
  items: ResultItem[];
}

function RecentResultsWidget({ items }: Props) {
  return (
    <Card title="Kết quả gần đây">
      {items.length === 0 && <p>Chưa có kết quả.</p>}
      <div className="grid gap-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-border px-3 py-2.5"
          >
            <div>
              <strong className="block">{item.title}</strong>
              <p className="mb-0 text-sm text-muted">{new Date(item.date).toLocaleDateString("vi-VN")}</p>
            </div>
            <Tag color={item.passed ? "green" : "red"}>{item.score ? `${item.score} điểm` : "Chưa chấm"}</Tag>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default RecentResultsWidget;

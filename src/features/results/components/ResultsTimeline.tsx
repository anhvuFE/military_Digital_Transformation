import Tag from "@/components/common/Tag";
import type { Enrollment } from "@/types/enrollment";
import type { Session } from "@/types/session";

interface Props {
  items: { session: Session; enrollment: Enrollment }[];
}

function ResultsTimeline({ items }: Props) {
  if (!items.length) return <p>Chưa có kết quả.</p>;

  return (
    <div className="timeline">
      {items.map((item) => (
        <div key={item.enrollment.id} className="timeline-item card">
          <div>
            <div style={{ fontWeight: 700 }}>{new Date(item.session.startTime).toLocaleDateString("vi-VN")}</div>
            <div style={{ color: "var(--color-muted)" }}>{item.session.location}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{item.session.title}</div>
              <p style={{ margin: 0, color: "var(--color-muted)" }}>{item.session.instructor}</p>
            </div>
            <Tag color={item.enrollment.passed ? "green" : item.enrollment.status === "ABSENT" ? "red" : "orange"}>
              {item.enrollment.status === "COMPLETED"
                ? `${item.enrollment.score ?? "-"} điểm`
                : item.enrollment.status === "ABSENT"
                ? "Vắng"
                : "Lịch"}
            </Tag>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultsTimeline;

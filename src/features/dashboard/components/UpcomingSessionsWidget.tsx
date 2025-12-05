import Tag from "@/components/common/Tag";
import type { Session } from "@/types/session";

interface Props {
  sessions: Session[];
}

function UpcomingSessionsWidget({ sessions }: Props) {
  if (sessions.length === 0) return <p>Không có lịch mới.</p>;

  return (
    <div className="grid gap-2.5">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex items-center justify-between rounded-xl border border-border px-3 py-2.5"
        >
          <div className="space-y-1">
            <strong className="block">{session.title || session.courseId}</strong>
            <p className="mb-0 text-sm text-olive">{new Date(session.startTime).toLocaleString("vi-VN")}</p>
            <p className="mb-0 text-sm text-muted">
              {session.location} • {session.instructor}
            </p>
          </div>
          <Tag color="orange">Đơn vị {session.unitId}</Tag>
        </div>
      ))}
    </div>
  );
}

export default UpcomingSessionsWidget;

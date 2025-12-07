import Tag from "@/components/common/Tag";
import type { Session } from "@/types/session";

interface Props {
  sessions: Session[];
}

function UpcomingSessionsWidget({ sessions }: Props) {
  if (sessions.length === 0) return <p>Không có lịch mới.</p>;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all"
        >
          <div className="space-y-2">
            <h4 className="font-bold text-gray-800 text-base">{session.title || session.courseId}</h4>
            <p className="text-sm text-gray-600">
              {new Date(session.startTime).toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "numeric",
                month: "numeric",
                year: "numeric"
              })}
            </p>
            <p className="text-sm text-gray-500">
              {session.location} • {session.instructor}
            </p>
            <div className="pt-2">
              <Tag color="orange">ĐƠN VỊ {session.unitId.toUpperCase()}</Tag>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpcomingSessionsWidget;

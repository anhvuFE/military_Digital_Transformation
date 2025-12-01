import Card from "@/components/common/Card";
import { useAuthStore } from "@/store/authStore";
import { useTrainingStore } from "@/store/trainingStore";
import ResultsTimeline from "../components/ResultsTimeline";
import CourseSummaryTable from "../components/CourseSummaryTable";

function PersonalResultsPage() {
  const user = useAuthStore((s) => s.user);
  const timeline = useTrainingStore((s) => (user ? s.getPersonalTimeline(user.id) : []));
  const summary = useTrainingStore((s) => (user ? s.getCourseSummaryForUser(user.id) : []));

  return (
    <div>
      <h1>Kết quả cá nhân</h1>
      <p>Theo dõi timeline, điểm số và khóa còn thiếu.</p>

      <div className="grid two">
        <Card title="Timeline tham gia">
          <ResultsTimeline items={timeline} />
        </Card>
        <Card title="Tổng hợp theo khóa">
          <CourseSummaryTable rows={summary} />
        </Card>
      </div>
    </div>
  );
}

export default PersonalResultsPage;

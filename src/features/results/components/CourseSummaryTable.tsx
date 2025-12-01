import type { Course } from "@/types/course";

interface Row {
  course: Course;
  required: boolean;
  requiredSessions: number;
  completedSessions: number;
  passed: boolean;
}

interface Props {
  rows: Row[];
}

function CourseSummaryTable({ rows }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Khóa</th>
          <th>Yêu cầu</th>
          <th>Đã hoàn thành</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const status = row.completedSessions >= row.requiredSessions;
          return (
            <tr key={row.course.id}>
              <td>
                <strong>{row.course.name}</strong>
                <p style={{ margin: 0, color: "var(--color-muted)" }}>{row.course.description}</p>
              </td>
              <td>{row.requiredSessions}</td>
              <td>{row.completedSessions}</td>
              <td>
                <span className={`pill ${status ? "status-success" : "status-warning"}`}>
                  {status ? "Đạt" : "Chưa đạt"}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default CourseSummaryTable;

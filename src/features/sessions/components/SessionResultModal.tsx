import { FormEvent, useState } from "react";
import type { Enrollment } from "@/types/enrollment";
import Button from "@/components/common/Button";

interface Props {
  enrollments: Enrollment[];
  onSave: (rows: Enrollment[]) => void;
}

function SessionResultModal({ enrollments, onSave }: Props) {
  const [rows, setRows] = useState<Enrollment[]>(enrollments);

  const handleChange = (index: number, field: keyof Enrollment, value: unknown) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(rows);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div style={{ maxHeight: 320, overflow: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Quân nhân</th>
              <th>Trạng thái</th>
              <th>Điểm</th>
              <th>Pass</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id}>
                <td>{row.userId}</td>
                <td>
                  <select
                    value={row.status}
                    onChange={(e) => handleChange(idx, "status", e.target.value as Enrollment["status"])}
                  >
                    <option value="SCHEDULED">Chờ</option>
                    <option value="COMPLETED">Hoàn thành</option>
                    <option value="ABSENT">Vắng</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={row.score ?? ""}
                    onChange={(e) => handleChange(idx, "score", Number(e.target.value))}
                  />
                </td>
                <td>
                  <select value={row.passed ? "true" : "false"} onChange={(e) => handleChange(idx, "passed", e.target.value === "true")}>
                    <option value="true">Đạt</option>
                    <option value="false">Chưa đạt</option>
                  </select>
                </td>
                <td>
                  <input value={row.remark ?? ""} onChange={(e) => handleChange(idx, "remark", e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button type="submit">Lưu kết quả</Button>
    </form>
  );
}

export default SessionResultModal;

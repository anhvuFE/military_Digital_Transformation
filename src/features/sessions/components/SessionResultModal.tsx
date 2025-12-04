import { FormEvent, useState } from "react";
import type { Enrollment } from "@/types/enrollment";
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";

interface Props {
  enrollments: Enrollment[];
  onSave: (rows: Enrollment[]) => void;
  onCancel?: () => void;
}

function SessionResultModal({ enrollments, onSave, onCancel }: Props) {
  const [rows, setRows] = useState<Enrollment[]>(enrollments);

  const handleChange = (index: number, field: keyof Enrollment, value: unknown) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(rows);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ minWidth: "750px" }}>
      <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: "400px" }}>
        <table className="w-full">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th className="text-left px-3 py-2 whitespace-nowrap min-w-[100px]">Quân nhân</th>
              <th className="text-left px-3 py-2 whitespace-nowrap min-w-[140px]">Trạng thái</th>
              <th className="text-left px-3 py-2 whitespace-nowrap min-w-[100px]">Điểm</th>
              <th className="text-left px-3 py-2 whitespace-nowrap min-w-[120px]">Pass</th>
              <th className="text-left px-3 py-2 whitespace-nowrap min-w-[180px]">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id} className="border-b border-border hover:bg-sand/10">
                <td className="px-3 py-2 font-medium">
                  <div className="whitespace-nowrap">{row.userId}</div>
                </td>
                <td className="px-3 py-2">
                  <Select
                    value={row.status}
                    onChange={(value) => handleChange(idx, "status", value as Enrollment["status"] ?? "SCHEDULED")}
                    options={[
                      { value: "SCHEDULED", label: "Chờ" },
                      { value: "COMPLETED", label: "Hoàn thành" },
                      { value: "ABSENT", label: "Vắng" },
                    ]}
                    placeholder="Chọn trạng thái"
                    className="min-w-[130px]"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="number"
                    value={row.score ?? ""}
                    onChange={(e) => handleChange(idx, "score", Number(e.target.value))}
                    className="w-full max-w-[90px]"
                    placeholder="0-100"
                    min="0"
                    max="100"
                  />
                </td>
                <td className="px-3 py-2">
                  <Select
                    value={row.passed ? "true" : "false"}
                    onChange={(value) => handleChange(idx, "passed", value === "true")}
                    options={[
                      { value: "true", label: "Đạt" },
                      { value: "false", label: "Chưa đạt" },
                    ]}
                    placeholder="Chọn kết quả"
                    className="min-w-[110px]"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={row.remark ?? ""}
                    onChange={(e) => handleChange(idx, "remark", e.target.value)}
                    className="w-full min-w-[170px]"
                    placeholder="Ghi chú..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 mt-4 pt-4 border-t border-border">
        <Button
          type="button"
          variant="secondary"
          className="flex-1 text-center justify-center"
          onClick={onCancel}
        >
          Huỷ
        </Button>
        <Button
          type="submit"
          className="flex-1 text-center justify-center"
        >
          Lưu kết quả
        </Button>
      </div>
    </form>
  );
}

export default SessionResultModal;

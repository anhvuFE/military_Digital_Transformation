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
    <div className="w-full max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto overflow-y-auto rounded-xl border border-border" style={{ maxHeight: "450px" }}>
          <table className="w-full">
            <thead className="sticky top-0 bg-sand/40 z-10">
              <tr>
                <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-bold text-forest border-b border-border text-xs sm:text-sm">QUÂN NHÂN</th>
                <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-bold text-forest border-b border-border text-xs sm:text-sm">TRẠNG THÁI</th>
                <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-bold text-forest border-b border-border text-xs sm:text-sm">ĐIỂM</th>
                <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-bold text-forest border-b border-border text-xs sm:text-sm">KẾT QUẢ</th>
                <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-bold text-forest border-b border-border text-xs sm:text-sm">GHI CHÚ</th>
              </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id} className="border-b border-border hover:bg-sand/20 transition-colors">
                <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-forest text-sm">
                  <div className="whitespace-nowrap">{idx + 1}</div>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  <Select
                    value={row.status}
                    onChange={(value) => handleChange(idx, "status", value as Enrollment["status"] ?? "SCHEDULED")}
                    options={[
                      { value: "SCHEDULED", label: "Chờ" },
                      { value: "COMPLETED", label: "Hoàn thành" },
                      { value: "ABSENT", label: "Vắng" },
                    ]}
                    placeholder="Chọn trạng thái"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  <input
                    type="number"
                    value={row.score ?? ""}
                    onChange={(e) => handleChange(idx, "score", Number(e.target.value))}
                    className="w-16 sm:w-20 rounded-lg border border-border px-2 sm:px-3 py-1.5 sm:py-2 text-center font-semibold text-sm focus:border-accent focus:ring-2 focus:ring-accent/30"
                    placeholder="0-100"
                    min="0"
                    max="100"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  <Select
                    value={row.passed ? "true" : "false"}
                    onChange={(value) => handleChange(idx, "passed", value === "true")}
                    options={[
                      { value: "true", label: "Đạt" },
                      { value: "false", label: "Chưa đạt" },
                    ]}
                    placeholder="Chọn kết quả"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  <input
                    value={row.remark ?? ""}
                    onChange={(e) => handleChange(idx, "remark", e.target.value)}
                    className="w-full min-w-[100px] sm:min-w-[150px] rounded-lg border border-border px-2 sm:px-3 py-1.5 sm:py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/30"
                    placeholder="Ghi chú..."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3" style={{ maxHeight: "450px", overflowY: "auto" }}>
        {rows.map((row, idx) => (
          <div key={row.id} className="card p-4 space-y-3 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-forest">Quân nhân #{idx + 1}</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-forest mb-1">TRẠNG THÁI</label>
                <Select
                  value={row.status}
                  onChange={(value) => handleChange(idx, "status", value as Enrollment["status"] ?? "SCHEDULED")}
                  options={[
                    { value: "SCHEDULED", label: "Chờ" },
                    { value: "COMPLETED", label: "Hoàn thành" },
                    { value: "ABSENT", label: "Vắng" },
                  ]}
                  placeholder="Chọn trạng thái"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest mb-1">KẾT QUẢ</label>
                <Select
                  value={row.passed ? "true" : "false"}
                  onChange={(value) => handleChange(idx, "passed", value === "true")}
                  options={[
                    { value: "true", label: "Đạt" },
                    { value: "false", label: "Chưa đạt" },
                  ]}
                  placeholder="Chọn kết quả"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest mb-1">ĐIỂM SỐ</label>
              <input
                type="number"
                value={row.score ?? ""}
                onChange={(e) => handleChange(idx, "score", Number(e.target.value))}
                className="w-full rounded-lg border border-border px-3 py-2 text-center font-semibold focus:border-accent focus:ring-2 focus:ring-accent/30"
                placeholder="Nhập điểm (0-100)"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest mb-1">GHI CHÚ</label>
              <input
                value={row.remark ?? ""}
                onChange={(e) => handleChange(idx, "remark", e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 focus:border-accent focus:ring-2 focus:ring-accent/30"
                placeholder="Nhập ghi chú..."
              />
            </div>
          </div>
        ))}
      </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
          <Button
            type="button"
            variant="secondary"
            className="flex-1 text-sm sm:text-base"
            onClick={onCancel}
          >
            HUỶ BỞ
          </Button>
          <Button
            type="submit"
            className="flex-1 text-sm sm:text-base"
          >
            LƮu KẾT QUẢ
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SessionResultModal;

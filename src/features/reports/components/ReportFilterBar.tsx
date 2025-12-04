import type { Unit } from "@/types/unit";
import type { ReportFilter } from "@/types/report";
import Select from "@/components/common/Select";
import DatePicker from "@/components/common/DatePicker";
import { CalendarDays, Building2, Calendar } from "lucide-react";

interface Props {
  units: Unit[];
  filter: ReportFilter;
  onChange: (filter: ReportFilter) => void;
}

function ReportFilterBar({ units, filter, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-forest">
            <CalendarDays className="h-4 w-4" />
            Từ ngày
          </label>
          <DatePicker
            value={filter.from}
            onChange={(val) => onChange({ ...filter, from: val })}
            placeholder="Chọn ngày bắt đầu"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-forest">
            <Calendar className="h-4 w-4" />
            Đến ngày
          </label>
          <DatePicker
            value={filter.to}
            onChange={(val) => onChange({ ...filter, to: val })}
            placeholder="Chọn ngày kết thúc"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-forest">
            <Building2 className="h-4 w-4" />
            Đơn vị
          </label>
          <Select
            options={units.map((u) => ({ label: u.name, value: u.id }))}
            value={filter.unitId}
            placeholder="Tất cả đơn vị"
            onChange={(value) => onChange({ ...filter, unitId: value })}
          />
        </div>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-forest/5 to-olive/5 p-3">
        <p className="text-xs text-gray-600">
          <span className="font-semibold">Gợi ý:</span> Chọn khoảng thời gian và đơn vị cụ thể để xem báo cáo chi tiết
        </p>
      </div>
    </div>
  );
}

export default ReportFilterBar;

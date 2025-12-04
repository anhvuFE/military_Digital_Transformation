import type { Unit } from "@/types/unit";
import clsx from "clsx";
import Select from "@/components/common/Select";
import WeekPicker from "@/components/common/WeekPicker";

export interface SessionFilters {
  unitId?: string;
  week?: string;
}

interface Props {
  units: Unit[];
  filters: SessionFilters;
  onChange: (filters: SessionFilters) => void;
  variant?: "card" | "plain";
}

function SessionFilterBar({ units, filters, onChange, variant = "card" }: Props) {
  const containerClass = clsx(
    variant === "card"
      ? "card"
      : "rounded-xl border border-border bg-white/80 p-4 shadow-sm",
    "flex flex-wrap items-end gap-3",
  );

  return (
    <div className={containerClass}>
      <div className="min-w-[200px] flex-1">
        <label>Đơn vị</label>
        <Select
          options={units.map((u) => ({ label: u.name, value: u.id }))}
          value={filters.unitId}
          placeholder="Tất cả"
          onChange={(value) => onChange({ ...filters, unitId: value })}
        />
      </div>
      <div className="min-w-[200px] flex-1">
        <label>Tuần</label>
        <WeekPicker value={filters.week} onChange={(val) => onChange({ ...filters, week: val })} />
      </div>
    </div>
  );
}

export default SessionFilterBar;

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

interface WeekOption {
  label: string;
  value: string;
}

interface Props {
  value?: string;
  onChange: (value: string | undefined) => void;
  weeksAhead?: number;
}

function startOfISOWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay() || 7; // Sunday=0 -> 7
  if (day !== 1) d.setHours(-24 * (day - 1));
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatWeekRange(start: Date) {
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const opts: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit" };
  return `${start.toLocaleDateString("vi-VN", opts)} - ${end.toLocaleDateString("vi-VN", opts)}`;
}

function isoWeekValue(start: Date) {
  const tmp = new Date(start);
  tmp.setHours(0, 0, 0, 0);
  tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
  const week1 = new Date(tmp.getFullYear(), 0, 4);
  const weekNo = 1 + Math.round(((tmp.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  return `${tmp.getFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function WeekPicker({ value, onChange, weeksAhead = 8 }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const options: WeekOption[] = useMemo(() => {
    const arr: WeekOption[] = [];
    const start = startOfISOWeek(new Date());
    for (let i = 0; i < weeksAhead; i++) {
      const wkStart = new Date(start);
      wkStart.setDate(start.getDate() + i * 7);
      const val = isoWeekValue(wkStart);
      arr.push({ value: val, label: `Tuần ${val.split("W")[1]} • ${formatWeekRange(wkStart)}` });
    }
    return arr;
  }, [weeksAhead]);

  const current = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border border-border bg-white px-3 py-2.5 text-sm"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={clsx(!current && "text-muted")}>{current?.label ?? "Chọn tuần"}</span>
        <span className="text-muted">▾</span>
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full rounded-xl border border-border bg-white shadow-lg">
          <button
            type="button"
            className="block w-full px-3 py-2 text-left text-sm text-muted hover:bg-sand/60"
            onClick={() => {
              onChange(undefined);
              setOpen(false);
            }}
          >
            Tất cả
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={clsx(
                "block w-full px-3 py-2 text-left text-sm hover:bg-sand/60",
                opt.value === value ? "bg-sand/40 font-semibold text-olive" : "text-forest",
              )}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeekPicker;

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { Calendar, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

interface Props {
  value: string; // ISO yyyy-mm-dd
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  placeholder?: string;
}

function formatISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

function DatePicker({ value, onChange, className, placeholder = "Chọn ngày" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = value ? new Date(value) : new Date();
  const [viewMonth, setViewMonth] = useState(current.getMonth());
  const [viewYear, setViewYear] = useState(current.getFullYear());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const days = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startDay = first.getDay(); // 0-6
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const arr: Array<{ label: number | string; date?: Date }> = [];
    for (let i = 0; i < startDay; i++) {
      arr.push({ label: "" });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push({ label: d, date: new Date(viewYear, viewMonth, d) });
    }
    return arr;
  }, [viewMonth, viewYear]);

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString("vi-VN", { month: "long", year: "numeric" });

  const buttonLabel = value
    ? new Date(value).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
    : placeholder;

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className={clsx(
          "flex w-full items-center justify-between rounded-lg border-2 bg-white px-4 py-2.5 text-sm font-medium transition-all",
          "hover:border-forest focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20",
          value ? "border-forest/30 text-gray-700" : "border-gray-200 text-gray-400",
          className
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={clsx(!value && "text-gray-400")}>{buttonLabel}</span>
        <CalendarDays className="h-4 w-4 text-gray-400" />
      </button>
      {open && (
        <div className="absolute z-30 mt-2 w-80 rounded-xl border-2 border-forest/20 bg-white shadow-xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-forest to-olive px-4 py-3 rounded-t-xl">
            <button
              type="button"
              className="rounded-lg bg-white/20 p-1.5 text-sand hover:bg-white/30 transition-colors"
              onClick={() => {
                if (viewMonth === 0) {
                  setViewMonth(11);
                  setViewYear((y) => y - 1);
                } else {
                  setViewMonth((m) => m - 1);
                }
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-bold uppercase tracking-wider text-sand">{monthLabel}</span>
            <button
              type="button"
              className="rounded-lg bg-white/20 p-1.5 text-sand hover:bg-white/30 transition-colors"
              onClick={() => {
                if (viewMonth === 11) {
                  setViewMonth(0);
                  setViewYear((y) => y + 1);
                } else {
                  setViewMonth((m) => m + 1);
                }
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-forest/70 border-b border-gray-100">
            {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d, idx) => (
              <div key={`${d}-${idx}`} className="text-center">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 px-4 py-3 text-sm">
            {days.map((d, idx) =>
              d.date ? (
                <button
                  key={`${d.label}-${idx}`}
                  type="button"
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-all font-medium",
                    formatISO(d.date) === value
                      ? "bg-gradient-to-br from-forest to-olive text-sand shadow-md"
                      : "hover:bg-forest/10 text-gray-700",
                    new Date().toDateString() === d.date.toDateString() && "ring-2 ring-orange/30"
                  )}
                  onClick={() => {
                    onChange(formatISO(d.date!));
                    setOpen(false);
                  }}
                >
                  {d.label}
                </button>
              ) : (
                <div key={`empty-${idx}`} className="h-8 w-8" />
              ),
            )}
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-2 rounded-b-xl">
            <button
              type="button"
              className="rounded-lg bg-forest px-3 py-1.5 text-xs font-semibold text-sand hover:bg-forest/90 transition-colors"
              onClick={() => {
                const today = new Date();
                setViewMonth(today.getMonth());
                setViewYear(today.getFullYear());
                onChange(formatISO(today));
                setOpen(false);
              }}
            >
              Hôm nay
            </button>
            <button
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;

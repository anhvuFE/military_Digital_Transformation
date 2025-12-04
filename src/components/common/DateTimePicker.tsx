import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface Props {
  value: string; // ISO yyyy-mm-ddTHH:mm
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  placeholder?: string;
}

function formatISO(date: Date) {
  return date.toISOString().slice(0, 16);
}

function DateTimePicker({ value, onChange, className, placeholder = "Chọn ngày giờ" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parse current value
  const current = value ? new Date(value) : new Date();
  const [viewMonth, setViewMonth] = useState(current.getMonth());
  const [viewYear, setViewYear] = useState(current.getFullYear());
  const [selectedDate, setSelectedDate] = useState(value ? value.slice(0, 10) : "");
  const [selectedTime, setSelectedTime] = useState(value ? value.slice(11, 16) : "08:00");

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
    ? new Date(value).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : placeholder;

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().slice(0, 10);
    setSelectedDate(dateStr);
    // Combine date with time
    if (selectedTime) {
      onChange(`${dateStr}T${selectedTime}`);
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    // Combine date with time
    if (selectedDate) {
      onChange(`${selectedDate}T${time}`);
    }
  };

  // Time slots
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = ["00", "15", "30", "45"];

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className={clsx(
          "flex w-full items-center justify-between rounded-xl border border-border bg-white px-3 py-2.5 text-sm transition-all",
          "hover:border-forest focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20",
          value ? "text-forest" : "text-muted",
          className
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted" />
          <span className={clsx(!value && "text-muted")}>{buttonLabel}</span>
        </span>
        <Clock className="h-4 w-4 text-muted" />
      </button>
      {open && (
        <div className="absolute z-30 mt-2 w-96 rounded-xl border border-border bg-white shadow-xl">
          {/* Calendar Section */}
          <div className="border-b border-border">
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
            <div className="grid grid-cols-7 gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-forest/70 border-b border-gray-100">
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
                      d.date.toISOString().slice(0, 10) === selectedDate
                        ? "bg-gradient-to-br from-forest to-olive text-sand shadow-md"
                        : "hover:bg-forest/10 text-gray-700",
                      new Date().toDateString() === d.date.toDateString() && "ring-2 ring-orange/30"
                    )}
                    onClick={() => handleDateSelect(d.date!)}
                  >
                    {d.label}
                  </button>
                ) : (
                  <div key={`empty-${idx}`} className="h-8 w-8" />
                ),
              )}
            </div>
          </div>

          {/* Time Section */}
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-forest">
              <Clock className="h-4 w-4" />
              <span>Chọn giờ</span>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted mb-1 block">Giờ</label>
                <select
                  className="w-full rounded-lg border border-border px-2 py-1.5 text-sm"
                  value={selectedTime.slice(0, 2)}
                  onChange={(e) => handleTimeChange(`${e.target.value}:${selectedTime.slice(3, 5)}`)}
                >
                  {hours.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="text-xs font-medium text-muted mb-1 block">Phút</label>
                <select
                  className="w-full rounded-lg border border-border px-2 py-1.5 text-sm"
                  value={selectedTime.slice(3, 5)}
                  onChange={(e) => handleTimeChange(`${selectedTime.slice(0, 2)}:${e.target.value}`)}
                >
                  {minutes.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-1">
                <button
                  type="button"
                  className={clsx(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    parseInt(selectedTime.slice(0, 2)) < 12
                      ? "bg-forest text-sand"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                  onClick={() => {
                    const hour = parseInt(selectedTime.slice(0, 2));
                    if (hour >= 12) {
                      const newHour = hour === 12 ? 0 : hour - 12;
                      handleTimeChange(`${newHour.toString().padStart(2, '0')}:${selectedTime.slice(3, 5)}`);
                    }
                  }}
                >
                  AM
                </button>
                <button
                  type="button"
                  className={clsx(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    parseInt(selectedTime.slice(0, 2)) >= 12
                      ? "bg-forest text-sand"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                  onClick={() => {
                    const hour = parseInt(selectedTime.slice(0, 2));
                    if (hour < 12) {
                      const newHour = hour === 0 ? 12 : hour + 12;
                      handleTimeChange(`${newHour.toString().padStart(2, '0')}:${selectedTime.slice(3, 5)}`);
                    }
                  }}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-2 rounded-b-xl">
            <button
              type="button"
              className="rounded-lg bg-forest px-3 py-1.5 text-xs font-semibold text-sand hover:bg-forest/90 transition-colors"
              onClick={() => {
                const now = new Date();
                const dateStr = now.toISOString().slice(0, 10);
                const timeStr = now.toTimeString().slice(0, 5);
                setSelectedDate(dateStr);
                setSelectedTime(timeStr);
                onChange(`${dateStr}T${timeStr}`);
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

export default DateTimePicker;
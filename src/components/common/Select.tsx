import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface Option<T extends string | number> {
  label: string;
  value: T;
}

interface Props<T extends string | number> {
  options: Option<T>[];
  value?: T;
  placeholder?: string;
  onChange: (value: T | undefined) => void;
  className?: string;
}

function Select<T extends string | number>({ options, value, placeholder = "Chọn...", onChange, className }: Props<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} className={clsx("relative w-full", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border border-border bg-white px-3 py-2.5 text-sm"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={clsx(!current && "text-muted")}>{current?.label ?? placeholder}</span>
        <span className="text-muted">▾</span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
          <button
            type="button"
            className="block w-full px-3 py-2 text-left text-sm text-muted hover:bg-sand/60"
            onClick={() => {
              onChange(undefined);
              setOpen(false);
            }}
          >
            {placeholder}
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

export default Select;

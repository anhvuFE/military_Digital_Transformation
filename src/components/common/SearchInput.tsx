import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

function SearchInput({
  value: externalValue = "",
  onChange,
  placeholder = "Tìm kiếm...",
  debounceMs = 300,
  className = ""
}: Props) {
  const [internalValue, setInternalValue] = useState(externalValue);

  useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (internalValue !== externalValue) {
        onChange(internalValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [internalValue, debounceMs]);

  const handleClear = () => {
    setInternalValue("");
    onChange("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search className="h-4 w-4 text-gray-400" />
      </div>

      <input
        type="text"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-10 text-sm placeholder-gray-400 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
      />

      {internalValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100 transition-colors"
        >
          <X className="h-3.5 w-3.5 text-gray-400" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
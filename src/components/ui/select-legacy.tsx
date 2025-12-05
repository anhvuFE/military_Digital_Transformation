import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

function SelectLegacy<T extends string | number>({
  options,
  value,
  placeholder = "Chọn...",
  onChange,
  className,
}: Props<T>) {
  return (
    <ShadcnSelect
      value={value?.toString()}
      onValueChange={(newValue) => {
        if (newValue === "undefined") {
          onChange(undefined);
        } else {
          const option = options.find((o) => o.value.toString() === newValue);
          onChange(option?.value);
        }
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="undefined">{placeholder}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
}

export default SelectLegacy;
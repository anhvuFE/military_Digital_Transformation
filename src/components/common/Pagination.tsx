import Button from "./Button";

interface Props {
  total: number;
  page: number;
  pageSize: number;
  onChange: (page: number) => void;
}

function Pagination({ total, page, pageSize, onChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2 justify-end mt-3">
      <Button variant="secondary" disabled={!canPrev} onClick={() => canPrev && onChange(page - 1)}>
        ← Trước
      </Button>
      <span className="text-sm text-muted">
        Trang {page} / {totalPages}
      </span>
      <Button variant="secondary" disabled={!canNext} onClick={() => canNext && onChange(page + 1)}>
        Sau →
      </Button>
    </div>
  );
}

export default Pagination;

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Button from "./Button";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  totalItems = 0,
  itemsPerPage = 20
}: Props) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = window.innerWidth < 640 ? 3 : 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      }
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {showInfo && totalItems > 0 && (
        <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          <span className="hidden sm:inline">Hiển thị <span className="font-semibold">{startItem}-{endItem}</span> trong tổng số{" "}
          <span className="font-semibold">{totalItems}</span> kết quả</span>
          <span className="sm:hidden"><span className="font-semibold">{startItem}-{endItem}</span> / {totalItems}</span>
        </div>
      )}

      <div className="flex items-center gap-0.5 sm:gap-1">
        <Button
          variant="ghost"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-1.5 sm:p-2 hidden sm:block"
        >
          <ChevronsLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 sm:p-2"
        >
          <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {getPageNumbers().map((page, index) => (
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-1 sm:px-2 text-xs sm:text-sm text-gray-400">...</span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "ghost"}
                onClick={() => onPageChange(page as number)}
                className={`min-w-[28px] sm:min-w-[36px] h-7 sm:h-9 text-xs sm:text-sm ${currentPage === page ? "bg-forest text-white" : ""}`}
              >
                {page}
              </Button>
            )
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 sm:p-2"
        >
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-1.5 sm:p-2 hidden sm:block"
        >
          <ChevronsRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
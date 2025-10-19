import { useMemo } from "react";
import { Button } from "@/shared/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) {
  // ✅ Memoize computed page numbers for performance
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  // ✅ Graceful fallback
  if (totalPages <= 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Info */}
      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <Button
          variant="outline"
          size="icon"
          aria-label="Go to first page"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="hidden sm:flex"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>

        {/* Previous */}
        <Button
          variant="outline"
          size="icon"
          aria-label="Go to previous page"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 select-none">
                ...
              </span>
            ) : (
              <Button
                key={index}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                aria-label={`Go to page ${page}`}
                onClick={() => onPageChange(page)}
                className="hidden sm:flex"
              >
                {page}
              </Button>
            )
          )}
        </div>

        {/* Next */}
        <Button
          variant="outline"
          size="icon"
          aria-label="Go to next page"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Last Page */}
        <Button
          variant="outline"
          size="icon"
          aria-label="Go to last page"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="hidden sm:flex"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

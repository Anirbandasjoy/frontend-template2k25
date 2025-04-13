"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMemo } from "react";

type Props = {
  className: string;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

export function PaginationGlobal({
  className,
  currentPage,
  totalPages,
  handlePageChange,
}: Props) {
  const visiblePages = useMemo(() => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  const handleClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page !== currentPage) {
      handlePageChange(page);
    }
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => handleClick(e, currentPage - 1)}
          />
        </PaginationItem>

        {/* First Page + Left Ellipsis */}
        {visiblePages[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 1}
                onClick={(e) => handleClick(e, 1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {visiblePages[0] > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* Visible Pages */}
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              onClick={(e) => handleClick(e, page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right Ellipsis + Last Page */}
        {visiblePages.at(-1)! < totalPages && (
          <>
            {visiblePages.at(-1)! < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === totalPages}
                onClick={(e) => handleClick(e, totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => handleClick(e, currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

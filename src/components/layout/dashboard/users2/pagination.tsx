import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationGlobal({ className }: { className: string }) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="text-xs rounded-xs" href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="text-xs border p-1" href="#">
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="text-xs rounded-xs" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

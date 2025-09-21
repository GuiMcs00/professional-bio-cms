import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const generatePageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}?page=${page}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show 5 page numbers
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <Link
          key="prev"
          href={generatePageUrl(currentPage - 1)}
          className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted/20 transition-colors"
        >
          Previous
        </Link>
      );
    }

    // First page + ellipsis
    if (startPage > 1) {
      pages.push(
        <Link
          key={1}
          href={generatePageUrl(1)}
          className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted/20 transition-colors"
        >
          1
        </Link>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-3 py-2 text-sm text-muted-foreground">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          href={generatePageUrl(i)}
          className={`px-3 py-2 text-sm border rounded-md transition-colors ${
            i === currentPage
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border hover:bg-muted/20'
          }`}
        >
          {i}
        </Link>
      );
    }

    // Last page + ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-3 py-2 text-sm text-muted-foreground">
            ...
          </span>
        );
      }
      pages.push(
        <Link
          key={totalPages}
          href={generatePageUrl(totalPages)}
          className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted/20 transition-colors"
        >
          {totalPages}
        </Link>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <Link
          key="next"
          href={generatePageUrl(currentPage + 1)}
          className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted/20 transition-colors"
        >
          Next
        </Link>
      );
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      {renderPageNumbers()}
    </nav>
  );
}
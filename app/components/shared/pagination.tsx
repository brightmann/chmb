import { cn } from '@/lib/utils';

export const POSTS_PER_PAGE = 5;

export function getTotalPages(totalPosts: number): number {
  return Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageLink = (pageNum: number) =>
    pageNum === 1 ? `${basePath}/` : `${basePath}/page/${pageNum}`;

  const items: (number | 'ellipsis-start' | 'ellipsis-end')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) items.push(i);
  } else {
    items.push(1);
    if (currentPage > 3) items.push('ellipsis-start');
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      items.push(i);
    }
    if (currentPage < totalPages - 2) items.push('ellipsis-end');
    items.push(totalPages);
  }

  const linkClass = (isCurrent: boolean) =>
    cn(
      'inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition',
      isCurrent
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-input bg-background hover:bg-accent'
    );

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2 pt-8"
    >
      {currentPage > 1 && (
        <a href={pageLink(currentPage - 1)} className={linkClass(false)}>
          Previous
        </a>
      )}
      {items.map((item) =>
        typeof item === 'string' ? (
          <span key={item} className="text-muted-foreground px-1">
            …
          </span>
        ) : item === currentPage ? (
          <span key={item} aria-current="page" className={linkClass(true)}>
            {item}
          </span>
        ) : (
          <a key={item} href={pageLink(item)} className={linkClass(false)}>
            {item}
          </a>
        )
      )}
      {currentPage < totalPages && (
        <a href={pageLink(currentPage + 1)} className={linkClass(false)}>
          Next
        </a>
      )}
    </nav>
  );
}

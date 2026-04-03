import React from 'react'

/**
 * Props for the Pagination component.
 */
export interface PaginationProps {
  /** Total number of items in the data set. */
  total: number
  /** Number of items per page. */
  limit: number
  /** Current offset into the data set. */
  offset: number
  /** Called with the target page number (1-based) when the user navigates. */
  onPageChange: (page: number) => void
}

/**
 * Offset-based pagination control with Prev/Next buttons and a "page / total"
 * display. Automatically hides when the data fits on a single page.
 *
 * @param props - PaginationProps
 */
export const Pagination: React.FC<PaginationProps> = ({ total, limit, offset, onPageChange }) => {
  const currentPage = Math.floor(offset / limit) + 1
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) return null

  return (
    <div data-testid="pagination" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button
        data-testid="prev-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      <span data-testid="page-info">
        {currentPage} / {totalPages}
      </span>
      <button
        data-testid="next-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

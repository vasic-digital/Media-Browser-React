import React from 'react'

export interface PaginationProps {
  total: number
  limit: number
  offset: number
  onPageChange: (page: number) => void
}

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

import React from 'react'
import type { MediaEntity } from '@vasic-digital/media-types'
import { EntityCard } from './EntityCard'
import { Pagination } from './Pagination'

/**
 * Props for the EntityGrid component.
 */
export interface EntityGridProps {
  /** Entities to render as cards. */
  entities: MediaEntity[]
  /** Total matching entities (for pagination). */
  total: number
  /** Page size. */
  limit: number
  /** Current offset into the result set. */
  offset: number
  /** Optional callback when an entity card is clicked. */
  onEntityClick?: (entity: MediaEntity) => void
  /** Optional callback for page navigation; pagination hidden when omitted. */
  onPageChange?: (page: number) => void
  /** Shows a loading spinner when true. */
  isLoading?: boolean
}

/**
 * Responsive CSS grid of EntityCard components with optional pagination.
 * Handles loading spinner and empty state display.
 *
 * @param props - EntityGridProps
 */
export const EntityGrid: React.FC<EntityGridProps> = ({
  entities,
  total,
  limit,
  offset,
  onEntityClick,
  onPageChange,
  isLoading,
}) => {
  if (isLoading) {
    return <div data-testid="loading-spinner">Loading...</div>
  }

  if (entities.length === 0) {
    return <div data-testid="empty-state">No entities found.</div>
  }

  return (
    <div>
      <div
        data-testid="entity-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}
      >
        {entities.map((e) => (
          <EntityCard key={e.id} entity={e} onClick={onEntityClick} />
        ))}
      </div>
      {onPageChange && (
        <Pagination total={total} limit={limit} offset={offset} onPageChange={onPageChange} />
      )}
    </div>
  )
}

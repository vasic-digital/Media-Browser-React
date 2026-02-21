import React from 'react'
import type { MediaEntity } from '@vasic-digital/media-types'
import { EntityCard } from './EntityCard'
import { Pagination } from './Pagination'

export interface EntityGridProps {
  entities: MediaEntity[]
  total: number
  limit: number
  offset: number
  onEntityClick?: (entity: MediaEntity) => void
  onPageChange?: (page: number) => void
  isLoading?: boolean
}

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

import React from 'react'
import type { MediaEntity } from '@vasic-digital/media-types'

export interface EntityCardProps {
  entity: MediaEntity
  onClick?: (entity: MediaEntity) => void
}

export const EntityCard: React.FC<EntityCardProps> = ({ entity, onClick }) => {
  const mediaType = entity.media_type?.name ?? 'unknown'
  const year = entity.year ? ` (${entity.year})` : ''

  return (
    <div
      data-testid="entity-card"
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(entity)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(entity) }}
      style={{ cursor: onClick ? 'pointer' : 'default', border: '1px solid #ccc', padding: '12px', borderRadius: '8px' }}
    >
      <div data-testid="entity-title" style={{ fontWeight: 'bold' }}>
        {entity.title}{year}
      </div>
      <div data-testid="entity-type" style={{ fontSize: '0.85em', color: '#666' }}>
        {mediaType.replace(/_/g, ' ')}
      </div>
      {entity.rating !== undefined && (
        <div data-testid="entity-rating">★ {entity.rating.toFixed(1)}</div>
      )}
      {entity.description && (
        <div data-testid="entity-description" style={{ fontSize: '0.9em', marginTop: '4px' }}>
          {entity.description.slice(0, 120)}{entity.description.length > 120 ? '…' : ''}
        </div>
      )}
    </div>
  )
}

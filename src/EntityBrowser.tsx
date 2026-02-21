import React, { useState } from 'react'
import type { MediaEntity, MediaType } from '@vasic-digital/media-types'
import { TypeSelector } from './TypeSelector'
import { EntityGrid } from './EntityGrid'

export interface EntityBrowserProps {
  types: MediaType[]
  entities: MediaEntity[]
  total: number
  limit: number
  offset: number
  selectedType?: string
  searchQuery?: string
  isLoading?: boolean
  onTypeSelect: (typeName: string) => void
  onSearch: (query: string) => void
  onEntityClick: (entity: MediaEntity) => void
  onPageChange: (page: number) => void
  onBack?: () => void
}

export const EntityBrowser: React.FC<EntityBrowserProps> = ({
  types,
  entities,
  total,
  limit,
  offset,
  selectedType,
  searchQuery,
  isLoading,
  onTypeSelect,
  onSearch,
  onEntityClick,
  onPageChange,
  onBack,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery ?? '')
  const showTypeSelector = !selectedType && !searchQuery

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch(inputValue)
  }

  return (
    <div data-testid="entity-browser">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        {!showTypeSelector && onBack && (
          <button data-testid="back-btn" onClick={onBack}>← Back</button>
        )}
        <h1 data-testid="browser-title">
          {showTypeSelector
            ? 'Browse Media'
            : selectedType
            ? selectedType.replace(/_/g, ' ')
            : `Search: "${searchQuery}"`}
        </h1>
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search entities..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {showTypeSelector && <TypeSelector types={types} selected={selectedType} onSelect={onTypeSelect} />}
      {!showTypeSelector && (
        <EntityGrid
          entities={entities}
          total={total}
          limit={limit}
          offset={offset}
          onEntityClick={onEntityClick}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

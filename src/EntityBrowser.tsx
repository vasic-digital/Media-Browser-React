import React, { useState } from 'react'
import type { MediaEntity, MediaType } from '@vasic-digital/media-types'
import { TypeSelector } from './TypeSelector'
import { EntityGrid } from './EntityGrid'

/**
 * Props for the EntityBrowser component.
 */
export interface EntityBrowserProps {
  /** Available media types for the type selector. */
  types: MediaType[]
  /** Entities to display in the grid. */
  entities: MediaEntity[]
  /** Total number of entities matching the current filter (for pagination). */
  total: number
  /** Page size. */
  limit: number
  /** Current offset into the result set. */
  offset: number
  /** Currently selected media type filter. */
  selectedType?: string
  /** Current search query string. */
  searchQuery?: string
  /** Shows a loading state when true. */
  isLoading?: boolean
  /** Called when a media type pill is selected. */
  onTypeSelect: (typeName: string) => void
  /** Called when the user submits a search query. */
  onSearch: (query: string) => void
  /** Called when an entity card is clicked. */
  onEntityClick: (entity: MediaEntity) => void
  /** Called when the user navigates to a different page. */
  onPageChange: (page: number) => void
  /** Optional callback to navigate back; renders a back button when provided. */
  onBack?: () => void
}

/**
 * Full-featured media entity browser with a search bar, type selector, and
 * paginated entity grid. Shows the TypeSelector when no filter is active,
 * switches to EntityGrid when a type or search query is selected.
 *
 * @param props - EntityBrowserProps
 */
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

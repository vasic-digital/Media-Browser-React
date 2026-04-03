import React from 'react'
import type { MediaType } from '@vasic-digital/media-types'

/**
 * Props for the TypeSelector component.
 */
export interface TypeSelectorProps {
  /** Available media types to display as selectable pills. */
  types: MediaType[]
  /** Currently selected type name, highlighted in blue. */
  selected?: string
  /** Called when a type pill button is clicked. */
  onSelect: (typeName: string) => void
}

/**
 * Row of pill-shaped buttons for selecting a media type filter.
 * The active type is visually highlighted with a blue background.
 *
 * @param props - TypeSelectorProps
 */
export const TypeSelector: React.FC<TypeSelectorProps> = ({ types, selected, onSelect }) => {
  return (
    <div data-testid="type-selector" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {types.map((t) => (
        <button
          key={t.id}
          data-testid={`type-btn-${t.name}`}
          onClick={() => onSelect(t.name)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            background: selected === t.name ? '#2563eb' : 'transparent',
            color: selected === t.name ? '#fff' : 'inherit',
            cursor: 'pointer',
          }}
        >
          {t.name.replace(/_/g, ' ')}
        </button>
      ))}
    </div>
  )
}

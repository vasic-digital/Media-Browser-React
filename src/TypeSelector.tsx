import React from 'react'
import type { MediaType } from '@vasic-digital/media-types'

export interface TypeSelectorProps {
  types: MediaType[]
  selected?: string
  onSelect: (typeName: string) => void
}

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

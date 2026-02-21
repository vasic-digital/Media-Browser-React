import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EntityCard } from '../EntityCard'
import type { MediaEntity } from '@vasic-digital/media-types'

function makeEntity(overrides: Partial<MediaEntity> = {}): MediaEntity {
  return {
    id: 1,
    title: 'Inception',
    status: 'active',
    first_detected: '2024-01-01T00:00:00Z',
    last_updated: '2024-01-01T00:00:00Z',
    ...overrides,
  }
}

describe('EntityCard', () => {
  it('renders entity title', () => {
    render(<EntityCard entity={makeEntity()} />)
    expect(screen.getByTestId('entity-title')).toHaveTextContent('Inception')
  })

  it('shows year when provided', () => {
    render(<EntityCard entity={makeEntity({ year: 2010 })} />)
    expect(screen.getByTestId('entity-title')).toHaveTextContent('Inception (2010)')
  })

  it('shows media type name', () => {
    render(<EntityCard entity={makeEntity({ media_type: { id: 1, name: 'movie', description: 'Film' } })} />)
    expect(screen.getByTestId('entity-type')).toHaveTextContent('movie')
  })

  it('shows rating when provided', () => {
    render(<EntityCard entity={makeEntity({ rating: 8.5 })} />)
    expect(screen.getByTestId('entity-rating')).toHaveTextContent('8.5')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    const entity = makeEntity()
    render(<EntityCard entity={entity} onClick={onClick} />)
    fireEvent.click(screen.getByTestId('entity-card'))
    expect(onClick).toHaveBeenCalledWith(entity)
  })

  it('truncates long descriptions', () => {
    const longDesc = 'A'.repeat(200)
    render(<EntityCard entity={makeEntity({ description: longDesc })} />)
    const desc = screen.getByTestId('entity-description')
    expect(desc.textContent?.length).toBeLessThan(200)
  })

  it('does not show description when not provided', () => {
    render(<EntityCard entity={makeEntity()} />)
    expect(screen.queryByTestId('entity-description')).toBeNull()
  })
})

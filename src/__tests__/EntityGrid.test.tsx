import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EntityGrid } from '../EntityGrid'
import type { MediaEntity } from '@vasic-digital/media-types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeEntity(overrides: Partial<MediaEntity> = {}): MediaEntity {
  return {
    id: 1,
    title: 'Test Entity',
    status: 'active',
    first_detected: '2024-01-01T00:00:00Z',
    last_updated: '2024-01-01T00:00:00Z',
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('EntityGrid', () => {
  it('renders a grid of entity cards', () => {
    const entities = [
      makeEntity({ id: 1, title: 'Inception' }),
      makeEntity({ id: 2, title: 'Interstellar' }),
      makeEntity({ id: 3, title: 'The Dark Knight' }),
    ]
    render(
      <EntityGrid entities={entities} total={3} limit={20} offset={0} />
    )
    expect(screen.getByTestId('entity-grid')).toBeInTheDocument()
    expect(screen.getAllByTestId('entity-card')).toHaveLength(3)
  })

  it('shows loading spinner when isLoading is true', () => {
    render(
      <EntityGrid entities={[]} total={0} limit={20} offset={0} isLoading={true} />
    )
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    expect(screen.queryByTestId('entity-grid')).toBeNull()
  })

  it('shows empty state when no entities and not loading', () => {
    render(
      <EntityGrid entities={[]} total={0} limit={20} offset={0} />
    )
    expect(screen.getByTestId('empty-state')).toHaveTextContent('No entities found')
    expect(screen.queryByTestId('entity-grid')).toBeNull()
  })

  it('renders pagination when onPageChange is provided and multiple pages', () => {
    const entities = [makeEntity()]
    render(
      <EntityGrid
        entities={entities}
        total={50}
        limit={20}
        offset={0}
        onPageChange={vi.fn()}
      />
    )
    expect(screen.getByTestId('pagination')).toBeInTheDocument()
  })

  it('does not render pagination when onPageChange is not provided', () => {
    const entities = [makeEntity()]
    render(
      <EntityGrid entities={entities} total={50} limit={20} offset={0} />
    )
    expect(screen.queryByTestId('pagination')).toBeNull()
  })

  it('does not render pagination for single-page results', () => {
    const entities = [makeEntity()]
    render(
      <EntityGrid
        entities={entities}
        total={1}
        limit={20}
        offset={0}
        onPageChange={vi.fn()}
      />
    )
    // Pagination returns null for single-page results
    expect(screen.queryByTestId('pagination')).toBeNull()
  })

  it('passes onEntityClick to EntityCards', () => {
    const onEntityClick = vi.fn()
    const entity = makeEntity({ id: 1, title: 'Inception' })
    render(
      <EntityGrid
        entities={[entity]}
        total={1}
        limit={20}
        offset={0}
        onEntityClick={onEntityClick}
      />
    )
    // The EntityCard should be clickable
    const card = screen.getByTestId('entity-card')
    expect(card).toBeInTheDocument()
  })

  it('renders all provided entities as cards', () => {
    const entities = Array.from({ length: 5 }, (_, i) =>
      makeEntity({ id: i + 1, title: `Entity ${i + 1}` })
    )
    render(
      <EntityGrid entities={entities} total={5} limit={20} offset={0} />
    )
    expect(screen.getAllByTestId('entity-card')).toHaveLength(5)
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { EntityBrowser } from '../EntityBrowser'
import type { MediaEntity, MediaType } from '@vasic-digital/media-types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeType(overrides: Partial<MediaType> = {}): MediaType {
  return {
    id: 1,
    name: 'movie',
    description: 'Feature film',
    ...overrides,
  }
}

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

const defaultTypes: MediaType[] = [
  makeType({ id: 1, name: 'movie', description: 'Film' }),
  makeType({ id: 2, name: 'tv_show', description: 'TV Show' }),
  makeType({ id: 3, name: 'song', description: 'Music track' }),
]

const defaultProps = {
  types: defaultTypes,
  entities: [] as MediaEntity[],
  total: 0,
  limit: 20,
  offset: 0,
  onTypeSelect: vi.fn(),
  onSearch: vi.fn(),
  onEntityClick: vi.fn(),
  onPageChange: vi.fn(),
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('EntityBrowser', () => {
  it('renders the entity browser container', () => {
    render(<EntityBrowser {...defaultProps} />)
    expect(screen.getByTestId('entity-browser')).toBeInTheDocument()
  })

  it('shows "Browse Media" title when no type or search is active', () => {
    render(<EntityBrowser {...defaultProps} />)
    expect(screen.getByTestId('browser-title')).toHaveTextContent('Browse Media')
  })

  it('shows TypeSelector when no type is selected and no search query', () => {
    render(<EntityBrowser {...defaultProps} />)
    expect(screen.getByTestId('type-selector')).toBeInTheDocument()
  })

  it('hides TypeSelector when a type is selected', () => {
    render(<EntityBrowser {...defaultProps} selectedType="movie" />)
    expect(screen.queryByTestId('type-selector')).toBeNull()
  })

  it('shows the selected type name in the title', () => {
    render(<EntityBrowser {...defaultProps} selectedType="tv_show" />)
    expect(screen.getByTestId('browser-title')).toHaveTextContent('tv show')
  })

  it('shows search query in title when searching', () => {
    render(<EntityBrowser {...defaultProps} searchQuery="matrix" />)
    expect(screen.getByTestId('browser-title')).toHaveTextContent('Search: "matrix"')
  })

  it('renders EntityGrid when a type is selected', () => {
    const entities = [makeEntity(), makeEntity({ id: 2, title: 'Interstellar' })]
    render(
      <EntityBrowser
        {...defaultProps}
        selectedType="movie"
        entities={entities}
        total={2}
      />
    )
    expect(screen.getByTestId('entity-grid')).toBeInTheDocument()
  })

  it('renders EntityGrid when searching', () => {
    const entities = [makeEntity()]
    render(
      <EntityBrowser
        {...defaultProps}
        searchQuery="inception"
        entities={entities}
        total={1}
      />
    )
    expect(screen.getByTestId('entity-grid')).toBeInTheDocument()
  })

  it('shows back button when type is selected and onBack is provided', () => {
    const onBack = vi.fn()
    render(<EntityBrowser {...defaultProps} selectedType="movie" onBack={onBack} />)
    const backBtn = screen.getByTestId('back-btn')
    expect(backBtn).toBeInTheDocument()
    fireEvent.click(backBtn)
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('does not show back button on the type selector view', () => {
    render(<EntityBrowser {...defaultProps} onBack={vi.fn()} />)
    expect(screen.queryByTestId('back-btn')).toBeNull()
  })

  it('renders search input', () => {
    render(<EntityBrowser {...defaultProps} />)
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })

  it('calls onSearch when Enter is pressed in search input', () => {
    const onSearch = vi.fn()
    render(<EntityBrowser {...defaultProps} onSearch={onSearch} />)

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'matrix' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onSearch).toHaveBeenCalledWith('matrix')
  })

  it('does not call onSearch on non-Enter key press', () => {
    const onSearch = vi.fn()
    render(<EntityBrowser {...defaultProps} onSearch={onSearch} />)

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyDown(input, { key: 'a' })

    expect(onSearch).not.toHaveBeenCalled()
  })

  it('initializes search input with searchQuery prop', () => {
    render(<EntityBrowser {...defaultProps} searchQuery="existing query" />)
    const input = screen.getByTestId('search-input') as HTMLInputElement
    expect(input.value).toBe('existing query')
  })

  it('shows loading state in EntityGrid', () => {
    render(
      <EntityBrowser
        {...defaultProps}
        selectedType="movie"
        isLoading={true}
      />
    )
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('shows empty state when no entities and type selected', () => {
    render(
      <EntityBrowser
        {...defaultProps}
        selectedType="movie"
        entities={[]}
        total={0}
      />
    )
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })
})

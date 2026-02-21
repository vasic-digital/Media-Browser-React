import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TypeSelector } from '../TypeSelector'
import type { MediaType } from '@vasic-digital/media-types'

const types: MediaType[] = [
  { id: 1, name: 'movie', description: 'Movies' },
  { id: 2, name: 'tv_show', description: 'TV Shows' },
  { id: 3, name: 'song', description: 'Songs' },
]

describe('TypeSelector', () => {
  it('renders all type buttons', () => {
    render(<TypeSelector types={types} onSelect={vi.fn()} />)
    expect(screen.getByTestId('type-btn-movie')).toBeTruthy()
    expect(screen.getByTestId('type-btn-tv_show')).toBeTruthy()
    expect(screen.getByTestId('type-btn-song')).toBeTruthy()
  })

  it('calls onSelect with type name when clicked', () => {
    const onSelect = vi.fn()
    render(<TypeSelector types={types} onSelect={onSelect} />)
    fireEvent.click(screen.getByTestId('type-btn-movie'))
    expect(onSelect).toHaveBeenCalledWith('movie')
  })

  it('renders empty when no types given', () => {
    render(<TypeSelector types={[]} onSelect={vi.fn()} />)
    expect(screen.getByTestId('type-selector').children).toHaveLength(0)
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from '../Pagination'

describe('Pagination', () => {
  it('renders page info', () => {
    render(<Pagination total={100} limit={20} offset={0} onPageChange={vi.fn()} />)
    expect(screen.getByTestId('page-info')).toHaveTextContent('1 / 5')
  })

  it('disables prev on first page', () => {
    render(<Pagination total={100} limit={20} offset={0} onPageChange={vi.fn()} />)
    expect(screen.getByTestId('prev-btn')).toBeDisabled()
    expect(screen.getByTestId('next-btn')).not.toBeDisabled()
  })

  it('disables next on last page', () => {
    render(<Pagination total={100} limit={20} offset={80} onPageChange={vi.fn()} />)
    expect(screen.getByTestId('next-btn')).toBeDisabled()
    expect(screen.getByTestId('prev-btn')).not.toBeDisabled()
  })

  it('calls onPageChange with prev page number', () => {
    const onPageChange = vi.fn()
    render(<Pagination total={100} limit={20} offset={40} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByTestId('prev-btn'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange with next page number', () => {
    const onPageChange = vi.fn()
    render(<Pagination total={100} limit={20} offset={40} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByTestId('next-btn'))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('returns null for single page', () => {
    const { container } = render(<Pagination total={10} limit={20} offset={0} onPageChange={vi.fn()} />)
    expect(container.firstChild).toBeNull()
  })
})

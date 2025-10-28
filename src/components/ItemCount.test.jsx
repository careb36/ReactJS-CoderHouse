import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ItemCount from './ItemCount'

describe('ItemCount', () => {
  const mockOnAdd = vi.fn()

  it('renders with initial count', () => {
    render(<ItemCount stock={10} initial={1} onAdd={mockOnAdd} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('increments count when + button is clicked', () => {
    render(<ItemCount stock={10} initial={1} onAdd={mockOnAdd} />)
    const incrementButton = screen.getByLabelText('Aumentar')
    fireEvent.click(incrementButton)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('decrements count when - button is clicked', () => {
    render(<ItemCount stock={10} initial={2} onAdd={mockOnAdd} />)
    const decrementButton = screen.getByLabelText('Disminuir')
    fireEvent.click(decrementButton)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('does not exceed stock limit', () => {
    render(<ItemCount stock={3} initial={3} onAdd={mockOnAdd} />)
    const incrementButton = screen.getByLabelText('Aumentar')
    fireEvent.click(incrementButton)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('calls onAdd with correct count when Agregar button is clicked', () => {
    render(<ItemCount stock={10} initial={2} onAdd={mockOnAdd} />)
    const addButton = screen.getByRole('button', { name: /agregar/i })
    fireEvent.click(addButton)
    expect(mockOnAdd).toHaveBeenCalledWith(2)
  })

  it('disables buttons appropriately', () => {
    render(<ItemCount stock={1} initial={1} onAdd={mockOnAdd} />)
    const incrementButton = screen.getByLabelText('Aumentar')
    expect(incrementButton).toBeDisabled()
  })
})
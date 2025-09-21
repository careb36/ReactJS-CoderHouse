import { render, screen } from '@testing-library/react'
import { vi, describe, test, expect } from 'vitest'
import ItemList from './components/ItemList'
import { products } from './data/mockData'

// Mock ItemCard to avoid rendering complexity
vi.mock('./components/ItemCard', () => {
  return {
    default: function MockItemCard({ product }: { product: any }) {
      return <div data-testid={`item-${product.id}`}>{product.name}</div>
    }
  }
})

describe('ItemList React Keys', () => {
  test('renders each item with key={product.id}', () => {
    const { container } = render(<ItemList products={products} />)

    // Check that each product is rendered
    products.forEach(product => {
      expect(screen.getByTestId(`item-${product.id}`)).toBeInTheDocument()
      expect(screen.getByText(product.name)).toBeInTheDocument()
    })

    // Verify the correct number of items are rendered
    expect(container.querySelectorAll('[data-testid^="item-"]')).toHaveLength(products.length)
  })

  test('renders empty state when no products', () => {
    render(<ItemList products={[]} />)
    expect(screen.getByText('No se encontraron productos en esta categoría.')).toBeInTheDocument()
  })

  test('renders all products correctly', () => {
    render(<ItemList products={products} />)

    // Check that all product names are displayed
    products.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument()
    })
  })
})

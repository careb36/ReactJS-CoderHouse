import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, test, expect } from 'vitest'
import { AppRoutes } from './App'

// Mock the lazy loaded component
vi.mock('./containers/ItemDetailContainer', () => ({
  default: () => <div>Item Detail Container</div>
}))

describe('App Routing', () => {
  const renderApp = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRoutes />
      </MemoryRouter>
    )
  }

  test('renders home route with catalog greeting', () => {
    renderApp('/')
    expect(screen.getByText('¡Bienvenido a nuestra tienda en línea!')).toBeInTheDocument()
  })

  test('renders category route with filtered catalog greeting', () => {
    renderApp('/category/cafes-premium')
    expect(screen.getByText('Catálogo por categoría')).toBeInTheDocument()
  })

  test('renders item detail route', async () => {
    await act(async () => {
      renderApp('/item/1')
    })
    expect(screen.getByText('Item Detail Container')).toBeInTheDocument()
  })

  test('renders 404 page for invalid routes', () => {
    renderApp('/not-a-route')
    expect(screen.getByText('404 - Página no encontrada')).toBeInTheDocument()
    expect(screen.getByText('La página que buscas no existe.')).toBeInTheDocument()
  })

  test('renders navigation bar on all routes', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { name: 'Caro Coffee', level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Cafés Premium')).toBeInTheDocument()
    expect(screen.getByText('Equipos')).toBeInTheDocument()
    expect(screen.getByText('Suscripciones')).toBeInTheDocument()
  })
})

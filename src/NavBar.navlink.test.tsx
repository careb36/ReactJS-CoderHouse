import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from './components/NavBar'

describe('NavBar NavLink aria-current', () => {
  const renderNavBar = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <NavBar />
      </MemoryRouter>
    )
  }

  test('sets aria-current="page" on active home route', () => {
    renderNavBar('/')
    const homeLink = screen.getByText('Inicio').closest('a')
    expect(homeLink).toHaveAttribute('aria-current', 'page')
  })

  test('sets aria-current="page" on active category route', () => {
    renderNavBar('/category/cafes-premium')
    const categoryLink = screen.getByText('Cafés Premium').closest('a')
    expect(categoryLink).toHaveAttribute('aria-current', 'page')
  })

  test('does not set aria-current="page" on inactive routes', () => {
    renderNavBar('/')
    const categoryLink = screen.getByText('Cafés Premium').closest('a')
    const equipmentLink = screen.getByText('Equipos').closest('a')
    const subscriptionLink = screen.getByText('Suscripciones').closest('a')

    expect(categoryLink).not.toHaveAttribute('aria-current', 'page')
    expect(equipmentLink).not.toHaveAttribute('aria-current', 'page')
    expect(subscriptionLink).not.toHaveAttribute('aria-current', 'page')
  })

  test('renders all navigation links', () => {
    renderNavBar('/')
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Cafés Premium')).toBeInTheDocument()
    expect(screen.getByText('Equipos')).toBeInTheDocument()
    expect(screen.getByText('Suscripciones')).toBeInTheDocument()
  })
})

import { useMemo } from 'react'

import PropTypes from 'prop-types'

/**
 * PaginationControls - Component for product pagination UI.
 * Handles page navigation with numbered buttons and prev/next controls.
 */
export function PaginationControls({ currentPage, totalPages, goToPage }) {
  // Paginación numerada (ventana alrededor de la actual)
  const pageWindow = useMemo(() => {
    const pages = []
    const win = 2 // páginas alrededor
    const add = (n) => { if (n >= 1 && n <= totalPages && !pages.includes(n)) pages.push(n) }
    add(1)
    for (let i = currentPage - win; i <= currentPage + win; i++) add(i)
    add(totalPages)
    pages.sort((a,b) => a-b)
    return pages
  }, [currentPage, totalPages])

  if (totalPages <= 1) return null

  return (
    <nav aria-label="Paginación" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
      {/* Números */}
      {pageWindow.map((n, idx) => {
        const prev = pageWindow[idx - 1]
        const showDots = prev && n - prev > 1
        return (
          <span key={n}>
            {showDots && <span style={{ padding: '0 0.25rem', opacity: 0.7 }}>…</span>}
            <button onClick={() => goToPage(n)} aria-current={n === currentPage ? 'page' : undefined} style={{ fontWeight: n === currentPage ? 800 : 500 }}>{n}</button>
          </span>
        )
      })}
      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
    </nav>
  )
}

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
}

export default PaginationControls
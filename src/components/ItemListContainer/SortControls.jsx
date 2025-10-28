import PropTypes from 'prop-types'

/**
 * SortControls - Component for product sorting UI.
 * Handles sort key, order, and clear filters functionality.
 */
export function SortControls({ sortKey, sortOrder, setSort, clearFilters, hasActiveFilters }) {
  return (
    <div>
      {/* Ordenar */}
      <details open style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,108,17,0.25)', borderRadius: '8px', padding: '0.5rem 0.75rem' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Ordenar</summary>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          <select value={sortKey || ''} onChange={(e) => setSort(e.target.value || null, sortOrder)}>
            <option value="">Sin orden</option>
            <option value="price">Precio</option>
            <option value="title">Título</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSort(sortKey || 'price', e.target.value)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </details>
      {hasActiveFilters && (
        <div>
          <button onClick={() => { clearFilters(); }}>Limpiar todos</button>
        </div>
      )}
    </div>
  )
}

SortControls.propTypes = {
  sortKey: PropTypes.string,
  sortOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
  setSort: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  hasActiveFilters: PropTypes.bool.isRequired,
}

export default SortControls
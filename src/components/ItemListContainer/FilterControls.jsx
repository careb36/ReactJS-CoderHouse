/**
 * FilterControls - Component for product filtering UI.
 * Handles origin, roast level, bean type, stock, and price filters.
 *
 * @param {Object} props
 * @param {Array} props.origins - Available origins
 * @param {Array} props.roasts - Available roast levels
 * @param {Array} props.beanTypes - Available bean types
 * @param {Array} props.selectedOrigins - Currently selected origins
 * @param {Array} props.selectedRoasts - Currently selected roasts
 * @param {Array} props.selectedBeans - Currently selected beans
 * @param {boolean} props.inStock - Stock filter state
 * @param {number|null} props.minPrice - Minimum price filter
 * @param {number|null} props.maxPrice - Maximum price filter
 * @param {Object} props.priceStats - Price range statistics
 * @param {Function} props.toggleValue - Toggle filter value function
 * @param {Function} props.setPrice - Set price range function
 * @param {Function} props.setInStock - Set stock filter function
 */

import PropTypes from 'prop-types'

/**
 * FilterControls - Component for product filtering UI.
 * Handles origin, roast level, bean type, stock, and price filters.
 */
export function FilterControls({
  origins,
  roasts,
  beanTypes,
  selectedOrigins,
  selectedRoasts,
  selectedBeans,
  inStock,
  minPrice,
  maxPrice,
  priceStats,
  toggleValue,
  setPrice,
  setInStock
}) {
  return (
    <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '0.75rem' }}>
      {/* Origen */}
      {origins.length > 0 && (
        <details open style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,108,17,0.25)', borderRadius: '8px', padding: '0.5rem 0.75rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Origen</summary>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
            {origins.map(val => {
              const checked = selectedOrigins.includes(val.toLowerCase())
              return (
                <label key={val} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={checked} onChange={() => toggleValue('origin', val)} aria-describedby={`origin-${val.replace(/\s+/g, '-').toLowerCase()}`} />
                  <span id={`origin-${val.replace(/\s+/g, '-').toLowerCase()}`}>{val}</span>
                </label>
              )
            })}
          </div>
        </details>
      )}

      {/* Tueste */}
      {roasts.length > 0 && (
        <details open style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,108,17,0.25)', borderRadius: '8px', padding: '0.5rem 0.75rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Tueste</summary>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
            {roasts.map(val => {
              const checked = selectedRoasts.includes(val.toLowerCase())
              return (
                <label key={val} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={checked} onChange={() => toggleValue('roast', val)} aria-describedby={`roast-${val.replace(/\s+/g, '-').toLowerCase()}`} />
                  <span id={`roast-${val.replace(/\s+/g, '-').toLowerCase()}`}>{val}</span>
                </label>
              )
            })}
          </div>
        </details>
      )}

      {/* Tipo de grano */}
      {beanTypes.length > 0 && (
        <details open style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,108,17,0.25)', borderRadius: '8px', padding: '0.5rem 0.75rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Tipo de grano</summary>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
            {beanTypes.map(val => {
              const checked = selectedBeans.includes(val.toLowerCase())
              return (
                <label key={val} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={checked} onChange={() => toggleValue('bean', val)} aria-describedby={`bean-${val.replace(/\s+/g, '-').toLowerCase()}`} />
                  <span id={`bean-${val.replace(/\s+/g, '-').toLowerCase()}`}>{val}</span>
                </label>
              )
            })}
          </div>
        </details>
      )}

      {/* Stock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} aria-describedby="stock-filter" />
          <span id="stock-filter">Con stock</span>
        </label>
      </div>

      {/* Precio */}
      <details open style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,108,17,0.25)', borderRadius: '8px', padding: '0.5rem 0.75rem' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Precio</summary>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          <label>Min
            <input type="number" inputMode="numeric" defaultValue={Number.isFinite(minPrice) ? String(minPrice) : ''} onBlur={(e) => setPrice(e.target.value, Number.isFinite(maxPrice) ? maxPrice : '')} style={{ marginLeft: '0.25rem', width: '100px' }} />
          </label>
          <label>Max
            <input type="number" inputMode="numeric" defaultValue={Number.isFinite(maxPrice) ? String(maxPrice) : ''} onBlur={(e) => setPrice(Number.isFinite(minPrice) ? minPrice : '', e.target.value)} style={{ marginLeft: '0.25rem', width: '100px' }} />
          </label>
          <button type="button" onClick={() => setPrice('', '')}>Limpiar</button>
          {/* Slider simple para máximo */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
            <span style={{ opacity: 0.75 }}>Max slider</span>
            <input type="range" min={priceStats.min} max={priceStats.max} value={Number.isFinite(maxPrice) ? maxPrice : priceStats.max} onChange={(e) => setPrice(Number.isFinite(minPrice) ? minPrice : '', Number(e.target.value))} />
            <small>{Number.isFinite(maxPrice) ? maxPrice : priceStats.max}</small>
          </div>
        </div>
      </details>
    </div>
  )
}

FilterControls.propTypes = {
  origins: PropTypes.arrayOf(PropTypes.string).isRequired,
  roasts: PropTypes.arrayOf(PropTypes.string).isRequired,
  beanTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOrigins: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedRoasts: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedBeans: PropTypes.arrayOf(PropTypes.string).isRequired,
  inStock: PropTypes.bool.isRequired,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  priceStats: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  toggleValue: PropTypes.func.isRequired,
  setPrice: PropTypes.func.isRequired,
  setInStock: PropTypes.func.isRequired,
}

export default FilterControls
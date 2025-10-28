import { lazy, Suspense, useEffect, useMemo, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProducts, getProductByCategory } from '../../firebase/api';
import demoProducts from '../../data/demo-products.js';
import Loader from '../Loader/Loader';
import './ItemListContainer.css';

// Lazy load components for better performance
const Item = lazy(() => import('../Item/Item'));
const FilterControls = lazy(() => import('./FilterControls'));
const SortControls = lazy(() => import('./SortControls'));
const PaginationControls = lazy(() => import('./PaginationControls'));

function ItemListContainer( props ){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDemo, setUsingDemo] = useState(false);
  const { categParam, categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = categParam ?? categoryId;
  const demoMode = String(import.meta.env.VITE_DEMO_MODE ?? '').toLowerCase();

  const filterByCategory = useCallback((list) => {
    if (!category) return list
    return list.filter(p => String(p.category || '').toLowerCase() === String(category).toLowerCase())
  }, [category])

  useEffect( () =>{
    let cancelled = false
    async function run(){
      setLoading(true);
      setError(null);
      setUsingDemo(false)

      if (demoMode === 'true'){
        const data = filterByCategory(demoProducts)
        if (!cancelled){ setProducts(data); setUsingDemo(true); setLoading(false) }
        return
      }

      try{
        const promesaDatos = category ? getProductByCategory(category) : getProducts();
        const respuesta = await promesaDatos
        if (!cancelled){
          if (Array.isArray(respuesta) && respuesta.length === 0 && demoMode === 'auto'){
            setProducts(filterByCategory(demoProducts));
            setUsingDemo(true)
          } else {
            setProducts(respuesta)
          }
        }
      }catch(e){
        if (demoMode === 'auto'){
          if (!cancelled){ setProducts(filterByCategory(demoProducts)); setUsingDemo(true) }
        }else{
          if (!cancelled){ setError(e?.message || 'Error cargando productos') }
        }
      }finally{
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [category, demoMode, filterByCategory])

  // Helpers de filtros desde query
  const parseList = useCallback((key) => {
    const raw = searchParams.get(key)
    if (!raw) return []
    return raw.split(',').map(s => s.trim()).filter(Boolean)
  }, [searchParams])

  const setList = useCallback((key, list) => {
    const next = new URLSearchParams(searchParams)
    if (!list || list.length === 0){
      next.delete(key)
    } else {
      next.set(key, Array.from(new Set(list)).join(','))
    }
    // al cambiar filtros, volver a página 1
    next.delete('page')
    setSearchParams(next)
  }, [searchParams, setSearchParams])

  const toggleValue = useCallback((key, value) => {
    const current = parseList(key)
    const idx = current.findIndex(v => v.toLowerCase() === String(value).toLowerCase())
    if (idx >= 0){ current.splice(idx, 1) } else { current.push(String(value)) }
    setList(key, current)
  }, [parseList, setList])

  const clearFilters = useCallback(() => {
    const next = new URLSearchParams(searchParams)
    next.delete('origin')
    next.delete('roast')
    next.delete('bean')
    next.delete('min')
    next.delete('max')
    next.delete('sort')
    next.delete('order')
    next.delete('inStock')
    next.delete('page')
    setSearchParams(next)
  }, [searchParams, setSearchParams])

  // Valores seleccionados
  const selectedOrigins = parseList('origin').map(v => v.toLowerCase())
  const selectedRoasts = parseList('roast').map(v => v.toLowerCase())
  const selectedBeans = parseList('bean').map(v => v.toLowerCase())

  // Filtro de texto (q), precio, stock y paginación
  const query = (searchParams.get('q') || '').trim().toLowerCase()
  const minPrice = Number(searchParams.get('min') || '')
  const maxPrice = Number(searchParams.get('max') || '')
  const inStock = (searchParams.get('inStock') || '').toLowerCase() === 'true'
  const sortKey = (searchParams.get('sort') || '').toLowerCase() // 'price' | 'title'
  const sortOrder = (searchParams.get('order') || 'asc').toLowerCase() // 'asc' | 'desc'
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)
  const pageSize = 9

  // Rango de precios detectado y valores únicos
  const { priceStats, origins, roasts, beanTypes } = useMemo(() => {
    let min = Infinity, max = -Infinity
    const o = new Set(), r = new Set(), b = new Set()
    for (const p of products){
      const pr = Number(p.price || 0)
      if (Number.isFinite(pr)){
        if (pr < min) min = pr
        if (pr > max) max = pr
      }
      if (p.origin) o.add(String(p.origin))
      if (p.roastLevel) r.add(String(p.roastLevel))
      if (p.beanType) b.add(String(p.beanType))
    }
    if (!Number.isFinite(min)) min = 0
    if (!Number.isFinite(max)) max = 0
    return {
      priceStats: { min, max },
      origins: Array.from(o).sort(),
      roasts: Array.from(r).sort(),
      beanTypes: Array.from(b).sort(),
    }
  }, [products])

  // Aplicar filtros en orden: origin/roast/bean -> precio -> stock -> texto -> sort -> paginación
  const filteredBase = useMemo(() => {
    return products.filter(p => {
      const originOk = selectedOrigins.length === 0 || selectedOrigins.includes(String(p.origin || '').toLowerCase())
      const roastOk = selectedRoasts.length === 0 || selectedRoasts.includes(String(p.roastLevel || '').toLowerCase())
      const beanOk = selectedBeans.length === 0 || selectedBeans.includes(String(p.beanType || '').toLowerCase())
      const price = Number(p.price || 0)
      const minOk = Number.isFinite(minPrice) ? price >= minPrice : true
      const maxOk = Number.isFinite(maxPrice) ? price <= maxPrice : true
      const stockOk = inStock ? Number(p.stock || 0) > 0 : true
      return originOk && roastOk && beanOk && minOk && maxOk && stockOk
    })
  }, [products, selectedOrigins, selectedRoasts, selectedBeans, minPrice, maxPrice, inStock])

  const filtered = useMemo(() => {
    let base = filteredBase
    if (query){
      const fields = ['title', 'description', 'origin', 'roastLevel', 'category', 'beanType']
      base = base.filter(p => fields.some(f => String(p[f] || '').toLowerCase().includes(query)))
    }
    if (sortKey === 'price' || sortKey === 'title'){
      const dir = sortOrder === 'desc' ? -1 : 1
      base = [...base].sort((a, b) => {
        const av = sortKey === 'price' ? Number(a.price || 0) : String(a.title || '')
        const bv = sortKey === 'price' ? Number(b.price || 0) : String(b.title || '')
        if (av < bv) return -1 * dir
        if (av > bv) return 1 * dir
        return 0
      })
    }
    return base
  }, [filteredBase, query, sortKey, sortOrder])

  // UI helpers para setear precio, stock y ordenamiento
  const setPrice = useCallback((min, max) => {
    const next = new URLSearchParams(searchParams)
    if (min === '' || min === null) next.delete('min'); else next.set('min', String(min))
    if (max === '' || max === null) next.delete('max'); else next.set('max', String(max))
    next.delete('page')
    setSearchParams(next)
  }, [searchParams, setSearchParams])

  const setSort = useCallback((key, order) => {
    const next = new URLSearchParams(searchParams)
    if (!key) { next.delete('sort'); next.delete('order') }
    else { next.set('sort', key); next.set('order', order || 'asc') }
    next.delete('page')
    setSearchParams(next)
  }, [searchParams, setSearchParams])

  const setInStock = useCallback((flag) => {
    const next = new URLSearchParams(searchParams)
    if (flag) next.set('inStock', 'true'); else next.delete('inStock')
    next.delete('page')
    setSearchParams(next)
  }, [searchParams, setSearchParams])

  // Paginación
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage])

  function goToPage(n){
    const next = new URLSearchParams(searchParams)
    if (n <= 1) next.delete('page'); else next.set('page', String(n))
    setSearchParams(next)
  }


  return (
    <section className="item-list-container">
      <h2>{props.greeting}</h2>
      <div>
        { usingDemo && (
          <div className="demo-mode-banner">
            <span className="demo-mode-icon">☕</span>
            <p className="demo-mode-text">Mostrando catálogo de ejemplo (Demo Mode)</p>
          </div>
        )}
        { loading && <div className="item-list-container__loading"><Loader label="Cargando productos..."/></div> }
        { error && <p role="alert" style={{ color: '#d63031', padding: '12px', backgroundColor: '#ffeaea', border: '1px solid #ff6b6b', borderRadius: '4px' }}>{error}. Configura Firebase o activa VITE_DEMO_MODE.</p> }
        { !loading && !error && products.length === 0 && <p>No hay productos disponibles</p> }

        { !loading && !error && products.length > 0 && (
          <div>
            {/* Filtros y controles */}
            <Suspense fallback={<Loader label="Cargando filtros..." />}>
              <FilterControls
                origins={origins}
                roasts={roasts}
                beanTypes={beanTypes}
                selectedOrigins={selectedOrigins}
                selectedRoasts={selectedRoasts}
                selectedBeans={selectedBeans}
                inStock={inStock}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceStats={priceStats}
                toggleValue={toggleValue}
                setPrice={setPrice}
                setInStock={setInStock}
              />
              <SortControls
                sortKey={sortKey}
                sortOrder={sortOrder}
                setSort={setSort}
                clearFilters={clearFilters}
                hasActiveFilters={selectedOrigins.length > 0 || selectedRoasts.length > 0 || selectedBeans.length > 0 || Number.isFinite(minPrice) || Number.isFinite(maxPrice) || sortKey || inStock}
              />
            </Suspense>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem' }}>
              <h4>Nuestros productos</h4>
              <div style={{ color: 'var(--b-txt, #eceff4)' }}>
                {query ? (
                  <span>Filtro: “{query}” · </span>
                ) : null}
                <span>{paged.length} / {total}</span>
              </div>
            </div>
            <div className="item-list">
              <Suspense fallback={<Loader label="Cargando productos..." />}>
                { paged.map(item =>  <Item {...item} key={item.id ?? item.title}  /> )}
              </Suspense>
            </div>
            <Suspense fallback={<div>Cargando paginación...</div>}>
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
              />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  )
}

export default ItemListContainer;

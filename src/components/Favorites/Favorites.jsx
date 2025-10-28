import { useEffect, useMemo, useState } from 'react'
import { useWishlist } from '../../hooks/useWishlist'
import { getProducts } from '../../firebase/api'
import demoProducts from '../../data/demo-products'
import Loader from '../Loader/Loader'
import Item from '../Item/Item'

function Favorites(){
  const { list } = useWishlist()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const demoMode = String(import.meta.env.VITE_DEMO_MODE ?? '').toLowerCase();

  useEffect(() => {
    let cancelled = false
    async function run(){
      setLoading(true); setError(null)
      try{
        // Cargar todos y filtrar por ids en wishlist
        let data = []
        if (demoMode === 'true'){
          data = demoProducts
        } else {
          try{
            data = await getProducts()
            if (!Array.isArray(data) && demoMode === 'auto') data = demoProducts
          }catch(e){
            if (demoMode === 'auto') data = demoProducts
            else throw e
          }
        }
        if (!cancelled){ setProducts(Array.isArray(data) ? data : []); setLoading(false) }
      }catch(e){
        if (!cancelled){ setError(e?.message || 'Error cargando favoritos'); setLoading(false) }
      }
    }
    run()
    return () => { cancelled = true }
  }, [demoMode])

  const favorites = useMemo(() => {
    const wanted = new Set((list || []).map(String))
    return (products || []).filter(p => wanted.has(String(p.id)))
  }, [products, list])

  return (
    <section className="item-list-container">
      <h2>Favoritos</h2>
      {loading && <div className="item-list-container__loading"><Loader label="Cargando favoritos..."/></div>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && favorites.length === 0 && <p>No tienes productos en favoritos.</p>}
      {!loading && !error && favorites.length > 0 && (
        <div>
          <div className="item-list">
            {favorites.map(item => <Item key={item.id ?? item.title} {...item} />)}
          </div>
        </div>
      )}
    </section>
  )
}

export default Favorites


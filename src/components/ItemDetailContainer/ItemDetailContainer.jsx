import { useEffect, useState, useContext } from "react";
import { getProductById } from "../../firebase/api";
import { useParams, Link } from "react-router-dom"
import './ItemDetailContainer.css';
import cartContext from "../../context/cartContext";
import ItemCount from "../ItemCount.jsx";
import { useCurrency } from "../../context/currencyContext";
import { useProductImage } from "../../hooks/useProductImage";
import demoProducts from '../../data/demo-products.js'
import Loader from '../Loader/Loader'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import productReviewsMap from '../../data/product-reviews'

export default function ItemDetailContainer() {
  const { idParam, id } = useParams();  
  const [ item, setItem] = useState(null)
  const [added, setAdded] = useState(false)
  const { addItem } = useContext(cartContext)
  const { format } = useCurrency()
  const { url } = useProductImage(item)
  const demoMode = String(import.meta.env.VITE_DEMO_MODE ?? '').toLowerCase();

  useEffect( () => {
      const productId = idParam ?? id
      if (!productId) return
      let cancelled = false
      async function run(){
        try{
          const res = await getProductById(productId)
          if (!cancelled){
            if (!res || !res.title){
              if (demoMode === 'true' || demoMode === 'auto'){
                const demo = demoProducts.find(p => p.id === productId)
                setItem(demo ?? res)
                return
              }
            }
            setItem(res)
          }
        }catch{
          if (!cancelled){
            if (demoMode === 'true' || demoMode === 'auto'){
              const demo = demoProducts.find(p => p.id === productId)
              setItem(demo ?? null)
            } else {
              setItem(null)
            }
          }
        }
      }
      run()
      return () => { cancelled = true }
  }, [idParam, id, demoMode])

  function onAdd(count){
    if (!item) return
    const payload = { id: item.id, title: item.title, price: item.price, stock: item.stock, imgURL: item.imgURL }
    addItem(payload, count)
    setAdded(true)
  }

  const effectiveRating = item?.rating ?? productReviewsMap[item?.id]?.rating ?? null
  const effectiveReviews = item?.reviews ?? productReviewsMap[item?.id]?.reviews ?? null

  function renderStars(avg){
    if (!avg || Number.isNaN(Number(avg))) return null
    const val = Math.max(0, Math.min(5, Number(avg)))
    const full = Math.floor(val)
    const half = val - full >= 0.5
    const empty = 5 - full - (half ? 1 : 0)
    return (
      <span className="review-stars" aria-label={`${val} de 5`}>
        {Array.from({length: full}).map((_,i) => <FaStar key={`f${i}`}/>) }
        {half && <FaStarHalfAlt key="half"/>}
        {Array.from({length: empty}).map((_,i) => <FaRegStar key={`e${i}`}/>) }
      </span>
    )
  }

  if (!item){
    return (
      <div className="item-detail"><Loader label="Cargando producto..."/></div>
    )
  }

  return (
     <div className="item-detail">      
      <nav className="item-detail-breadcrumbs">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/">Shop</Link>
        { item.category && <><span>/</span><Link to={`/category/${String(item.category).toLowerCase()}`}>{item.category}</Link></> }
        <span>/</span>
        <span aria-current="page">{item.title}</span>
      </nav>

      <h2 className="item-detail-title">{item.title}</h2>

      <div className="item-detail-content">
        <img
          className="item-detail-img"
          loading="lazy"
          src={url}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.svg' }}
          alt={item.title}
        />
        <div className="item-detail-info">
          <p className="item-detail-price">{format(item.price)}</p>
          { item.description && <p className="item-detail-description">{item.description}</p> }

          <div className="item-detail-attrs">
            { item.origin && (
              <div className="item-detail-attr"><span>Origen</span><strong>{item.origin}</strong></div>
            )}
            { item.roastLevel && (
              <div className="item-detail-attr"><span>Tueste</span><strong>{item.roastLevel}</strong></div>
            )}
            { item.weight && (
              <div className="item-detail-attr"><span>Peso</span><strong>{item.weight}</strong></div>
            )}
          </div>

          <div className="item-detail-cta">
            {added
              ? <Link to="/cart"><button className="btn-primary">Ir al Carrito</button></Link>
              : <ItemCount stock={item.stock ?? 0} initial={1} onAdd={onAdd} />
            }
          </div>
        </div>
      </div>

      { (effectiveRating || (effectiveReviews && effectiveReviews.length)) && (
        <div className="item-detail-reviews">
          <h3>Opiniones de clientes</h3>
          {effectiveRating && (
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom: 8 }}>
              {renderStars(effectiveRating)}
              <strong>{Number(effectiveRating).toFixed(1)}</strong>
              {effectiveReviews?.length ? <span>({effectiveReviews.length} reseñas)</span> : null}
            </div>
          )}
          {effectiveReviews?.length ? (
            <div className="review-grid">
              {effectiveReviews.map((r, idx) => (
                <article className="review-card" key={idx}>
                  <div className="review-head">
                    <div className="review-user"><div className="review-avatar" aria-hidden="true" /> <span>{r.user}</span></div>
                    <div className="review-stars" aria-label={`${r.rating} de 5`}>
                      {renderStars(r.rating)}
                    </div>
                  </div>
                  <p>{r.text}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      )}
      </div>
  )
}
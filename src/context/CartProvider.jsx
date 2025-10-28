import { useMemo, useState, useEffect } from "react";
import CartContext from './cartContext'

/**
 * CartContextProvider - Provides shopping cart state and operations.
 * Features:
 * - localStorage persistence (CART_V1 key)
 * - Stock validation on add/update
 * - Memoized totals for performance
 * - Legacy API compatibility (addToCart, countItems, clearCart)
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function CartContextProvider(props){
  // Initialize cart from localStorage with SSR safety
  const [cartItems, setCartItems] = useState(() => {
    try{
      if (typeof window === 'undefined') return []
      const raw = localStorage.getItem('CART_V1')
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    }catch{ return [] }
  });

  // Persist cart to localStorage on changes
  useEffect(() => {
    try{
      if (typeof window !== 'undefined') localStorage.setItem('CART_V1', JSON.stringify(cartItems))
    }catch{/* ignore */}
  }, [cartItems])

  /**
   * Adds item to cart or updates quantity if already present.
   * Respects stock limits and updates image URL if available.
   * 
   * @param {Object} newItem - Product to add
   * @param {number} count - Quantity to add
   */
  function addToCart(newItem, count = 1){
    const newCart = structuredClone(cartItems);

    const index = newCart.findIndex( item => item.id === newItem.id )
    if (index !== -1){
      const updateItem = newCart[index];
      const desired = (updateItem.count ?? 0) + count;
      const maxCount = typeof newItem.stock === 'number' ? Math.min(desired, newItem.stock) : desired;
      updateItem.count = maxCount;
      // Update image URL if not present
      if (newItem.imgURL && !updateItem.imgURL) updateItem.imgURL = newItem.imgURL
    }
    else {
      const itemToAdd = { ...newItem, count: Math.min(count, newItem.stock ?? count) };
      newCart.push(itemToAdd);
    }

    setCartItems(newCart)
  }

  /** Official API alias for addToCart */
  function addItem(item, quantity){ return addToCart(item, quantity) }
  
  /** Checks if product is already in cart */
  function isInCart(id){ return cartItems.some(it => it.id === id) }
  
  /** Removes item from cart by ID */
  function removeItem( idDelete ){
    const newCart = structuredClone(cartItems);
    const newCartWithDelete = newCart.filter( item => item.id !== idDelete )
    setCartItems(newCartWithDelete)
  }
  
  /** Clears entire cart */
  function clear(){ setCartItems([]) }

  /**
   * Sets exact quantity for an item in cart.
   * Removes item if quantity <= 0, respects stock limits.
   * 
   * @param {string} id - Product ID
   * @param {number} nextCount - New quantity
   */
  function setItemCount(id, nextCount){
    const newCart = structuredClone(cartItems)
    const idx = newCart.findIndex(it => it.id === id)
    if (idx === -1) return
    const item = newCart[idx]
    const maxCount = typeof item.stock === 'number' ? Math.min(nextCount, item.stock) : nextCount
    if (maxCount <= 0) newCart.splice(idx, 1)
    else item.count = maxCount
    setCartItems(newCart)
  }
  
  /** Increments item quantity by 1 */
  function incrementItem(id){ setItemCount(id, (cartItems.find(i => i.id === id)?.count ?? 0) + 1) }
  
  /** Decrements item quantity by 1 */
  function decrementItem(id){ setItemCount(id, (cartItems.find(i => i.id === id)?.count ?? 0) - 1) }

  // Memoized totals for performance
  const totalUnits = useMemo(() => cartItems.reduce((acc, it) => acc + (it.count ?? 0), 0), [cartItems])
  const totalPrice = useMemo(() => cartItems.reduce((acc, it) => acc + (it.price ?? 0) * (it.count ?? 0), 0), [cartItems])

  // Legacy API compatibility aliases
  function countItems(){ return totalUnits }
  function clearCart(){ return clear() }

  return (
    <CartContext.Provider value={{
      cart: cartItems,
      addItem,
      removeItem,
      clear,
      isInCart,
      totalUnits,
      totalPrice,
      setItemCount,
      incrementItem,
      decrementItem,
      addToCart,
      countItems,
      clearCart,
    }}>
      { props.children }
    </CartContext.Provider>
  )
}

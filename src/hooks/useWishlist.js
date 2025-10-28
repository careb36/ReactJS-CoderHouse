import { useCallback, useEffect, useState } from 'react'

const KEY = 'wishlist'

/**
 * Reads wishlist from localStorage.
 * @returns {Array<string>} Array of product IDs
 */
function read(){
  try{
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  }catch{
    return []
  }
}

/**
 * Writes wishlist to localStorage with deduplication.
 * @param {Array<string>} list - Product IDs array
 */
function write(list){
  try{
    localStorage.setItem(KEY, JSON.stringify(Array.from(new Set(list))))
  }catch{
    // ignore localStorage errors
  }
}

/**
 * useWishlist - Hook for managing user's favorite products.
 * Persists favorites to localStorage and provides toggle functionality.
 * 
 * @returns {Object} Wishlist operations
 * @returns {Array<string>} returns.list - Array of favorite product IDs
 * @returns {Function} returns.isFavorite - Check if product is favorited
 * @returns {Function} returns.toggle - Toggle favorite status
 * @returns {Function} returns.clear - Clear all favorites
 */
export function useWishlist(){
  const [ids, setIds] = useState(() => read())

  // Persist to localStorage on changes
  useEffect(() => {
    write(ids)
  }, [ids])

  const isFavorite = useCallback((id) => ids.includes(String(id)), [ids])

  const toggle = useCallback((id) => {
    const sId = String(id)
    setIds(prev => prev.includes(sId) ? prev.filter(x => x !== sId) : [...prev, sId])
  }, [])

  const clear = useCallback(() => setIds([]), [])

  return { list: ids, isFavorite, toggle, clear }
}


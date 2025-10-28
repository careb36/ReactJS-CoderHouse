/**
 * Firebase Storage Helper - Image URL resolution.
 * Provides lazy-loaded Storage support for product images.
 * Safe to import even without Storage configuration.
 */

import { app } from './config'

/**
 * Resolves a usable image URL from either a full URL or Firebase Storage path.
 * 
 * Behavior:
 * - If input is an HTTP(S) URL, returns it unchanged
 * - If input is a Storage path (e.g., "products/espresso.jpg"), fetches download URL
 * - Returns placeholder on error or empty input
 * 
 * Uses lazy import to avoid initializing Storage unnecessarily.
 *
 * @param {string|undefined|null} src - Image URL or Storage path
 * @returns {Promise<string>} Resolved URL for <img src="..."/>
 */
export async function resolveImageUrl(src){
  const PLACEHOLDER = '/placeholder.svg'
  
  if (!src || typeof src !== 'string') return PLACEHOLDER
  
  const trimmed = src.trim()
  if (!trimmed) return PLACEHOLDER
  
  // Return as-is if already a full URL
  const isHttp = /^https?:\/\//i.test(trimmed)
  if (isHttp) return trimmed

  try{
    // Lazy import Firebase Storage to avoid initialization overhead
    const { getStorage, ref, getDownloadURL } = await import('firebase/storage')
    const storage = getStorage(app)
    const r = ref(storage, trimmed)
    const url = await getDownloadURL(r)
    return url || PLACEHOLDER
  }catch{
    return PLACEHOLDER
  }
}

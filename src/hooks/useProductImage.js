import { useEffect, useState } from 'react'
import { resolveImageUrl } from '../firebase/storage'

/**
 * useProductImage - Resolves product image URL from various sources.
 * 
 * Priority order:
 *  1. product.imgURL or product.imageURL (full public URL)
 *  2. product.imagePath or product.image_path (Firebase Storage path)
 *  3. Fallback: /placeholder.svg
 * 
 * Handles asynchronous Firebase Storage URL resolution and provides loading state.
 *
 * @param {Object|null} product - Product object with image data
 * @returns {{ url: string, loading: boolean }} Image URL and loading state
 */
export function useProductImage(product){
  const [url, setUrl] = useState('/placeholder.svg')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    
    async function run(){
      const src = product?.imgURL ?? product?.imageURL ?? product?.imagePath ?? product?.image_path ?? null
      setLoading(true)
      try{
        const resolved = await resolveImageUrl(src)
        if (!cancelled) setUrl(resolved)
      }catch{
        if (!cancelled) setUrl('/placeholder.svg')
      }finally{
        if (!cancelled) setLoading(false)
      }
    }
    
    run()
    return () => { cancelled = true } // Cleanup to prevent state updates on unmount
  }, [product?.imgURL, product?.imageURL, product?.imagePath, product?.image_path])

  return { url, loading }
}

export default useProductImage

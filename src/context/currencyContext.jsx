import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const CurrencyContext = createContext(null)

/**
 * CurrencyContextProvider - Manages currency selection and price conversion.
 * Supports UYU and USD with localStorage persistence.
 * Provides convert() and format() utilities for price display.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function CurrencyContextProvider({ children }){
  const STORAGE_KEY = 'currency'
  
  // Initialize from localStorage with SSR safety
  const [currency, setCurrency] = useState(() => {
    try{
      if (typeof window === 'undefined') return 'UYU'
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved === 'USD' || saved === 'UYU' ? saved : 'UYU'
    }catch{ return 'UYU' }
  })
  
  const usdRateEnv = Number(import.meta.env.VITE_USD_RATE ?? 0.025)

  // Persist currency selection to localStorage
  useEffect(() => {
    try{
      if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, currency)
    }catch{ /* ignore */ }
  }, [currency])

  const value = useMemo(() => {
    /**
     * Converts amount to selected currency.
     * @param {number} amount - Base amount in UYU
     * @returns {number} Converted amount
     */
    function convert(amount){
      if (currency === 'USD') return amount * usdRateEnv
      return amount
    }
    
    /**
     * Formats amount with currency symbol and locale.
     * @param {number} amount - Amount to format
     * @returns {string} Formatted currency string
     */
    function format(amount){
      return new Intl.NumberFormat('es-UY', { style: 'currency', currency }).format(amount)
    }
    
    return { currency, setCurrency, convert, format }
  }, [currency, usdRateEnv])

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

/**
 * useCurrency - Hook to access currency context.
 * Must be used within CurrencyContextProvider.
 *
 * @returns {Object} Currency context value
 * @throws {Error} If used outside provider
 */
export function useCurrency(){
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyContextProvider')
  return ctx
}

// Export hook separately to avoid fast refresh issues
export { useCurrency as useCurrencyHook }

export default CurrencyContext

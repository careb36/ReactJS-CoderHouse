import { createContext, useContext, useMemo, useState } from 'react'

const CurrencyContext = createContext(null)

export function CurrencyContextProvider({ children }){
  const [currency, setCurrency] = useState('UYU')
  const usdRateEnv = Number(import.meta.env.VITE_USD_RATE ?? 0.025)

  const value = useMemo(() => {
    function convert(amount){
      if (currency === 'USD') return amount * usdRateEnv
      return amount
    }
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

export function useCurrency(){
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyContextProvider')
  return ctx
}

export default CurrencyContext

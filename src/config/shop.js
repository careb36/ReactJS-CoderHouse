// Configuración de tienda: cupones y helpers
// Define aquí los cupones disponibles y su descuento en %
export const COUPONS = {
  COFFEE10: 10,
  BIENVENIDA5: 5,
}

export function getCouponDiscountPercent(code){
  if (!code) return 0
  const norm = String(code).trim().toUpperCase()
  return Number(COUPONS[norm] || 0)
}


// Ratings y reseñas por ID de producto (datos de ejemplo "reales")
// Si el producto no trae rating/reviews, el detalle intentará leer de aquí

const productReviews = {
  'blend-espresso-italia': {
    rating: 4.6,
    reviews: [
      { user: 'Alex Johnson', rating: 5, text: 'Blend muy balanceado, crema perfecta para espresso.' },
      { user: 'María García', rating: 4, text: 'Intenso pero dulce, ideal para capuccino.' },
      { user: 'Ben Carter', rating: 5, text: 'Mi favorito para la mañana, consistencia impecable.' },
    ]
  },
  'colombia-supremo-molido': {
    rating: 4.3,
    reviews: [
      { user: 'Lucía', rating: 4, text: 'Notas frutales marcadas, buen molido para filtro.' },
      { user: 'Diego', rating: 5, text: 'Dulzor agradable, repetiría.' },
    ]
  },
  'kenya-aa-grano': {
    rating: 4.8,
    reviews: [
      { user: 'Sofía', rating: 5, text: 'Brillante y complejo, excelente para V60.' },
      { user: 'Martín', rating: 4.5, text: 'Cítrico y vino tinto, espectacular.' },
    ]
  },
}

export default productReviews


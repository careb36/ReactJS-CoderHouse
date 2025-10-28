// Catálogo de ejemplo para modo demo (sin Firebase)
// Puedes forzar este catálogo seteando VITE_DEMO_MODE=true
// o usar fallback automático con VITE_DEMO_MODE=auto

const demoProducts = [
  {
    id: 'blend-espresso-italia',
    title: 'Blend Espresso Italia',
    description: 'Mezcla equilibrada de granos arábica y robusta, ideal para espresso intenso.',
    price: 520,
    category: 'grano',
    stock: 24,
    origin: 'Brasil/India',
    roastLevel: 'Medio',
    weight: '250g',
    imgURL: 'https://source.unsplash.com/8blVdQB0hoI/800x600'
  },
  {
    id: 'colombia-supremo-molido',
    title: 'Colombia Supremo Molido',
    description: 'Notas dulces y frutales. Molido medio para filtros y cafeteras de goteo.',
    price: 480,
    category: 'molido',
    stock: 30,
    origin: 'Colombia',
    roastLevel: 'Medio-Claro',
    weight: '250g',
    imgURL: 'https://source.unsplash.com/Y3AqmbmtLQI/800x600'
  },
  {
    id: 'capsulas-espresso-ristretto',
    title: 'Cápsulas Espresso Ristretto (10u)',
    description: 'Cápsulas compatibles. Sabor intenso, cuerpo alto y retrogusto prolongado.',
    price: 350,
    category: 'capsulas',
    stock: 50,
    imgURL: 'https://source.unsplash.com/zEdCT0qrodE/800x600'
  },
  {
    id: 'capsulas-lungo-suave',
    title: 'Cápsulas Lungo Suave (10u)',
    description: 'Cápsulas compatibles. Taza larga, notas florales y acidez equilibrada.',
    price: 340,
    category: 'capsulas',
    stock: 45,
    imgURL: 'https://source.unsplash.com/XOhI_kW_TaM/800x600'
  },
  {
    id: 'kenya-aa-grano',
    title: 'Kenya AA Grano',
    description: 'Perfil brillante con notas cítricas y vino tinto. Alto en acidez.',
    price: 690,
    category: 'grano',
    stock: 12,
    origin: 'Kenia',
    roastLevel: 'Claro',
    weight: '250g',
    imgURL: 'https://source.unsplash.com/YraDGxii02s/800x600'
  },
  {
    id: 'molido-prensa-francesa',
    title: 'Molido para Prensa Francesa',
    description: 'Molido grueso ideal para prensa francesa. Cuerpo alto y dulzor marcado.',
    price: 450,
    category: 'molido',
    stock: 20,
    weight: '250g',
    imgURL: 'https://source.unsplash.com/c2Y16tC3yO8/800x600'
  },
  {
    id: 'molinillo-manual-acero',
    title: 'Molinillo Manual Acero',
    description: 'Accesorio con muelas cónicas de acero, regulable para distintos métodos.',
    price: 1890,
    category: 'accesorios',
    stock: 15,
    imgURL: 'https://source.unsplash.com/zTZRZV86GhE/800x600'
  },
  {
    id: 'prensa-francesa-600ml',
    title: 'Prensa Francesa 600ml',
    description: 'Jarra de vidrio templado con émbolo de acero inoxidable.',
    price: 1290,
    category: 'accesorios',
    stock: 18,
    imgURL: 'https://source.unsplash.com/DLPN3DYvDzY/800x600'
  },
  {
    id: 'peru-organico-grano',
    title: 'Perú Orgánico Grano',
    description: 'Certificado orgánico. Notas de cacao y nueces, acidez media.',
    price: 650,
    category: 'grano',
    stock: 14,
    origin: 'Perú',
    roastLevel: 'Medio',
    weight: '250g',
    imgURL: 'https://source.unsplash.com/hvkssBsGv2I/800x600'
  },
  {
    id: 'molido-espresso',
    title: 'Molido Espresso',
    description: 'Molido fino para espresso. Crema persistente y cuerpo medio.',
    price: 520,
    category: 'molido',
    stock: 28,
    weight: '250g',
    imgURL: 'https://source.unsplash.com/XOhI_kW_TaM/800x600'
  }
]

export default demoProducts

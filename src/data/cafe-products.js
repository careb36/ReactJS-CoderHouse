const products = [
  {
    id: 1,
    title: 'Café Etiopía Yirgacheffe',
    imgURL: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
    description: 'Café de origen único de Etiopía con notas florales, cítricas y té negro. Proceso natural, altitud 2000msnm.',
    price: 28.00,
    stock: 25,
    category: 'cafes-especialidad'
  },
  {
    id: 2,
    title: 'Café Colombia Huila',
    imgURL: 'https://images.unsplash.com/photo-1587734195503-904fca47e0fb?w=400&h=300&fit=crop',
    description: 'Café colombiano premium con notas de chocolate, nuez y caramelo. Proceso lavado, altitud 1800msnm.',
    price: 26.00,
    stock: 30,
    category: 'cafes-especialidad'
  },
  {
    id: 3,
    title: 'Café Brasil Cerrado',
    imgURL: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop',
    description: 'Café brasileño con cuerpo completo y notas de chocolate amargo. Proceso natural, altitud 1200msnm.',
    price: 24.00,
    stock: 35,
    category: 'cafes-especialidad'
  },
  {
    id: 4,
    title: 'Café Guatemala Antigua',
    imgURL: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    description: 'Café guatemalteco con notas ahumadas y de cacao. Proceso lavado, altitud 1600msnm.',
    price: 27.00,
    stock: 20,
    category: 'cafes-especialidad'
  },
  {
    id: 5,
    title: 'Molinillo Manual Hario',
    imgURL: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop',
    description: 'Molinillo manual de cerámica para molienda precisa. Ideal para preparación de café filtro.',
    price: 45.00,
    stock: 15,
    category: 'equipos'
  },
  {
    id: 6,
    title: 'Aeropress',
    imgURL: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
    description: 'Método de preparación versátil que combina inmersión y presión. Produce café limpio y dulce.',
    price: 35.00,
    stock: 20,
    category: 'equipos'
  },
  {
    id: 7,
    title: 'V60 Dripper',
    imgURL: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400&h=300&fit=crop',
    description: 'Dripper de vidrio para método pour-over. Control preciso del flujo y temperatura.',
    price: 22.00,
    stock: 25,
    category: 'equipos'
  },
  {
    id: 8,
    title: 'French Press 1L',
    imgURL: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop',
    description: 'Prensa francesa de vidrio con malla metálica. Método simple y efectivo para extracción completa.',
    price: 28.00,
    stock: 18,
    category: 'equipos'
  },
  {
    id: 9,
    title: 'Balanza Digital',
    imgURL: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
    description: 'Balanza de precisión con temporizador. Esencial para ratios consistentes en preparación.',
    price: 32.00,
    stock: 12,
    category: 'accesorios'
  },
  {
    id: 10,
    title: 'Termómetro Digital',
    imgURL: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop',
    description: 'Termómetro infrarrojo para medir temperatura del agua. Rango preciso de 0-100°C.',
    price: 18.00,
    stock: 22,
    category: 'accesorios'
  },
  {
    id: 11,
    title: 'Tazas de Porcelana',
    imgURL: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
    description: 'Set de 2 tazas de porcelana blanca. Diseño minimalista para resaltar el café.',
    price: 24.00,
    stock: 30,
    category: 'accesorios'
  },
  {
    id: 12,
    title: 'Filtros de Papel V60',
    imgURL: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    description: 'Paquete de 100 filtros de papel para V60. Sin blanqueadores, 100% biodegradable.',
    price: 8.00,
    stock: 40,
    category: 'accesorios'
  },
  {
    id: 13,
    title: 'Suscripción Mensual',
    imgURL: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
    description: 'Suscripción mensual de 500g de café de especialidad. 4 cafés diferentes por mes.',
    price: 85.00,
    stock: 50,
    category: 'suscripciones'
  },
  {
    id: 14,
    title: 'Suscripción Trimestral',
    imgURL: 'https://images.unsplash.com/photo-1587734195503-904fca47e0fb?w=400&h=300&fit=crop',
    description: 'Suscripción trimestral de 1.5kg de café. Descuento del 10% + envío gratuito.',
    price: 240.00,
    stock: 30,
    category: 'suscripciones'
  },
  {
    id: 15,
    title: 'Café Descafeinado',
    imgURL: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop',
    description: 'Café etíope descafeinado con proceso Swiss Water. Mantiene todo el sabor sin cafeína.',
    price: 32.00,
    stock: 15,
    category: 'cafes-especialidad'
  },
  {
    id: 16,
    title: 'Kit Iniciación Barista',
    imgURL: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    description: 'Kit completo: molinillo manual, Aeropress, balanza y termómetro. Todo lo necesario para comenzar.',
    price: 120.00,
    stock: 8,
    category: 'equipos'
  },
  {
    id: 17,
    title: 'Café Costa Rica Tarrazú',
    imgURL: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
    description: 'Café costarricense con notas dulces de azúcar morena y chocolate. Proceso honey, altitud 1700msnm.',
    price: 29.00,
    stock: 20,
    category: 'cafes-especialidad'
  },
  {
    id: 18,
    title: 'Moka Pot Italiana',
    imgURL: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
    description: 'Moka pot clásica italiana de aluminio. Método tradicional para espresso cremoso.',
    price: 38.00,
    stock: 16,
    category: 'equipos'
  },
  {
    id: 19,
    title: 'Suscripción Semanal',
    imgURL: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400&h=300&fit=crop',
    description: 'Suscripción semanal de 125g. Perfecto para probar diferentes orígenes cada semana.',
    price: 25.00,
    stock: 40,
    category: 'suscripciones'
  },
  {
    id: 20,
    title: 'Café Kenya AA',
    imgURL: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop',
    description: 'Café keniano premium con notas afrutadas y vino tinto. Proceso lavado, altitud 1800msnm.',
    price: 31.00,
    stock: 18,
    category: 'cafes-especialidad'
  }
];

export default products;

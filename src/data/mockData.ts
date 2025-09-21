import type { Product, Category } from '../types';

// Datos mock de categorías para simular la base de datos
// En una aplicación real, estos datos vendrían de Firebase o una API
export const categories: Category[] = [
  {
    id: 'cafes-premium',
    name: 'Cafés Premium',
    description: 'Selección de los mejores granos de café de América Latina'
  },
  {
    id: 'equipos',
    name: 'Equipos',
    description: 'Máquinas y accesorios profesionales para preparación'
  },
  {
    id: 'suscripciones',
    name: 'Suscripciones',
    description: 'Recibe tu café favorito mensualmente'
  }
];

// Datos mock de productos para simular la base de datos
// Cada producto tiene toda la información necesaria: id, nombre, descripción, precio, imagen, categoría y stock
export const products: Product[] = [
  {
    id: 1,
    name: 'Café Colombia Supremo',
    description: 'Granos de café colombiano de alta montaña, notas de chocolate y caramelo',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
    category: 'cafes-premium',
    stock: 15
  },
  {
    id: 2,
    name: 'Café Brasil Santos',
    description: 'Café brasileño con cuerpo suave y aroma a nueces tostadas',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0d3?w=400&h=300&fit=crop&crop=center',
    category: 'cafes-premium',
    stock: 20
  },
  {
    id: 3,
    name: 'Café Etiopía Yirgacheffe',
    description: 'Café etíope con notas florales y cítricas, origen único',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center',
    category: 'cafes-premium',
    stock: 8
  },
  {
    id: 4,
    name: 'Máquina Espresso Profesional',
    description: 'Máquina de espresso semi-automática con molino integrado',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center',
    category: 'equipos',
    stock: 3
  },
  {
    id: 5,
    name: 'Molino de Café Eléctrico',
    description: 'Molino profesional con 15 niveles de molienda',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1510596717411-a5e2a4b7d740?w=400&h=300&fit=crop&crop=center',
    category: 'equipos',
    stock: 5
  },
  {
    id: 6,
    name: 'Suscripción Café del Mes',
    description: 'Recibe mensualmente una selección curada de cafés especiales',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1442512595331-e89e738416ba?w=400&h=300&fit=crop&crop=center',
    category: 'suscripciones',
    stock: 25
  },
  {
    id: 7,
    name: 'Café Guatemala Antigua',
    description: 'Café guatemalteco con notas de especias y chocolate negro',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&crop=center',
    category: 'cafes-premium',
    stock: 12
  },
  {
    id: 8,
    name: 'Prensa Francesa 1L',
    description: 'Prensa francesa de vidrio resistente con capacidad para 1 litro',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1459257831344-f0cdd359235f?w=400&h=300&fit=crop&crop=center',
    category: 'equipos',
    stock: 10
  }
];

// Funciones simuladas de API con comportamiento async
// Estas funciones simulan llamadas a una API real con delays para mostrar loading states
export const getProducts = async (): Promise<Product[]> => {
  // Simulo delay de red para que se vea el loading
  await new Promise(resolve => setTimeout(resolve, 1000));
  return products;
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  // Simulo delay de red más corto para obtener un producto específico
  await new Promise(resolve => setTimeout(resolve, 800));
  return products.find(product => product.id === id);
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  // Simulo delay de red más largo para filtrar productos por categoría
  await new Promise(resolve => setTimeout(resolve, 1200));
  return products.filter(product => product.category === categoryId);
};

export const getCategories = async (): Promise<Category[]> => {
  // Simulo delay de red más corto para obtener las categorías
  await new Promise(resolve => setTimeout(resolve, 500));
  return categories;
};

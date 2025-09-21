import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Category } from '../types';
import { getProducts, getCategories, initializeFirestoreData } from '../services/firebase';
import { testFirebaseConnection } from '../firebase';

// Product state interface
interface ProductState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

// Product context interface
interface ProductContextType {
  state: ProductState;
  refreshProducts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
}

// Initial state
const initialState: ProductState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Product provider component
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProductState>(initialState);

  // Load products and categories on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Test Firebase connection first
      const connectionTest = await testFirebaseConnection();
      console.log('🔥 Firebase connection test result:', connectionTest);

      const [products, categories] = await Promise.all([
        getProducts(),
        getCategories()
      ]);

      setState({
        products,
        categories,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error loading Firebase data, attempting to initialize database:', error);

      try {
        // Try to initialize Firestore with sample data
        const initResult = await initializeFirestoreData();
        console.log('🔥 Database initialization result:', initResult);

        if (initResult.success) {
          // Try to load data again after initialization
          const [products, categories] = await Promise.all([
            getProducts(),
            getCategories()
          ]);

          setState({
            products,
            categories,
            loading: false,
            error: null,
          });
          return;
        }
      } catch (initError) {
        console.error('Error initializing database:', initError);
      }

      // Fallback to mockData when Firebase fails
      const mockProducts = [
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
          name: 'Máquina Espresso Profesional',
          description: 'Máquina de espresso semi-automática con molino integrado',
          price: 45000,
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center',
          category: 'equipos',
          stock: 3
        }
      ];

      const mockCategories = [
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

      setState({
        products: mockProducts,
        categories: mockCategories,
        loading: false,
        error: 'Usando datos locales. Configura Firebase para datos en tiempo real.',
      });
    }
  };

  const refreshProducts = async () => {
    try {
      const products = await getProducts();
      setState(prev => ({
        ...prev,
        products,
        error: null,
      }));
    } catch (error) {
      console.error('Error refreshing products:', error);
      setState(prev => ({
        ...prev,
        error: 'Error al actualizar los productos.',
      }));
    }
  };

  const refreshCategories = async () => {
    try {
      const categories = await getCategories();
      setState(prev => ({
        ...prev,
        categories,
        error: null,
      }));
    } catch (error) {
      console.error('Error refreshing categories:', error);
      setState(prev => ({
        ...prev,
        error: 'Error al actualizar las categorías.',
      }));
    }
  };

  const value: ProductContextType = {
    state,
    refreshProducts,
    refreshCategories,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use product context
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

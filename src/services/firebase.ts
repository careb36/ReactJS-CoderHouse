// Firebase services for products and categories
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Product, Category } from '../types';

// Products Service
export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('name'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  try {
    const productRef = doc(db, 'products', id.toString());
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return {
        id: parseInt(productSnap.id),
        ...productSnap.data()
      } as Product;
    }
    return undefined;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      where('category', '==', categoryId),
      orderBy('name')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Categories Service
export const getCategories = async (): Promise<Category[]> => {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, orderBy('name'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategoryById = async (id: string): Promise<Category | undefined> => {
  try {
    const categoryRef = doc(db, 'categories', id);
    const categorySnap = await getDoc(categoryRef);

    if (categorySnap.exists()) {
      return {
        id: categorySnap.id,
        ...categorySnap.data()
      } as Category;
    }
    return undefined;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

// Initialize Firestore with sample data (only if collections are empty)
export const initializeFirestoreData = async () => {
  try {
    console.log('🔥 Checking if Firestore needs initialization...');

    // Check if categories collection exists and has data
    const categoriesRef = collection(db, 'categories');
    const categoriesSnap = await getDocs(categoriesRef);

    if (!categoriesSnap.empty) {
      console.log('🔥 Categories already exist, skipping initialization');
      return { success: true, message: 'Database already has data' };
    }

    console.log('🔥 Categories collection is empty, proceeding with initialization...');

    console.log('🔥 Initializing Firestore with sample data...');

    // Sample categories
    const categories = [
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

    // Sample products
    const products = [
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

    // Add categories
    for (const category of categories) {
      try {
        await setDoc(doc(db, 'categories', category.id), category);
        console.log(`✅ Added category: ${category.name}`);
      } catch (categoryError) {
        console.error(`❌ Error adding category ${category.name}:`, categoryError);
        throw categoryError;
      }
    }

    // Add products
    for (const product of products) {
      try {
        await setDoc(doc(db, 'products', product.id.toString()), product);
        console.log(`✅ Added product: ${product.name}`);
      } catch (productError) {
        console.error(`❌ Error adding product ${product.name}:`, productError);
        throw productError;
      }
    }

    console.log('🔥 Firestore initialization completed successfully!');
    return { success: true, message: 'Database initialized successfully' };
  } catch (error) {
    console.error('🔥 Error initializing Firestore:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error', error };
  }
};

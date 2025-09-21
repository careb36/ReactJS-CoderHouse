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
  orderBy
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

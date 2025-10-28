/**
 * Firebase API Layer - Firestore data operations.
 * Provides product queries and order creation with stock management.
 * All functions interact directly with Firestore collections.
 */

import { db } from './config'
import { collection, doc, getDoc, getDocs, query, where, addDoc, writeBatch, serverTimestamp } from 'firebase/firestore'

/**
 * Fetches all products from the 'products' collection.
 * @returns {Promise<Array>} Array of product objects with IDs
 */
export async function getProducts() {
  const productsRef = collection(db, 'products')
  const snap = await getDocs(productsRef)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

/**
 * Fetches products filtered by category.
 * @param {string} categoryId - Category identifier
 * @returns {Promise<Array>} Filtered products array
 */
export async function getProductByCategory(categoryId) {
  const productsRef = collection(db, 'products')
  const q = query(productsRef, where('category', '==', categoryId))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

/**
 * Fetches a single product by ID.
 * @param {string} id - Product document ID
 * @returns {Promise<Object>} Product object with ID
 */
export async function getProductById(id) {
  const ref = doc(db, 'products', id)
  const snap = await getDoc(ref)
  const data = snap.data()
  return { id: snap.id, ...data }
}

/**
 * Creates an order in the 'orders' collection and updates product stock.
 * Uses Firestore batch write to ensure atomicity.
 * Validates stock availability before committing.
 * 
 * @param {Object} buyer - Customer information {name, email, phone}
 * @param {Array} items - Order items [{id, title, price, count}]
 * @param {number} total - Total order amount
 * @returns {Promise<{id: string}>} Created order ID
 * @throws {Error} If stock is insufficient or product not found
 */
export async function createOrder(buyer, items, total) {
  const batch = writeBatch(db)
  
  // Validate stock and prepare batch updates
  for (const item of items) {
    const productRef = doc(db, 'products', item.id)
    const snap = await getDoc(productRef)
    if (!snap.exists()) throw new Error(`Producto no encontrado: ${item.id}`)
    
    const data = snap.data()
    const newStock = (data.stock ?? 0) - (item.count ?? 1)
    if (newStock < 0) throw new Error(`Stock insuficiente para ${data.title ?? item.id}`)
    
    batch.update(productRef, { stock: newStock })
  }
  
  // Create order document
  const ordersRef = collection(db, 'orders')
  const payload = {
    buyer,
    items: items.map(i => ({ id: i.id, title: i.title, price: i.price, count: i.count })),
    total,
    currency: 'UYU',
    createdAt: serverTimestamp(),
  }
  const orderDocRef = await addDoc(ordersRef, payload)
  
  // Commit all changes atomically
  await batch.commit()
  
  return { id: orderDocRef.id }
}

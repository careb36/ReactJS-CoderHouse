// Firebase API layer per professor's spec.
// Exposes getProducts, getProductById, getProductByCategory, createOrder(buyer, items, total)
// Implements queries directly against Firestore using centralized db from src/firebase/config.

import { db } from './config'
import { collection, doc, getDoc, getDocs, query, where, addDoc, writeBatch, serverTimestamp } from 'firebase/firestore'

/**
 * Obtener todos los productos de la colección `products`.
 */
export async function getProducts() {
  const productsRef = collection(db, 'products')
  const snap = await getDocs(productsRef)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

/**
 * Obtener productos por categoría.
 * @param {string} categoryId
 */
export async function getProductByCategory(categoryId) {
  const productsRef = collection(db, 'products')
  const q = query(productsRef, where('category', '==', categoryId))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

/**
 * Obtener un producto específico por id.
 * @param {string} id
 */
export async function getProductById(id) {
  const ref = doc(db, 'products', id)
  const snap = await getDoc(ref)
  const data = snap.data()
  return { id: snap.id, ...data }
}

/**
 * Guardar la orden de compra en la colección `orders` y descontar stock con batch.
 * Firma solicitada por el profesor: (buyer, items, total)
 * @param {{name:string, email:string, phone:string}} buyer
 * @param {Array<{id:string, title:string, price:number, count:number}>} items
 * @param {number} total
 * @returns {Promise<{id: string}>}
 */
export async function createOrder(buyer, items, total) {
  const batch = writeBatch(db)
  // Verificar stock y preparar updates
  for (const item of items) {
    const productRef = doc(db, 'products', item.id)
    const snap = await getDoc(productRef)
    if (!snap.exists()) throw new Error(`Producto no encontrado: ${item.id}`)
    const data = snap.data()
    const newStock = (data.stock ?? 0) - (item.count ?? 1)
    if (newStock < 0) throw new Error(`Stock insuficiente para ${data.title ?? item.id}`)
    batch.update(productRef, { stock: newStock })
  }
  const ordersRef = collection(db, 'orders')
  const payload = {
    buyer,
    items: items.map(i => ({ id: i.id, title: i.title, price: i.price, count: i.count })),
    total,
    currency: 'UYU',
    createdAt: serverTimestamp(),
  }
  const orderDocRef = await addDoc(ordersRef, payload)
  await batch.commit()
  return { id: orderDocRef.id }
}

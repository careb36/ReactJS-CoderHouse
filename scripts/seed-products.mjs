#!/usr/bin/env node
/**
 * Seed de productos para Firestore (colección `products`).
 *
 * Requisitos:
 * - Tener .env.local con las VITE_FIREBASE_* correctas en la raíz del proyecto.
 * - Ejecutar: npm run seed
 *
 * Notas:
 * - Usa doc IDs determinísticos (slug del título) para permitir re-ejecuciones idempotentes.
 */

import { config as dotenvConfig } from 'dotenv'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'

// Cargar .env.local (si existe). Prioriza variables de entorno ya definidas.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const envLocalPath = path.join(root, '.env.local')
if (existsSync(envLocalPath)) {
  dotenvConfig({ path: envLocalPath })
}

function required(name){
  const value = process.env[name]
  if (!value) {
    throw new Error(`Falta variable de entorno ${name}. Configura .env.local en la raíz del proyecto.`)
  }
  return value
}

const firebaseConfig = {
  apiKey: required('VITE_FIREBASE_API_KEY'),
  authDomain: required('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: required('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: required('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: required('VITE_FIREBASE_SENDER_ID'),
  appId: required('VITE_FIREBASE_APP_ID'),
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

function slugify(str){
  return String(str)
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

// Datos de ejemplo: 10 productos
const products = [
  {
    title: 'Blend Espresso Italia',
    description: 'Mezcla equilibrada de granos arábica y robusta, ideal para espresso intenso.',
    price: 520,
    category: 'grano',
    stock: 24,
    origin: 'Brasil/India',
    roastLevel: 'Medio',
    weight: '250g',
    imgURL: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Colombia Supremo Molido',
    description: 'Notas dulces y frutales. Molido medio para filtros y cafeteras de goteo.',
    price: 480,
    category: 'molido',
    stock: 30,
    origin: 'Colombia',
    roastLevel: 'Medio-Claro',
    weight: '250g',
    imgURL: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Cápsulas Espresso Ristretto (10u)',
    description: 'Cápsulas compatibles. Sabor intenso, cuerpo alto y retrogusto prolongado.',
    price: 350,
    category: 'capsulas',
    stock: 50,
    imgURL: 'https://images.unsplash.com/photo-1500111709600-7761aa8216d1?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Cápsulas Lungo Suave (10u)',
    description: 'Cápsulas compatibles. Taza larga, notas florales y acidez equilibrada.',
    price: 340,
    category: 'capsulas',
    stock: 45,
    imgURL: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Kenya AA Grano',
    description: 'Perfil brillante con notas cítricas y vino tinto. Alto en acidez.',
    price: 690,
    category: 'grano',
    stock: 12,
    origin: 'Kenia',
    roastLevel: 'Claro',
    weight: '250g',
    imgURL: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Molido para Prensa Francesa',
    description: 'Molido grueso ideal para prensa francesa. Cuerpo alto y dulzor marcado.',
    price: 450,
    category: 'molido',
    stock: 20,
    weight: '250g',
    imgURL: 'https://images.unsplash.com/photo-1502465771179-51f3535da42f?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Molinillo Manual Acero',
    description: 'Accesorio con muelas cónicas de acero, regulable para distintos métodos.',
    price: 1890,
    category: 'accesorios',
    stock: 15,
    imgURL: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Prensa Francesa 600ml',
    description: 'Jarra de vidrio templado con émbolo de acero inoxidable.',
    price: 1290,
    category: 'accesorios',
    stock: 18,
    imgURL: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Perú Orgánico Grano',
    description: 'Certificado orgánico. Notas de cacao y nueces, acidez media.',
    price: 650,
    category: 'grano',
    stock: 14,
    origin: 'Perú',
    roastLevel: 'Medio',
    weight: '250g',
    imgURL: 'https://images.unsplash.com/photo-1500217052183-bc01eee1a74e?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Molido Espresso',
    description: 'Molido fino para espresso. Crema persistente y cuerpo medio.',
    price: 520,
    category: 'molido',
    stock: 28,
    weight: '250g',
    imgURL: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop'
  }
]

async function upsertProducts(){
  const results = []
  for (const p of products){
    const id = slugify(p.title)
    const ref = doc(db, 'products', id)
    const payload = { ...p, updatedAt: serverTimestamp() }
    await setDoc(ref, payload, { merge: true })
    results.push({ id, title: p.title })
  }
  return results
}

upsertProducts()
  .then((res) => {
    console.log(`OK — Productos actualizados/creados: ${res.length}`)
    res.forEach(r => console.log(`- ${r.id} (${r.title})`))
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error sembrando productos:', err)
    process.exit(1)
  })

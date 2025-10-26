// Firebase app initialization and Firestore DB export
// Centralizes Firebase config under src/firebase per course guidelines.
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Read from Vite envs (Firebase official names)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId is optional for analytics: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase and Firestore once
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export default app

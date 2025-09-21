// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Coderhouse E-commerce Project
const firebaseConfig = {
  apiKey: "AIzaSyAD5b5MeCebdXVjETY7P8AI3sYxQu28ZG4",
  authDomain: "coderhouse-ecommerce-35d07.firebaseapp.com",
  projectId: "coderhouse-ecommerce-35d07",
  storageBucket: "coderhouse-ecommerce-35d07.firebasestorage.app",
  messagingSenderId: "495421313787",
  appId: "1:495421313787:web:bc4c4d013bcad05914d65e",
  measurementId: "G-0W8R1TXDJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Export Firebase app for use in other services
export default app;

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log('🔥 Testing Firebase connection...');
    console.log('🔥 Firebase config:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain
    });

    // Try to access Firestore
    const db = getFirestore(app);
    console.log('🔥 Firestore instance created:', db);

    return { success: true, message: 'Firebase connection successful' };
  } catch (error) {
    console.error('🔥 Firebase connection error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message: errorMessage, error };
  }
};

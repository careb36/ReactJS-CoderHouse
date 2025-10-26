# E-commerce de Café (React + Vite + Firebase Firestore)

## Key Features
- Routing: `/`, `/category/:categoryId`, `/item/:id`, `/cart`, `/checkout`
- Carrito con Context API (`addToCart`, `removeItem`, `clearCart`, `countItems`)
- Integración con Firebase Firestore (productos y órdenes)
- Checkout con creación de orden y actualización de stock (batch)
- Selector de moneda UYU/USD y formateo con Intl
- Estados de carga/vacío y mensajes de error

## How To Use
Necesitas [Git](https://git-scm.com) y [Node.js](https://nodejs.org/en/download/).

```bash
# Clonar el repo
git clone https://github.com/careb36/ReactJS-CoderHouse.git
cd ReactJS-CoderHouse

# Instalar dependencias
npm install

# Crear .env.local con tu proyecto de Firebase y (opcional) tasa USD
cat > .env.local <<'EOF'
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx.appspot.com
VITE_FIREBASE_SENDER_ID=xxxxxxxxxxxx
VITE_FIREBASE_APP_ID=1:xxxxxxxxxxxx:web:xxxxxxxxxxxx
# Opcional: tasa de conversión USD si los precios base están en UYU
VITE_USD_RATE=0.025
EOF

# Ejecutar en desarrollo
npm run dev
```

## Firebase/Firestore setup
- Colecciones:
  - `products`: `{ title, description, price, imgURL, category, stock, origin, roastLevel, weight }`
  - `orders`: `{ buyer, items, total, currency, createdAt }` (se crea desde la app)
- Variables de entorno usadas (Vite):
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - (opcional) `VITE_USD_RATE`

## Estructura de carpetas (src/)
```
src/
  components/        # Componentes presentacionales y contenedores (ItemListContainer, ItemDetailContainer, CartContainer, etc.)
  context/           # Contextos globales (cartContext, currencyContext)
  firebase/          # Configuración (config.js) y API de datos (api.js)
  App.jsx            # Rutas y composición de la app
  main.jsx           # Punto de entrada Vite/React
```

- Importante: `src/firebase/config.js` centraliza la inicialización de Firebase y exporta `app` y `db`.
- Las funciones de datos están en `src/firebase/api.js` y consumen `db` desde `src/firebase/config`.

## Tech Stack
- React, Hooks, Context
- React Router
- Firebase Firestore
- Vite
- ESLint

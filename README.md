# E‑commerce de Café — Proyecto Final Coderhouse (React + Vite + Firebase Firestore)

**Alumna:** Carolina Pereira

Este repositorio implementa un e‑commerce básico de café cumpliendo los requisitos de la entrega final del curso Coderhouse (React + Firestore): lectura de productos directamente desde Firestore, carrito con Context, checkout con generación de orden en la colección `orders` y routing completo.

## Checklist de implementación obligatoria (estado)
1. ✅ Configuración de Firebase/Firestore
    - Inicialización centralizada en `src/firebase/config.js` (exporta `app` y `db`).
    - Lectura de `products` y escritura en `orders` usando `src/firebase/api.js`.
    - Contenedores consumen Firestore (sin mocks locales): `ItemListContainer`, `ItemDetailContainer`.
2. ✅ React Context (Carrito)
    - `CartContext` envuelve la app (`App.jsx`).
    - API oficial expuesta por el context: `addItem(item, quantity)`, `removeItem(id)`, `clear()`, `isInCart(id)`.
    - Derivados: `totalUnits`, `totalPrice`. Alias de compatibilidad: `addToCart`, `countItems`, `clearCart`.
    - `CartWidget` muestra la cantidad total de unidades usando `totalUnits`.
3. ✅ Lógica de componentes
    - `ItemCount` valida stock máximo y mínimo 1; `onAdd` dispara la adición al Context.
    - `ItemDetailContainer`: tras "Agregar al carrito" desaparece `ItemCount` y se muestra botón/link a `/cart`.
    - Separación contenedor/presentacional respetada.
4. ✅ Checkout (Entrega Final)
    - `CheckoutForm` controlado; al enviar crea la orden en `orders`, muestra el ID generado y vacía el carrito (`clear()`).
    - Actualiza stock con `writeBatch`.
5. ✅ Buenas prácticas y Routing
    - Loader/estados vacíos y manejo de errores.
    - Rutas: `/`, `/category/:categoryId`, `/item/:id`, `/cart`, `/checkout` con `react-router-dom`.

## Cómo correr el proyecto
Necesitas [Git](https://git-scm.com) y [Node.js](https://nodejs.org/en/download/).

```bash
# Clonar el repo
git clone https://github.com/careb36/ReactJS-CoderHouse.git
cd ReactJS-CoderHouse

# Instalar dependencias
npm install

# Crear .env.local con credenciales de tu proyecto Firebase
# (Solicitar credenciales al profesor si es necesario)
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_SENDER_ID=tu-sender-id
VITE_FIREBASE_APP_ID=tu-app-id

# Ejecutar en desarrollo
npm run dev
```

## Firestore: colecciones y datos
- `products`: `{ title, description, price, imgURL?, imagePath?, category, stock, origin?, roastLevel?, weight? }`
  - imgURL: URL pública completa (https://...)
  - imagePath: ruta en Firebase Storage (por ejemplo: `products/espresso.jpg`). La app resolverá el download URL automáticamente.
- `orders`: `{ buyer, items, total, currency, createdAt }` (se crea desde la app en el checkout)

Funciones de la capa de datos (`src/firebase/api.js`):
- `getProducts()`, `getProductById(id)`, `getProductByCategory(categoryId)`
- `createOrder(buyer, items, total)` → crea doc en `orders` y descuenta stock con `writeBatch`

Variables de entorno (Vite):
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_SENDER_ID`, `VITE_FIREBASE_APP_ID`
- Opcional: `VITE_USD_RATE`

## Context del Carrito
- API oficial: `addItem(item, quantity)`, `removeItem(id)`, `clear()`, `isInCart(id)`
- Derivados: `totalUnits`, `totalPrice`
- Alias de compatibilidad: `addToCart`, `countItems`, `clearCart` (para código legacy)

## Rutas principales
- `/` catálogo
- `/category/:categoryId` filtro por categoría
- `/item/:id` detalle de producto
- `/cart` carrito y resumen
- `/checkout` checkout (formulario y confirmación)

## Estructura de carpetas (src/)
```
src/
  components/        # Presentacionales y contenedores (ItemListContainer, ItemDetailContainer, CartContainer, etc.)
  context/           # Contextos globales (cartContext, currencyContext)
  firebase/          # Configuración (config.js) y API de datos (api.js)
  App.jsx            # Rutas y composición de la app
  main.jsx           # Punto de entrada
```

Notas:
- La app no utiliza mocks locales para render: los datos provienen de Firestore.
- Se utiliza `src/components/ItemCount.jsx` como componente único del contador.


## Mejoras visuales y de robustez añadidas
- Footer del sitio refinado y accesible con nueva paleta de colores.
- Layout responsive que funciona correctamente en mobile.
- Branding básico con logo y favicon.
- Fallback de imágenes para productos sin imagen.
- Optimización de carga de imágenes.


## Cómo hacer que la web tenga fotos de productos
Hay dos formas soportadas por la app. Usa la que te resulte más cómoda.

1) Usar URLs públicas (campo imgURL)
- En cada documento de `products` agrega el campo `imgURL` con una URL completa (https://...). 
- Puede ser un link público de tu CDN, tu hosting o incluso el "Download URL" de Firebase Storage.
- La app renderiza esa imagen directamente. Si la URL es inválida o está vacía, mostrará `public/placeholder.svg`.

2) Usar Firebase Storage (campo imagePath)
- Habilita Storage en tu proyecto Firebase (Consola > Storage > Comenzar).
- Sube tus fotos a una carpeta, por ejemplo `products/` (ej: `products/espresso.jpg`).
- En cada documento de `products`, agrega el campo `imagePath` con la ruta exacta del archivo en Storage (por ejemplo: `products/espresso.jpg`).
- La app resolverá automáticamente el "download URL" con `getDownloadURL` y mostrará la imagen. Si la ruta no existe o hay un error, se usará `placeholder.svg`.

Reglas de Firebase Storage (ejemplo de lectura pública de la carpeta products):
```
/* storage.rules */
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read; // lectura pública de imágenes de productos
    }
  }
}
```
Ajusta las reglas según tus necesidades de seguridad. En producción considera restringir la escritura sólo a administradores.

Campos reconocidos por el hook de imágenes:
- `imgURL` o `imageURL` (URL completa) — prioridad 1
- `imagePath` o `image_path` (ruta en Storage) — prioridad 2
- Si ninguno está presente, se utiliza `/placeholder.svg`.

Archivos relevantes en el repo:
- `src/firebase/storage.js` — utilitario `resolveImageUrl()` que convierte una ruta de Storage en URL descargable o devuelve el placeholder.
- `src/hooks/useProductImage.js` — hook que decide qué URL usar en base a los campos del producto.
- `src/components/Item/Item.jsx` y `src/components/ItemDetailContainer/ItemDetailContainer.jsx` — consumen el hook para renderizar imágenes.


## Sembrar productos de ejemplo (para completar el catálogo rápido)
Si partes de un Firestore vacío, puedes poblar la colección `products` con datos de ejemplo (imágenes incluidas) usando el script de seed.

Requisitos previos:
- Tener creado `.env.local` con las credenciales reales de tu proyecto Firebase (ver sección "Cómo correr el proyecto").
- Tener permisos de escritura en Firestore para tu usuario o entorno actual.

Pasos:
1. Instalar dependencias (si aún no lo hiciste):
   - npm install
2. Ejecutar el seed:
   - npm run seed
3. Salida esperada: verás en consola la lista de productos creados/actualizados. El script es idempotente (re-ejecutable); usa como ID un slug del título.
4. Levantar el proyecto:
   - npm run dev

Qué crea:
- 10 productos de ejemplo distribuidos en categorías: `grano`, `molido`, `capsulas`, `accesorios`.
- Cada producto incluye `imgURL` (enlaces públicos a imágenes) para que se vean en el catálogo y en el detalle.

Rutas relacionadas:
- / — catálogo completo
- /category/grano — filtro por categoría
- /category/molido
- /category/capsulas
- /category/accesorios

## Agregar al carrito desde las cards (mejora)
Ahora el botón "Agregar al carrito" en cada card de producto realmente agrega 1 unidad al carrito (antes mostraba un alert sin modificar el estado). Se respeta el stock; si el producto no tiene stock, el botón aparece deshabilitado.

Archivos relevantes:
- src/components/Item/Item.jsx — botón de la card conectado al `CartContext`.
- src/context/cartContext.jsx — lógica del carrito (addItem, removeItem, clear, etc.).
- scripts/seed-products.mjs — script de semilla para poblar `products` con ejemplos.


## Si no ves el catálogo (usar datos de ejemplo sin Firebase)
Si aún no configuraste credenciales reales de Firebase y ves el catálogo vacío, puedes activar un modo demo que muestra productos locales de ejemplo.

Opciones:
- Forzar demo: agrega en `.env.local` la variable `VITE_DEMO_MODE=true` y reinicia `npm run dev`.
- Fallback automático: usa `VITE_DEMO_MODE=auto` para que, si Firestore falla o devuelve vacío, se muestren los productos de ejemplo.

Notas importantes:
- La app sigue cumpliendo la consigna: por defecto lee desde Firestore. El demo sólo se activa si tú lo indicas (true) o como fallback (auto) en desarrollo.
- Los productos de ejemplo respetan categorías: `grano`, `molido`, `capsulas`, `accesorios`.

Archivos relevantes:
- `src/components/ItemListContainer/ItemListContainer.jsx` — intenta Firestore primero; con `VITE_DEMO_MODE` puede usar demo.
- `src/data/demo-products.js` — dataset de ejemplo.

Ejemplo de `.env.local` con modo demo:
```
VITE_FIREBASE_API_KEY=dummy-key
VITE_FIREBASE_AUTH_DOMAIN=dummy-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=dummy-project
VITE_FIREBASE_STORAGE_BUCKET=dummy-project.appspot.com
VITE_FIREBASE_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:0000000000000000
VITE_USD_RATE=0.025
VITE_DEMO_MODE=true
```

Para datos reales en Firestore (recomendado): configura tus credenciales reales y ejecuta `npm run seed` para poblar la colección `products`. Luego deja `VITE_DEMO_MODE` vacío o elimínalo para que la app use la base real.


## Mejoras UI/UX de esta entrega
- Persistencia del carrito: ahora el contenido del carrito se guarda en localStorage (clave CART_V1) y se rehidrata al recargar. Para reiniciar, limpia localStorage o usa el botón “Vaciar carrito”.
- Loader reutilizable: se agregó un componente `Loader` con spinner y texto accesible. Se utiliza en el catálogo y en el detalle de producto durante la carga.
- Contador de unidades (ItemCount) estilizado: botones con estados de foco/disabled y mejor alineación. Archivo `src/components/ItemCount.css`.
- Carrito con layout responsive: nuevo `src/components/CartContainer/CartContainer.css` para organizar items, acciones, totales y formulario.
- Checkout form mejorado: `src/components/CartContainer/CheckoutForm.css` con grid simple, errores visibles y focus accesible.
- Navbar con estado activo: enlaces de categorías resaltan la ruta actual (`NavLink`) y estilos `.active` en `NavBar.css`.

Archivos nuevos principales:
- `src/components/Loader/Loader.jsx`, `src/components/Loader/Loader.css`
- `src/components/ItemCount.css`
- `src/components/CartContainer/CartContainer.css`
- `src/components/CartContainer/CheckoutForm.css`

Cambios no disruptivos: no se modifican la conexión a Firestore, el CartContext (más allá de la persistencia), el checkout (flujo y creación de orden) ni el routing. Todas las rutas y APIs se mantienen según la consigna.

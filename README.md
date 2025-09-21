# ReactJS-CoderHouse

Proyecto evolutivo para el curso de React JS de CoderHouse - Construcción de un E-commerce

## Descripción

Este proyecto es una aplicación de e-commerce desarrollada con React que se construye de manera incremental a lo largo del curso de React JS de CoderHouse. Cada entrega representa un hito en el aprendizaje de conceptos fundamentales de React.

## Tecnologías Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipado estático para mayor robustez
- **React Router v6/v7** - Sistema de navegación y rutas
- **Vite** - Build tool y servidor de desarrollo
- **CSS** - Estilos personalizados
- **npm** - Gestor de paquetes

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes de presentación (UI)
│   ├── NavBar.tsx      # Barra de navegación con NavLink
│   ├── CartWidget.tsx  # Widget del carrito
│   ├── ItemList.tsx    # Lista de productos
│   ├── ItemCard.tsx    # Card individual de producto
│   ├── ItemDetail.tsx  # Detalle completo de producto
│   ├── ItemCount.tsx   # Contador para agregar al carrito
│   └── Footer.tsx      # Pie de página
├── containers/          # Componentes contenedores (lógica)
│   ├── ItemListContainer.tsx  # Contenedor con estado y efectos
│   └── ItemDetailContainer.tsx # Contenedor de detalle con lazy loading
├── data/               # Datos y funciones de API simuladas
│   └── mockData.ts     # Productos, categorías y funciones async
├── types/              # Definiciones de tipos TypeScript
│   └── index.ts        # Interfaces para Product, Category, etc.
├── App.tsx             # Componente principal con routing
├── App.css             # Estilos principales
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

## Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Git

### Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/careb36/ReactJS-CoderHouse.git
   cd ReactJS-CoderHouse
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

## ▶️ Cómo Ejecutar el Proyecto

### Modo Desarrollo

Para ejecutar el proyecto en modo desarrollo con hot-reload:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:5173` (o el puerto disponible siguiente).

### Build para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

### Vista Previa del Build

Para previsualizar la versión de producción localmente:

```bash
npm run preview
```

## Entregas del Curso

### ✅ Entrega 1: Crea tu Landing

- Componentes básicos: NavBar, CartWidget, ItemListContainer
- Uso de props para personalización
- Estructura de componentes modular
- Rama: `CreaTuLanding1Careb`

### ✅ Entrega 2: Navigate Routes

- **Sistema de Routing completo** con React Router v6/v7
- **TypeScript** implementado en toda la aplicación
- **Arquitectura Containers vs Presentational** components
- **Navegación activa** con NavLink y aria-current="page"
- **Rutas dinámicas** para categorías y productos
- **Lazy Loading** con React.lazy + Suspense
- **Datos asíncronos** simulados con Promises + setTimeout
- **8 productos** con categorías: Cafés Premium, Equipos, Suscripciones
- **404 Not Found** para rutas inexistentes
- **Loading states** y manejo de errores

## Características Implementadas

### Entrega 1 - Base
- **Barra de Navegación**: Logo, enlaces de navegación y widget del carrito
- **Componentes Modulares**: Arquitectura basada en componentes reutilizables
- **Props**: Comunicación entre componentes padre-hijo
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **Hot Reload**: Desarrollo eficiente con recarga automática

### Entrega 2 - Routing & TypeScript
- **Sistema de Routing**: React Router v6/v7 con BrowserRouter, Routes, Route
- **TypeScript**: Tipado estático en toda la aplicación
- **Arquitectura Avanzada**: Separación entre Containers y Presentational components
- **Navegación Activa**: NavLink con estados activos y aria-current="page"
- **Rutas Dinámicas**:
  - `/` - Catálogo completo
  - `/category/:categoryId` - Filtrado por categoría
  - `/item/:id` - Detalle de producto individual
  - `*` - Página 404 para rutas no encontradas
- **Lazy Loading**: Carga diferida de componentes con React.lazy + Suspense
- **Datos Asíncronos**: Simulación de API con Promises + setTimeout
- **Estados de Carga**: Loading spinners y manejo de errores
- **8 Productos de Demostración**:
  - Cafés Premium (Colombia, Brasil, Etiopía, Guatemala)
  - Equipos (Máquinas espresso, molinos, prensa francesa)
  - Suscripciones mensuales
- **Imágenes Temáticas**: Imágenes de café de alta calidad

## Uso

1. **Ejecuta el proyecto:**
   ```bash
   npm run dev
   ```

2. **Abre tu navegador** en `http://localhost:5173`

3. **Navega por la aplicación:**
   - **Inicio** (`/`) - Ver todo el catálogo de productos
   - **Categorías**:
     - `/category/cafes-premium` - Cafés especiales
     - `/category/equipos` - Máquinas y accesorios
     - `/category/suscripciones` - Suscripciones mensuales
   - **Productos** (`/item/1` a `/item/8`) - Detalle individual de cada producto
   - **Navegación activa** - Los enlaces muestran el estado activo automáticamente

4. **Características disponibles:**
   - Widget del carrito con contador
   - Loading states durante la carga de datos
   - Imágenes de productos de alta calidad
   - Navegación fluida entre rutas
   - Página 404 para rutas inexistentes


## 📄 Licencia

Este proyecto es parte del curso de React JS de CoderHouse.

## 👨‍💻 Autor

**careb36** - Proyecto del curso React JS CoderHouse

---

## Última actualización: Entrega 2 - Navigate Routes

**Estado actual:** ✅ Completado - Sistema de routing completo con React Router v6/v7, TypeScript, arquitectura avanzada y navegación funcional.

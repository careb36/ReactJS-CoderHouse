import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './containers/ItemListContainer';
import Footer from './components/Footer';
import './App.css';

// Lazy load the ItemDetailContainer for optimization
const ItemDetailContainer = lazy(() => import('./containers/ItemDetailContainer'));

// 404 Not Found component
const NotFound: React.FC = () => (
  <div className="not-found">
    <h1>404 - Página no encontrada</h1>
    <p>La página que buscas no existe.</p>
    <a href="/">Volver al inicio</a>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Suspense fallback={
            <div className="loading">
              <p>🔄 Cargando...</p>
            </div>
          }>
            <Routes>
              {/* Home route - full catalog */}
              <Route
                path="/"
                element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda en línea!" />}
              />

              {/* Category route with dynamic segment */}
              <Route
                path="/category/:categoryId"
                element={<ItemListContainer greeting="Catálogo por categoría" />}
              />

              {/* Item detail route */}
              <Route
                path="/item/:id"
                element={<ItemDetailContainer />}
              />

              {/* 404 wildcard route */}
              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

// Export AppRoutes for testing purposes
export const AppRoutes: React.FC = () => (
  <div className="App">
    <NavBar />
    <main className="main-content">
      <Suspense fallback={
        <div className="loading">
          <p>🔄 Cargando...</p>
        </div>
      }>
        <Routes>
          {/* Home route - full catalog */}
          <Route
            path="/"
            element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda en línea!" />}
          />

          {/* Category route with dynamic segment */}
          <Route
            path="/category/:categoryId"
            element={<ItemListContainer greeting="Catálogo por categoría" />}
          />

          {/* Item detail route */}
          <Route
            path="/item/:id"
            element={<ItemDetailContainer />}
          />

          {/* 404 wildcard route */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </main>
    <Footer />
  </div>
);

export default App;

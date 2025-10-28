import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import NavBar from './components/NavBar/NavBar'
import Hero from './components/Hero/Hero'
import Newsletter from './components/Newsletter/Newsletter'
import { CartContextProvider } from './context/CartProvider'
import CartContainer from './components/CartContainer/CartContainer'
import { CurrencyContextProvider } from './context/currencyContext'
import Footer from './components/Footer/Footer'
import Favorites from './components/Favorites/Favorites'
import ErrorBoundary from './components/ErrorBoundary'

/**
 * HomePage - Landing page component.
 * Displays hero section, product catalog, and newsletter signup.
 */
function HomePage() {
  return (
    <>
      <Hero />
      <ItemListContainer greeting="Nuevos Productos" />
      <Newsletter />
    </>
  )
}

/**
 * App - Root component with routing and context providers.
 * Wraps application with Currency and Cart contexts.
 * Defines all routes including catalog, categories, detail, cart, and checkout.
 */
function App() {
  return (
    <ErrorBoundary>
      <CurrencyContextProvider>
        <CartContextProvider>
          <BrowserRouter>
          <main className="container">
             <NavBar/>
             <Routes>
               <Route
                 path="/"
                 element={<HomePage />}
                 />
               {/* Rutas existentes */}
               <Route
                 path="/category/:categParam"
                 element={<ItemListContainer greeting="Categorías de productos"/>}
                 />
               <Route
               path="/detail/:idParam"
               element={<ItemDetailContainer/>}
               />
               {/* Alias requeridos */}
               <Route
                 path="/category/:categoryId"
                 element={<ItemListContainer greeting="Categorías de productos"/>}
               />
               <Route
                 path="/item/:id"
                 element={<ItemDetailContainer/>}
               />
               <Route
                 path="/cart"
                 element={<CartContainer/>}
               />
               <Route
                 path="/checkout"
                 element={<CartContainer/>}
               />
               <Route
                 path="/favorites"
                 element={<Favorites/>}
               />
               <Route
                 path="*"
                 element={<h1>Oops! No encontramos está página</h1>}
                 />
             </Routes>
             <Footer/>
             </main>
          </BrowserRouter>
        </CartContextProvider>
      </CurrencyContextProvider>
    </ErrorBoundary>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import NavBar from './components/NavBar/NavBar'
import { CartContextProvider } from './context/cartContext'
import CartContainer from './components/CartContainer/CartContainer'
import { CurrencyContextProvider } from './context/currencyContext'

function App() {    
  return (
    <CurrencyContextProvider>
      <CartContextProvider>      
        <BrowserRouter>    
        <main className="container">
          <NavBar/>     
          <Routes>
            <Route 
              path="/" 
              element={<ItemListContainer greeting="Bienvenidos a la tienda"/>} 
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
              path="*"
              element={<h1>Oops! No encontramos está página</h1>}
              />
          </Routes>
          </main>
        </BrowserRouter>
      </CartContextProvider>
    </CurrencyContextProvider>
  )
}

export default App

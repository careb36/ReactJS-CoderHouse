import './App.css'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router';

// 1. BrowserRouter como Comp Padre
// 2. Definir el area donde vamos a navegar con <Routes>
// 3. Crear rutas con <Route>: definiendo el path (url) y el contenido
export default function App() {
  return (
    <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenidos!"/>}/>
          <Route path="/category/:categParam" element={ <ItemListContainer />} />
          <Route path="/detalle/:idParam" element={ <ItemDetailContainer/>} />
          <Route path="*"  element={ <h1>404: Página no encontrada</h1>} />
        </Routes>

    </BrowserRouter>)
}

// layout

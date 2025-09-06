// Importo React para poder usar JSX y crear componentes
import React from 'react';
// Importo todos mis componentes personalizados
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import Footer from './components/Footer';
// Importo los estilos CSS
import './App.css';

// Componente principal de mi aplicación - acá organizo toda la estructura
function App() {
  return (
    // Contenedor principal con clase App para los estilos generales
    <div className="App">
      {/* Barra de navegación - se muestra arriba de todo */}
      <NavBar />
      
      {/* Contenedor principal donde voy a mostrar los productos */}
      {/* Le paso un mensaje de bienvenida usando props - esto lo vimos en clase */}
      <ItemListContainer greeting="¡Bienvenida a Caro Coffee! ☕ Tu destino para el café de especialidad" />
      
      {/* Pie de página con información adicional */}
      <Footer />
    </div>
  );
}

// Exporto App para que main.jsx pueda importarlo
export default App;
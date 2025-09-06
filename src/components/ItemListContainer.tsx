// Importo React para JSX
import React from 'react';

// Defino la interfaz para las props - esto es importante en TypeScript
// Le digo que espera recibir una prop llamada 'greeting' de tipo string
interface ItemListContainerProps {
  greeting: string;
}

// Componente que va a mostrar el catálogo - por ahora solo muestra un mensaje
// Uso React.FC con la interfaz para que TypeScript me ayude con los tipos
const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  return (
    // Contenedor principal donde después voy a mostrar todos los productos
    <div className="item-list-container">
      {/* Muestro el mensaje que me llega por props - esto lo aprendí en la clase */}
      <h2>{greeting}</h2>
      {/* Descripción temporal mientras desarrollo el catálogo real */}
      <p>
        Estoy trabajando en el catálogo de productos. Pronto podrás encontrar aquí 
        una selección curada de los mejores granos de café de América Latina, 
        equipos profesionales de preparación y accesorios premium. 
        ¡Mantente atento para las próximas actualizaciones!
      </p>
      {/* Contenedor donde después van a ir las cards de productos */}
      <div className="coming-soon">
        <p>🚧 Catálogo en construcción 🚧</p>
      </div>
    </div>
  );
};

// Exporto el componente para usarlo en App
export default ItemListContainer;
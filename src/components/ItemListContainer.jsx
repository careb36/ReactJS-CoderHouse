import React from 'react';

const ItemListContainer = ({ greeting }) => {
  return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
      <p>Aquí se mostrará el catálogo de productos próximamente.</p>
    </div>
  );
};

export default ItemListContainer;
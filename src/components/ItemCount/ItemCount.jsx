import { useState } from 'react';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button
          onClick={decrement}
          disabled={count <= 1}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: count <= 1 ? '#f5f5f5' : '#fff',
            cursor: count <= 1 ? 'not-allowed' : 'pointer'
          }}
        >
          -
        </button>

        <span style={{ fontSize: '18px', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
          {count}
        </span>

        <button
          onClick={increment}
          disabled={count >= stock}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: count >= stock ? '#f5f5f5' : '#fff',
            cursor: count >= stock ? 'not-allowed' : 'pointer'
          }}
        >
          +
        </button>
      </div>

      <button
        onClick={() => onAdd(count)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#8B4513',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Agregar al carrito
      </button>

      <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>
        Stock disponible: {stock}
      </p>
    </div>
  );
};

export default ItemCount;

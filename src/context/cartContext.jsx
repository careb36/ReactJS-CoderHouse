import { createContext, useState } from "react";

const cartContext = createContext(null);

// Custom Provider -> value
// CRUD -> Create/read/update/delete
export function CartContextProvider(props){
  const [cartItems, setCartItems] = useState([]);
  
  function addToCart(newItem, count = 1){
    const newCart = structuredClone(cartItems);

    const index = newCart.findIndex( item => item.id === newItem.id )
    if (index !== -1){
      // YA está en cart -> actualizar la cantidad de unidades compradas
      const updateItem = newCart[index];
      const desired = (updateItem.count ?? 0) + count;
      const maxCount = typeof newItem.stock === 'number' ? Math.min(desired, newItem.stock) : desired;
      updateItem.count = maxCount;
    }
    else {
      const itemToAdd = { ...newItem, count: Math.min(count, newItem.stock ?? count) };
      newCart.push(itemToAdd);
    }

    setCartItems(newCart)
  }

  function countItems(){
    let quantity = 0;
    cartItems.forEach( item => quantity += item.count)
    return quantity
  }

  // Remover un item del context
  function removeItem( idDelete ){
    const newCart = structuredClone(cartItems);
    const newCartWithDelete = newCart.filter( item => item.id !== idDelete )
    setCartItems(newCartWithDelete)
  }

  function clearCart(){
    setCartItems([])
  }
  
  return <cartContext.Provider value={ 
    {cart: cartItems, 
    addToCart, 
    countItems, 
    removeItem,
    clearCart}
  }>
      { props.children }
    </cartContext.Provider>
}

export default cartContext;
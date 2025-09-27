import products from './cafe-products'

function getMockAPIData(){
    const promiseProducts = new Promise( (resolve) => {
      setTimeout( () => {
        console.log("devolviendo datos...")
        resolve(products)
        //reject("Servicio/Base de Datos caída")
      }, 700 )
  })

  return promiseProducts;
}

export function getProductById( idRequested ){ 
  const reqItem = products.find( (item) => item.id === Number(idRequested) )
 
   const promiseProduct = new Promise( (resolve, reject) => {
      setTimeout( () => {
        console.log("Devolviendo item...", reqItem)
        // * Rechazar la promesa si no se encuentra el producto
        if(reqItem){ 
          resolve(reqItem)
        }
        else{
          reject("Item no encontrado")
        }
      }, 700 )
  })
  return promiseProduct
}

export function getProductsByCateg( categRequested ){
  const productsFilter = products.filter( item => item.category === categRequested );

  return new Promise( (resolve,reject) => {
    setTimeout( () => {
      if( productsFilter.length >= 1 )
      {
        console.log("Productos devueltos...", productsFilter)
        resolve(productsFilter)
      }
      else{
        console.log("No se encontraron items")
        reject("No encontramos items para esa categoría")
      }
    }, 700)
  })
}

export default getMockAPIData;

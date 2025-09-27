import { Link } from 'react-router';
import StateComponent from '../ColorPick/StateComponent';
import './Item.css'


function Item( {id, title, imgURL, price} ){
  
  return ( 
    <div className="item-card">
      <h2 className="item-card-title"> {title} </h2>
      <img 
        className="item-card-img"
        height="300"
        src={imgURL}
        alt={title}
      /> 
      <h3 className="item-card-price">Precio: $ {price}</h3>
      <StateComponent/>
      <div style={{ textAlign: "center"}}>
        <Link to={`/detalle/${id}` }>
          <button>Ir a ve detalle</button>
        </Link>
        
      </div>
      
    </div>
  )
}

export default Item;

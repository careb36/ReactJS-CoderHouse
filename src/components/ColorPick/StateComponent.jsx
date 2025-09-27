import { useState } from "react"
import './StateComponent.css';

export default function StateComponent(){
  const [ color, setColor ] = useState("#000000");  

  return (
    <div className="box-container">
      <p>Selecciona tu color: 
        <span className="color-preview" style={{ backgroundColor: color }}></span>
      </p>
      <div className="button-container">
        <button className="button" onClick={ () => setColor("#000000") }>Negro</button>
        <button className="button" onClick={ () => setColor("#6370ffff") }>Azul</button>
        <button className="button" onClick={ () => setColor("#e64545ff") }>Rojo</button>
      </div>
    </div>
  )
}
import { useState } from "react"

function StateHook(){
  const [colorText,setColorText] = useState("#ffb399ff") 
  
  return (
  <div>
    <button onClick={ () => { setColorText("#0084ffff")} }>      
      Texto azul
    </button>
    <button onClick={ () => { setColorText("#00ff11ff")} }>      
      Texto Verde
    </button>
    <p style={ {color: colorText} } >text</p>
  </div>
  )
}

export default StateHook
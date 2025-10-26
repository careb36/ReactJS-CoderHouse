import { useState } from "react";

export default function FormCheckout( { handleCheckout }){
  const [formData, setFormData] = useState(
    { username: "", mail: "", mailConfirm: "", phone: "" }
  );
  const [errors, setErrors] = useState({})

  function handleSubmit(event){
    event.preventDefault();  
    const newErrors = {}
    if (!formData.username.trim()) newErrors.username = 'Nombre requerido'
    if (!formData.mail) newErrors.mail = 'Email requerido'
    if (formData.mail !== formData.mailConfirm) newErrors.mailConfirm = 'Los emails no coinciden'
    if (!formData.phone) newErrors.phone = 'Teléfono requerido'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    handleCheckout(formData)
  }

  function handleInputChange(event){
    const value = event.target.value;
    const inputName = event.target.name;
    const newFormData = {...formData};
    newFormData[inputName] = value;
    setFormData(newFormData)
  }

  function handleReset(){
    setFormData({ username: "", mail: "", mailConfirm: "", phone: "" })
    setErrors({})
  }

  // * Controlled Component / Controlled Form 
  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:
            <input 
              onChange={handleInputChange}
              name="username" 
              placeholder="Santiago..."
              type="text"
              value={formData.username}
              required
            />
          </label>
          {errors.username && <small role="alert">{errors.username}</small>}

          <label>Email:
            <input 
              onChange={handleInputChange} 
              name="mail" 
              placeholder="mail@mail.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              type="email"
              value={formData.mail}
              required
            />
          </label>
          {errors.mail && <small role="alert">{errors.mail}</small>}

          <label>Confirmar Email:
            <input 
              onChange={handleInputChange} 
              name="mailConfirm" 
              placeholder="mail@mail.com"
              type="email"
              value={formData.mailConfirm}
              required
            />
          </label>
          {errors.mailConfirm && <small role="alert">{errors.mailConfirm}</small>}

          <label>Teléfono
            <input 
              onChange={handleInputChange} 
              name="phone" 
              placeholder="09x xxx xxx"
              type="tel"
              value={formData.phone}
              required
            />
          </label>
          {errors.phone && <small role="alert">{errors.phone}</small>}
        </div>
        <button type="submit">Finalizar compra</button>
        <button onClick={handleReset} type="button">Reset form</button>
      </form>
  )
}

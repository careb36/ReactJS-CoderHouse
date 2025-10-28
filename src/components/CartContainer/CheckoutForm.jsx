import { useState } from "react";
import './CheckoutForm.css'

export default function CheckoutForm({ handleCheckout }){
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
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="checkout-form__grid">
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
          {errors.username && <small className="field-error" role="alert">{errors.username}</small>}

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
          {errors.mail && <small className="field-error" role="alert">{errors.mail}</small>}

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
          {errors.mailConfirm && <small className="field-error" role="alert">{errors.mailConfirm}</small>}

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
          {errors.phone && <small className="field-error" role="alert">{errors.phone}</small>}
        </div>
        <div className="checkout-form__actions">
          <button type="submit">Finalizar compra</button>
          <button onClick={handleReset} type="button">Reset form</button>
        </div>
      </form>
  )
}

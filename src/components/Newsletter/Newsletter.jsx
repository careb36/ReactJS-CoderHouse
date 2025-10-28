import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import './Newsletter.css'

function Newsletter(){
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)

  function onSubmit(e){
    e.preventDefault()
    if (!email) return
    setOk(true)
    setEmail('')
    setTimeout(() => setOk(false), 2500)
  }

  return (
    <section className="newsletter">
      <div className="newsletter__container">
        <div className="newsletter__content">
          <h2 className="newsletter__title">¡Mantente al día!</h2>
          <p className="newsletter__description">Recibe ofertas exclusivas y noticias sobre café directo en tu bandeja de entrada.</p>
          <form className="newsletter__form" onSubmit={onSubmit}>
            <input
              type="email"
              className="newsletter__input"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={ok}
            />
            <button type="submit" className="newsletter__button" disabled={ok}>
              {ok ? '✓ ¡Suscrito!' : (<><FaPaperPlane/> Suscribirse</>)}
            </button>
          </form>
          {ok && <p className="newsletter__success">¡Gracias por suscribirte! Revisa tu email.</p>}
        </div>
      </div>
    </section>
  )
}

export default Newsletter


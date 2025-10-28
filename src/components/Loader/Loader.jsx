import './Loader.css'

export default function Loader({ label = 'Cargando…' }){
  return (
    <div className="loader" role="status" aria-live="polite" aria-label={label}>
      <span className="loader__spinner" aria-hidden="true" />
      <span className="loader__text">{label}</span>
    </div>
  )
}

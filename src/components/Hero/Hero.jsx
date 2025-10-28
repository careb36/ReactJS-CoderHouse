import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Hero.css'

const heroSlides = [
  {
    id: 1,
    title: 'Ethiopia Yirgacheffe',
    subtitle: 'Featured Roast',
    description: 'Experience a vibrant cup with bright notes of blueberry, jasmine, and citrus. Sourced directly from the birthplace of coffee.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80',
    link: '/category/grano'
  },
  {
    id: 2,
    title: 'Colombia Supremo',
    subtitle: 'Premium Selection',
    description: 'Rich and balanced with notes of caramel, nuts, and a hint of citrus. Perfect for your morning brew.',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=1600&q=80',
    link: '/category/molido'
  },
  {
    id: 3,
    title: 'Kenya AA',
    subtitle: 'Limited Edition',
    description: 'Bold and bright with blackcurrant and winey notes. A truly exceptional single-origin experience.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&q=80',
    link: '/category/capsulas'
  }
]

function Hero() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000)
    return () => clearInterval(id)
  }, [autoplay])

  const prev = () => { setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length); setAutoplay(false) }
  const next = () => { setCurrent((c) => (c + 1) % heroSlides.length); setAutoplay(false) }
  const goTo = (i) => { setCurrent(i); setAutoplay(false) }

  const slide = heroSlides[current]

  return (
    <section className="hero">
      <div className="hero__background" style={{ backgroundImage: `url(${slide.image})` }}>
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <div className="hero__text">
          <p className="hero__subtitle">{slide.subtitle}</p>
          <h1 className="hero__title">{slide.title}</h1>
          <p className="hero__description">{slide.description}</p>
          <div className="hero__buttons">
            <Link to={slide.link} className="btn btn--primary">Comprar Ahora</Link>
            <Link to="/about" className="btn btn--secondary">Conocer Más</Link>
          </div>
        </div>
      </div>

      <div className="hero__controls">
        <button className="hero__arrow hero__arrow--left" onClick={prev} aria-label="Anterior">
          <FaChevronLeft />
        </button>
        <div className="hero__indicators">
          {heroSlides.map((_, i) => (
            <button key={i} className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Ir al slide ${i+1}`} />
          ))}
        </div>
        <button className="hero__arrow hero__arrow--right" onClick={next} aria-label="Siguiente">
          <FaChevronRight />
        </button>
      </div>
    </section>
  )
}

export default Hero


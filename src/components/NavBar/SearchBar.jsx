import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

/**
 * SearchBar - Product search component integrated with URL query parameters.
 * Syncs search term with URL and resets pagination on new searches.
 * 
 * @returns {JSX.Element} Search form with input and submit button
 */
function SearchBar(){
  const [searchParams, setSearchParams] = useSearchParams()
  const [term, setTerm] = useState(searchParams.get('q') ?? '')

  // Keep local state synced with URL params
  useEffect(() => {
    const current = searchParams.get('q') ?? ''
    setTerm(current)
  }, [searchParams])

  /**
   * Handles search form submission.
   * Updates URL params and resets pagination.
   */
  function onSubmit(e){
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (term && term.trim()) {
      next.set('q', term.trim())
      next.delete('page') // Reset to page 1 on new search
    } else {
      next.delete('q')
      next.delete('page')
    }
    setSearchParams(next)
  }

  return (
    <form className="nav-search" onSubmit={onSubmit} role="search" aria-label="Buscar productos">
      <input
        className="nav-search__input"
        type="search"
        placeholder="Buscar productos..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        aria-label="Campo de búsqueda"
      />
      <button className="nav-search__btn" type="submit" aria-label="Realizar búsqueda" title="Buscar">
        <FaSearch aria-hidden="true" />
      </button>
    </form>
  )
}

export default SearchBar


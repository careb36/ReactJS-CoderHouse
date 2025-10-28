import { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * ErrorBoundary - Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console (and could also log to an error reporting service)
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#ffeaea',
          color: '#d63031'
        }}>
          <h2>¡Oops! Algo salió mal</h2>
          <p>Ha ocurrido un error inesperado. Por favor, intenta recargar la página.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#d63031',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Recargar página
          </button>
          {import.meta.env.DEV && (
            <details style={{ marginTop: '16px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Detalles técnicos (desarrollo)
              </summary>
              <pre style={{
                marginTop: '8px',
                padding: '8px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary
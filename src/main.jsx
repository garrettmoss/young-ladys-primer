import React from 'react'
import ReactDOM from 'react-dom/client'
import YoungLadysPrimer from './YoungLadysPrimer.jsx'
import './index.css'

// Error boundary for production
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Primer encountered an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          fontFamily: 'serif',
          background: 'linear-gradient(180deg, #f9f6f0 0%, #f5f1e6 50%, #ede8db 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div>
            <h1 style={{ color: '#92400e', marginBottom: '1rem' }}>📚</h1>
            <h2 style={{ color: '#92400e' }}>The Primer encountered an unexpected error</h2>
            <p style={{ color: '#b45309' }}>Please refresh the page to continue your journey.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <YoungLadysPrimer />
    </ErrorBoundary>
  </React.StrictMode>,
)
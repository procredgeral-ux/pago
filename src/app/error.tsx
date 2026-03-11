'use client'

// Forçar renderização dinâmica para evitar conflito Pages Router
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body style={{ 
        fontFamily: 'system-ui, sans-serif', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh',
        margin: 0,
        background: '#0a0a0a',
        color: '#fff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', margin: '0 0 1rem' }}>500</h1>
          <p style={{ fontSize: '1.25rem', color: '#888', marginBottom: '2rem' }}>
            Algo deu errado
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              background: '#fff',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  )
}

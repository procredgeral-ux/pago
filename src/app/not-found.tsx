'use client'

export default function NotFound() {
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
          <h1 style={{ fontSize: '4rem', margin: '0 0 1rem' }}>404</h1>
          <p style={{ fontSize: '1.25rem', color: '#888' }}>Página não encontrada</p>
        </div>
      </body>
    </html>
  )
}

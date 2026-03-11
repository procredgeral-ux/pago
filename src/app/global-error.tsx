'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px'
    }}>
      <h2>Algo deu errado!</h2>
      <button
        onClick={() => reset()}
        style={{
          padding: '12px 24px',
          background: '#0069FF',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginTop: '16px'
        }}
      >
        Tentar novamente
      </button>
    </div>
  )
}

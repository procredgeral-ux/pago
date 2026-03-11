export default function Custom404() {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <a href="/" style={{ color: '#0069FF', textDecoration: 'none' }}>
        Voltar para a página inicial
      </a>
    </div>
  );
}

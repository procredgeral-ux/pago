export default function Custom500() {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>500 - Erro no servidor</h1>
      <p>Houve um problema no servidor. Por favor, tente novamente mais tarde.</p>
      <a href="/" style={{ color: '#0069FF', textDecoration: 'none' }}>
        Voltar para a página inicial
      </a>
    </div>
  );
}

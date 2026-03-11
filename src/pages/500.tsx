import Link from 'next/link';
import React from 'react';

export default function Custom500() {
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
      <h1>500 - Erro do servidor</h1>
      <p>Ocorreu um erro interno no servidor.</p>
      <Link href="/" style={{ color: '#0069FF', marginTop: '16px' }}>
        Voltar para a página inicial
      </Link>
    </div>
  );
}

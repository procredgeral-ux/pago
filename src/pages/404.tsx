import Link from 'next/link';
import React from 'react';

export default function Custom404() {
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
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Link href="/" style={{ color: '#0069FF', marginTop: '16px' }}>
        Voltar para a página inicial
      </Link>
    </div>
  );
}

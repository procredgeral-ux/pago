import React from 'react';

function Error({ statusCode }: { statusCode?: number }) {
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
      <h1>{statusCode ? `Erro ${statusCode}` : 'Erro'}</h1>
      <p>Ocorreu um erro inesperado.</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: { res?: any; err?: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

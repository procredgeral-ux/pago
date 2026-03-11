# layout.tsx (auth)

## Descrição
Layout específico para as rotas de autenticação da aplicação. Define a estrutura visual para páginas de login, registro e outras rotas dentro do grupo (auth).

## Funcionalidades
- Wrapper simples para rotas de autenticação
- Renderiza apenas o children sem layout adicional
- Isolamento visual do fluxo de auth

## Estrutura
```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
```

## Características
- **Container**: Div com classe `min-h-screen` para ocupar altura total
- **Simplicidade**: Layout minimalista sem header ou navegação
- **Foco**: Concentra atenção no formulário de autenticação

## Uso
Este layout é aplicado automaticamente a todas as rotas dentro da pasta `(auth)`:
- `/login`
- `/register`
- Outras rotas de autenticação futuras

## Design
- Fundo branco/clean
- Sem elementos de distração
- Otimizado para formulários de login/registro
- Responsivo para mobile e desktop

## Relacionamento
- Parent: App Router layout hierarchy
- Children: páginas de autenticação
- Siblings: outros layouts de rotas ((dashboard), api routes)

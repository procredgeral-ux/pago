# page.tsx

## Descrição
Página principal (home) da aplicação que renderiza o componente HomeClient de forma assíncrona.

## Funcionalidades
- Renderização do componente principal da landing page
- Estruturação como Server Component para otimização de performance
- Delegação da lógica de interface para o componente client-side

## Componente Filho
- **HomeClient**: Componente principal que contém toda a lógica e interface da landing page

## Estrutura do Código
```typescript
import HomeClient from './home-client'

export default function Home() {
  return <HomeClient />
}
```

## Arquitetura
- Server Component que serve como wrapper para o client component
- Segue as melhores práticas do Next.js 15 App Router
- Permite renderização híbrida com otimização de SEO e performance

## Relacionamento
- Importa e renderiza `home-client.tsx`
- Arquivo de entrada principal da aplicação (rota "/")

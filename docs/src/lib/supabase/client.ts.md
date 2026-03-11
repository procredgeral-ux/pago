# client.ts (supabase)

## Descrição
Cliente Supabase para uso no lado do cliente (browser). Configuração otimizada para componentes React com tipagem TypeScript segura.

## Funcionalidades
- **Browser Client**: Configuração para ambiente client-side
- **Type Safety**: Tipagem completa com Database types
- **Authentication**: Suporte a auth flows no browser
- **Realtime**: Suporte a subscriptions em tempo real
- **Storage**: Acesso ao Supabase Storage

## Configuração
```typescript
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database.types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

## Variáveis de Ambiente
- **NEXT_PUBLIC_SUPABASE_URL**: URL do projeto Supabase
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Chave pública do Supabase

## Uso em Componentes
```typescript
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function UserProfile() {
  const [user, setUser] = useState(null)
  const supabase = createClient()
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
  }, [])
  
  return <div>{user?.email}</div>
}
```

## Métodos Disponíveis
- **auth**: Autenticação (signIn, signUp, signOut)
- **from**: Operações em tabelas do banco
- **storage**: Upload e download de arquivos
- **realtime**: Subscriptions em tempo real
- **functions**: Chamadas a Edge Functions

## Tipagem TypeScript
- Importação de `Database` types
- Autocomplete completo
- Validação de tipos em tempo de desenvolvimento
- Refactoring seguro

## Segurança
- Usa apenas chave pública (anon key)
- Sem acesso a operações administrativas
- Row Level Security (RLS) no backend
- Sem segredos expostos no client

## Performance
- Lazy loading do cliente
- Cache automático do Supabase
- Conexões persistentes
- Otimizado para React

## Características
- SSR compatible
- Middleware integration
- Session management
- Error handling integrado

## Relacionamento
- Server counterpart: `src/lib/supabase/server.ts`
- Types: `src/types/database.types.ts`
- Middleware: `src/lib/supabase/middleware.ts`

## Best Practices
- Criar uma instância por componente
- Usar em useEffect para operações assíncronas
- Tratar erros adequadamente
- Limpar subscriptions no unmount

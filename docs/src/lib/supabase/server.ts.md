# server.ts (supabase)

## Descrição
Cliente Supabase para uso no lado do servidor (Server Components, API Routes, Server Actions). Configuração otimizada com gerenciamento de cookies e tipagem TypeScript.

## Funcionalidades
- **Server Client**: Configuração para ambiente server-side
- **Cookie Management**: Gerenciamento automático de sessões via cookies
- **Type Safety**: Tipagem completa com Database types
- **Security**: Acesso com service role quando necessário
- **Performance**: Otimizado para Server Components

## Configuração
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Ignorado em Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Ignorado em Server Components
          }
        },
      },
    }
  )
}
```

## Uso em Server Components
```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return <div>Welcome {user.email}</div>
}
```

## Uso em API Routes
```typescript
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: users } = await supabase.from('users').select('*')
  
  return NextResponse.json({ users })
}
```

## Cookie Management
- **get**: Lê cookies da requisição
- **set**: Define cookies na resposta
- **remove**: Remove cookies
- **Options**: Configurações de segurança (httpOnly, secure, etc.)

## Segurança
- Cookies httpOnly e secure
- SameSite protection
- Row Level Security (RLS)
- Sem exposição de secrets

## Performance
- Conexões reutilizáveis
- Cache de autenticação
- Lazy loading
- Server-side rendering otimizado

## Características
- SSR compatible
- Middleware integration
- Session persistence
- Error handling

## Relacionamento
- Client counterpart: `src/lib/supabase/client.ts`
- Types: `src/types/database.types.ts`
- Middleware: `src/lib/supabase/middleware.ts`
- App Router: `src/middleware.ts`

## Variáveis de Ambiente
- **NEXT_PUBLIC_SUPABASE_URL**: URL do projeto Supabase
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Chave pública
- **SUPABASE_SERVICE_ROLE_KEY**: Chave de serviço (admin)

## Best Practices
- Usar async/await
- Tratar erros adequadamente
- Usar em Server Components quando possível
- Manter instâncias por request

# layout.tsx (dashboard)

## Descrição
Layout principal para todas as rotas protegidas do dashboard. Implementa estrutura completa com header, navegação lateral e conteúdo principal, além de proteção de autenticação.

## Funcionalidades Principais
- **Proteção de Rota**: Verificação de autenticação antes do render
- **Header**: Barra superior com informações do usuário e logout
- **Sidebar**: Navegação lateral com menu completo
- **Content Area**: Área principal para conteúdo das páginas
- **Responsive Design**: Adaptação para mobile e desktop

## Componentes Filhos
- DashboardHeader (src/components/dashboard/dashboard-header.tsx)
- DashboardNav (src/components/dashboard/dashboard-nav.tsx)
- DashboardContentWrapper (src/components/dashboard/dashboard-content-wrapper.tsx)

## Estrutura do Layout
```typescript
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verificação de autenticação
  // Renderização do header, nav e content
}
```

## Proteção de Autenticação
- Verificação de sessão válida
- Redirecionamento automático para login se não autenticado
- Server-side protection para segurança

## Navegação Incluída
- Dashboard/Overview
- API Keys
- Usage/Analytics
- Billing/Pricing
- Settings
- Admin (se permitido)

## Design System
- Cores consistentes com branding
- Tipografia Inter
- Espaçamentos padronizados
- Animações e transições

## Responsividade
- Mobile: Sidebar colapsável
- Tablet: Layout adaptativo
- Desktop: Sidebar fixa
- Breakpoints bem definidos

## Performance
- Server-side rendering
- Otimização de componentes
- Lazy loading onde aplicável
- Cache estratégico

## Importações
```typescript
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { DashboardContentWrapper } from '@/components/dashboard/dashboard-content-wrapper'
import { createClient } from '@/lib/supabase/server'
```

## Relacionamento
- Parent: App Router hierarchy
- Children: páginas do dashboard
- Protegido por middleware de autenticação
- Integração com sistema de permissões

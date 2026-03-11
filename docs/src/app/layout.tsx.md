# layout.tsx

## Descrição
Arquivo de layout raiz da aplicação Next.js 15 com App Router. Define a estrutura HTML base e configurações globais da aplicação.

## Funcionalidades
- Configuração de metadados da aplicação (título e descrição)
- Configuração da fonte Inter com múltiplos pesos
- Estrutura HTML semântica com idioma definido
- Inicialização de componentes globais:
  - LoggerInit para sistema de logging
  - SessionSync para sincronização de sessões
  - Toaster para notificações do sistema

## Componentes Utilizados
- Inter (Google Fonts)
- LoggerInit (src/components/logger-init.tsx)
- SessionSync (src/components/session-sync.tsx)
- Toaster (src/components/ui/toaster.tsx)

## Metadados
- **Title**: "BigDataCorp - API Rental Platform"
- **Description**: "The most revolutionary datatech in the country - Professional API management, rate limiting, and usage tracking platform"

## Importações
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { SessionSync } from '@/components/session-sync'
import { LoggerInit } from '@/components/logger-init'
```

## Estrutura do Componente
- Fonte Inter configurada com subsets latinos e pesos variados
- Layout HTML com body contendo os componentes globais
- Children renderizados dentro da estrutura base

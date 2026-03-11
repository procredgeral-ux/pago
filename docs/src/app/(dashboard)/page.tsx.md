# page.tsx (dashboard)

## Descrição
Página principal do dashboard da BigDataCorp. Componente client-side que exibe overview completo da conta do usuário, incluindo estatísticas, atividades recentes e acesso rápido às funcionalidades principais.

## Funcionalidades Principais
- **Dashboard Overview**: Visão geral da conta
- **Statistics Cards**: Métricas principais (API calls, créditos, etc.)
- **Recent Activity**: Histórico de atividades recentes
- **Quick Actions**: Ações rápidas e atalhos
- **Usage Charts**: Gráficos de consumo e tendências
- **API Keys Preview**: Preview das chaves de API recentes

## Componentes Utilizados
- DashboardHeader (header com informações do usuário)
- UsageChart (gráficos de consumo)
- RecentActivity (atividades recentes)
- ApiKeysTable (tabela de API keys)
- UsageAlert (alertas de uso)
- Cards e Badges UI components

## Estado e Hooks
- **user**: Estado com dados do usuário logado
- **stats**: Estado com estatísticas da conta
- **recentActivity**: Estado com atividades recentes
- **loading**: Estados de loading para diferentes seções
- **refresh**: Função para atualizar dados

## Métricas Exibidas
- Total de API calls no período
- Créditos disponíveis e utilizados
- Número de API keys ativas
- Taxa de sucesso das requisições
- Tempo médio de resposta
- Uso por endpoint

## Seções do Dashboard

### Header Section
- Boas-vindas personalizadas
- Informações do plano atual
- Data do último login
- Quick actions

### Statistics Overview
- Cards com métricas principais
- Comparação com período anterior
- Indicadores visuais (cores, ícones)
- Links para detalhes

### Usage Analytics
- Gráficos de consumo temporal
- Distribuição por endpoint
- Tendências de uso
- Export de dados

### Recent Activity
- Log de atividades recentes
- Filtros por tipo e data
- Paginação
- Detalhes expansíveis

### Quick Actions
- Criar nova API key
- Comprar créditos
- Ver documentação
- Suporte

## Performance
- Carregamento assíncrono das seções
- Cache de dados estáticos
- Lazy loading de componentes pesados
- Otimização de re-renders

## Responsividade
- Layout adaptativo para mobile
- Cards empilhados em telas pequenas
- Gráficos responsivos
- Navegação otimizada para touch

## Importações
```typescript
'use client'
import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { UsageChart } from '@/components/dashboard/usage-chart'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { ApiKeysTable } from '@/components/dashboard/api-keys-table'
import { UsageAlert } from '@/components/dashboard/usage-alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
```

## Integrações
- API de estatísticas do usuário
- Sistema de logs de atividade
- Analytics de uso de API
- Sistema de alertas e notificações

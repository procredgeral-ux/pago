# page.tsx (admin)

## Descrição
Página principal do painel administrativo da BigDataCorp. Interface completa para administração do sistema, incluindo gestão de usuários, módulos, estatísticas e configurações do sistema.

## Funcionalidades Principais
- **Admin Dashboard**: Overview completa do sistema
- **User Management**: Gestão de usuários e permissões
- **Module Management**: Administração de módulos de API
- **System Statistics**: Métricas administrativas
- **Configuration**: Configurações do sistema
- **Audit Logs**: Visualização de logs de auditoria

## Componentes Utilizados
- UsersTable (tabela de usuários administrativos)
- StatsChart (gráficos administrativos)
- Admin-specific UI components
- Cards e Badges para métricas

## Estado e Hooks
- **users**: Lista de usuários do sistema
- **stats**: Estatísticas administrativas
- **modules**: Lista de módulos disponíveis
- **loading**: Estados de loading
- **filters**: Filtros para dados administrativos

## Métricas Administrativas
- Total de usuários ativos
- Consumo total do sistema
- Receita gerada
- Módulos mais utilizados
- Taxa de erro global
- Performance dos endpoints

## Seções Administrativas

### Overview
- Cards com métricas principais
- Gráficos de crescimento
- Status do sistema
- Alertas críticos

### User Management
- Tabela de usuários com busca
- Filtros por status, plano, data
- Ações em massa (ban, upgrade)
- Detalhes do usuário

### Module Management
- Lista de módulos de API
- Configuração de preços
- Status de disponibilidade
- Métricas por módulo

### System Configuration
- Configurações globais
- Parâmetros de rate limiting
- Configurações de email
- Integrações externas

### Audit Logs
- Logs de ações administrativas
- Filtros por usuário e data
- Export de logs
- Detalhes das ações

## Permissões e Segurança
- Verificação de role de administrador
- Controle de acesso granular
- Log de todas as ações
- Validação de permissões

## Performance
- Paginação de grandes conjuntos de dados
- Cache de estatísticas
- Lazy loading
- Otimização de queries

## Importações
```typescript
'use client'
import { useState, useEffect } from 'react'
import { UsersTable } from '@/components/admin/users-table'
import { StatsChart } from '@/components/admin/stats-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
```

## Responsividade
- Layout adaptativo para tablets
- Tabelas responsivas
- Cards empilháveis em mobile
- Navegação otimizada

## Integrações
- API de administração
- Sistema de auditoria
- Analytics do sistema
- Logs de segurança

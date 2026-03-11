# page.tsx (login)

## Descrição
Página de login da aplicação BigDataCorp. Componente client-side que implementa formulário de autenticação com email e senha, incluindo validações e integração com backend.

## Funcionalidades Principais
- **Formulário de Login**: Campos de email e senha com validação
- **Autenticação**: Integração com API de autenticação
- **Navegação**: Links para registro e recuperação de senha
- **Feedback Visual**: Estados de loading, erro e sucesso
- **Redirecionamento**: Pós-login para dashboard ou página solicitada

## Estado e Hooks
- **formData**: Estado para dados do formulário (email, senha)
- **loading**: Estado para controle de loading durante submit
- **error**: Estado para exibição de mensagens de erro
- **router**: Hook para navegação programática
- **searchParams**: Parâmetros URL para redirecionamento pós-login

## Validações
- Email obrigatório e formato válido
- Senha obrigatória
- Validação client-side antes do envio
- Feedback visual de erros de campo

## Componentes UI
- Button (shadcn/ui)
- Input (shadcn/ui)
- Label (shadcn/ui)
- Card (shadcn/ui)
- Alert para mensagens de erro

## Layout e Design
- Card centralizado na tela
- Logo e branding da BigDataCorp
- Links para registro e esqueci senha
- Design responsivo e clean
- Cores da marca corporativa

## Fluxo de Autenticação
1. Preenchimento do formulário
2. Validação client-side
3. Submit para API `/api/auth/login`
4. Processamento de resposta
5. Redirecionamento em caso de sucesso
6. Exibição de erro em caso de falha

## Segurança
- Validação de inputs
- Tratamento de erros seguros
- Proteção contra XSS
- Integração com sistema de auth seguro

## Importações
```typescript
'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
```

## Responsividade
- Mobile-first design
- Layout adaptativo
- Otimização para touch devices
- Breakpoints para tablets e desktops

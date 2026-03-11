# route.ts (auth/register)

## Descrição
API endpoint para registro de novos usuários na plataforma BigDataCorp. Implementa criação de conta com validações, segurança e integração com Supabase Auth.

## Funcionalidades Principais
- **User Registration**: Criação de novas contas de usuário
- **Input Validation**: Validação rigorosa de dados de entrada
- **Password Security**: Hash seguro de senhas
- **Email Verification**: Sistema de verificação de email
- **Error Handling**: Tratamento robusto de erros
- **Rate Limiting**: Proteção contra abuso

## Método HTTP
- **POST** /api/auth/register

## Request Body
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe",
  "phone": "+5511999999999"
}
```

## Response Codes
- **201**: Usuário criado com sucesso
- **400**: Dados inválidos ou faltantes
- **409**: Email já existe
- **429**: Rate limit excedido
- **500**: Erro interno do servidor

## Validações Implementadas
- Email formato válido e único
- Password mínimo 8 caracteres
- Nome obrigatório
- Telefone formato válido (opcional)
- Sanitização de inputs

## Fluxo de Registro
1. Receber e validar dados
2. Verificar rate limiting
3. Verificar duplicidade de email
4. Hash da senha
5. Criar usuário no Supabase
6. Enviar email de verificação
7. Retornar resposta

## Segurança
- bcrypt para hash de senhas
- Rate limiting por IP
- Sanitização XSS
- Validação server-side
- Logs de auditoria

## Integrações
- Supabase Auth
- Sistema de email (Resend)
- Rate limiting (Redis)
- Sistema de logs

## Importações
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { createClient } from '@/lib/supabase/server'
import { rateLimiter } from '@/lib/rate-limiter'
import { registerSchema } from '@/lib/validations/auth'
```

## Error Handling
- Tratamento de erros específicos
- Mensagens genéricas para segurança
- Logging detalhado para debugging
- Respostas HTTP adequadas

## Performance
- Validações eficientes
- Queries otimizadas
- Cache de verificações
- Timeout adequado

# route.ts (api/v1/cpf)

## Descrição
API endpoint público para consulta de dados de CPF através da BigDataCorp API. Implementa autenticação via API key, rate limiting e integração com o serviço externo de consulta de CPF.

## Funcionalidades Principais
- **CPF Query**: Consulta de dados de CPF na BigDataCorp
- **API Key Authentication**: Validação de chaves de API
- **Rate Limiting**: Controle de uso por usuário e plano
- **Credit System**: Dedução de créditos por consulta
- **Usage Logging**: Registro de todas as consultas
- **Error Handling**: Tratamento robusto de erros

## Método HTTP
- **GET** /api/v1/cpf?cpf=xxx.xxx.xxx-xx

## Query Parameters
- **cpf** (required): Número do CPF a ser consultado

## Headers
- **Authorization**: Bearer {api_key}
- **Content-Type**: application/json

## Response Codes
- **200**: Consulta realizada com sucesso
- **400**: CPF inválido ou parâmetros faltantes
- **401**: API key inválida ou expirada
- **403**: Sem permissão ou créditos insuficientes
- **429**: Rate limit excedido
- **500**: Erro interno do servidor

## Response Success
```json
{
  "success": true,
  "data": {
    "cpf": "123.456.789-00",
    "name": "João Silva",
    "birthDate": "1990-01-01",
    "status": "regular",
    // ... outros dados do CPF
  },
  "credits_used": 1,
  "remaining_credits": 999
}
```

## Validações Implementadas
- Formato válido de CPF
- API key presente e válida
- Créditos suficientes
- Rate limiting respeitado
- Permissão para consulta de CPF

## Fluxo da Consulta
1. Extrair e validar API key
2. Validar formato do CPF
3. Verificar autenticação e permissões
4. Verificar rate limiting e créditos
5. Chamar BigDataCorp API
6. Processar resposta
7. Deduzir créditos
8. Logar uso
9. Retornar resultado

## Integrações
- BigDataCorp Client (src/lib/bigdatacorp/client.ts)
- API Keys Management
- Rate Limiter (Redis)
- Usage Logs
- Credit System

## Segurança
- Validação rigorosa de inputs
- Autenticação forte via API key
- Rate limiting por usuário
- Logs de auditoria
- Sanitização de dados

## Importações
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { bigDataCorpClient } from '@/lib/bigdatacorp/client'
import { validateApiKey } from '@/lib/api-key'
import { rateLimiter } from '@/lib/rate-limiter'
import { logUsage } from '@/lib/usage-logger'
import { cpfSchema } from '@/lib/validations'
```

## Performance
- Cache de consultas recentes
- Timeout adequado para API externa
- Queries otimizadas
- Async/await eficiente

## Rate Limiting
- Limites por minuto/dia/mês
- Baseados no plano do usuário
- Redis para controle distribuído
- Headers informativos na resposta

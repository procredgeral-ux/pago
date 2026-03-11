# client.ts (bigdatacorp)

## Descrição
Cliente TypeScript para integração com a API externa BigDataCorp. Implementa chamadas autenticadas aos serviços de consulta de dados (CPF, CNPJ, telefone, veículos, etc.).

## Funcionalidades Principais
- **API Integration**: Conexão com BigDataCorp API
- **Authentication**: Autenticação via Bearer token
- **Multiple Endpoints**: Suporte a diversos tipos de consulta
- **Error Handling**: Tratamento robusto de erros
- **Type Safety**: Tipagem completa para requests/responses

## Configuração
```typescript
interface BigDataCorpConfig {
  apiKey: string
  baseUrl: string
}

class BigDataCorpClient {
  private config: BigDataCorpConfig
  
  constructor() {
    const apiKey = process.env.BIGDATACORP_API_KEY
    const baseUrl = process.env.BIGDATACORP_API_URL || 'https://api.bigdatacorp.com.br'
    // ...
  }
}
```

## Variáveis de Ambiente
- **BIGDATACORP_API_KEY**: Chave de API da BigDataCorp (obrigatória)
- **BIGDATACORP_API_URL**: URL base da API (opcional, default: https://api.bigdatacorp.com.br)

## Métodos Disponíveis

### queryCPF(cpf: string)
Consulta dados de CPF
```typescript
await bigDataCorpClient.queryCPF('123.456.789-00')
```

### queryCNPJ(cnpj: string)
Consulta dados de CNPJ
```typescript
await bigDataCorpClient.queryCNPJ('12.345.678/0001-90')
```

### queryTelefone(telefone: string)
Consulta dados de telefone
```typescript
await bigDataCorpClient.queryTelefone('+5511999999999')
```

### queryVeiculos(params: { cpf?: string; cnpj?: string })
Consulta dados de veículos
```typescript
await bigDataCorpClient.queryVeiculos({ cpf: '123.456.789-00' })
```

### queryRelacionados(cpf: string)
Consulta pessoas relacionadas
```typescript
await bigDataCorpClient.queryRelacionados('123.456.789-00')
```

### queryBeneficios(cpf: string)
Consulta dados de benefícios
```typescript
await bigDataCorpClient.queryBeneficios('123.456.789-00')
```

## Estrutura de Request
```typescript
private async request<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams(params)
  const url = `${this.config.baseUrl}${endpoint}?${queryParams.toString()}`
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(`BigDataCorp API error: ${error.error || response.statusText}`)
  }
  
  return await response.json()
}
```

## Error Handling
- Validação de API key
- Tratamento de HTTP errors
- Parse seguro de JSON
- Logging detalhado de erros
- Timeout handling

## Segurança
- API key armazenada em environment variables
- HTTPS obrigatório
- Sanitização de inputs
- Não expõe credenciais

## Performance
- Reuso de conexões
- Timeout adequado
- Error boundaries
- Cache considerations

## Uso em API Routes
```typescript
import { bigDataCorpClient } from '@/lib/bigdatacorp/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const cpf = searchParams.get('cpf')
  
  try {
    const data = await bigDataCorpClient.queryCPF(cpf)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
```

## Importações
```typescript
// Singleton instance
export const bigDataCorpClient = new BigDataCorpClient()
```

## Best Practices
- Usar o singleton exportado
- Tratar todos os erros
- Validar inputs antes de enviar
- Implementar retry se necessário
- Monitorar usage e limits

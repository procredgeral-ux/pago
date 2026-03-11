# Troubleshooting PIX Payment Error 500

## Erro: `POST /api/payments/pix/demo 500 (Internal Server Error)`

## Causa
Inconsistência nas credenciais do Mercado Pago:
- Seu `.env` tem **Access Token em PRODUÇÃO** (`APP_USR-...`)
- Mas **Public Key em TESTE** (`TEST-...`)

Isso causa erro de autenticação na API do Mercado Pago.

## Solução

### Opção 1: Usar AMBOS em TESTE (Recomendado para desenvolvimento)

Edite seu arquivo `.env.local` na pasta do projeto:

```bash
# Mercado Pago - TESTE (Desenvolvimento)
MP_ACCESS_TOKEN=TEST-8438376993315530-030920-c2267c4c13566de59d41ba1485472214-400583582
MP_PUBLIC_KEY=TEST-9d31b528-e114-4e97-864a-86bc8399f397
MP_PIX_KEY=teste@email.com
```

### Opção 2: Usar AMBOS em PRODUÇÃO (Quando for ao ar)

```bash
# Mercado Pago - PRODUÇÃO
MP_ACCESS_TOKEN=APP_USR-8987823701532632-022317-36a1674cec933263c9379c60b1eb80e7-3222116493
MP_PUBLIC_KEY=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MP_PIX_KEY=seu-email-real@dominio.com
```

**IMPORTANTE**: Nunca misture TEST e PRODUCAO. Os dois devem ser do mesmo ambiente.

## Reiniciar Servidor

Após editar `.env.local`:

```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente:
npm run dev
```

## Verificar Credenciais

Acesse para obter credenciais de TESTE:
https://www.mercadopago.com.br/developers/panel/app

1. Selecione seu aplicativo
2. Vá em "Credenciais de prueba" (Test)
3. Copie Access Token e Public Key

## Testar Endpoint

Teste manualmente no terminal:

```bash
curl -X POST http://localhost:3000/api/payments/pix/demo \
  -H "Content-Type: application/json" \
  -d '{"planType":"basic","amount":2900}'
```

Se retornar QR Code, está funcionando!

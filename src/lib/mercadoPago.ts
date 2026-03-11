import { MercadoPagoConfig } from 'mercadopago'

// Determina o ambiente de pagamento
const environment = process.env.MP_ENVIRONMENT || 'development'
const isProduction = environment === 'production'

// Seleciona as credenciais baseadas no ambiente
const accessToken = isProduction 
  ? process.env.MP_PROD_ACCESS_TOKEN 
  : process.env.MP_TEST_ACCESS_TOKEN

const publicKey = isProduction
  ? process.env.MP_PROD_PUBLIC_KEY
  : process.env.MP_TEST_PUBLIC_KEY

const pixKey = isProduction
  ? process.env.MP_PROD_PIX_KEY
  : process.env.MP_TEST_PIX_KEY

// Validação
if (!accessToken) {
  console.error(`[Mercado Pago] ERRO: MP_${isProduction ? 'PROD' : 'TEST'}_ACCESS_TOKEN não configurado`)
}

if (!publicKey) {
  console.error(`[Mercado Pago] ERRO: MP_${isProduction ? 'PROD' : 'TEST'}_PUBLIC_KEY não configurado`)
}

// Configuração do cliente
export const mpConfig = new MercadoPagoConfig({
  accessToken: accessToken!,
})

// Exporta informações do ambiente
export const mpEnvironment = {
  isProduction,
  isDevelopment: !isProduction,
  environment,
  publicKey,
  pixKey,
  accessTokenPrefix: accessToken?.substring(0, 10) || 'N/A',
}

// Log de inicialização
console.log(`[Mercado Pago] Ambiente: ${environment.toUpperCase()}`)
console.log(`[Mercado Pago] Token: ${accessToken?.substring(0, 15)}...`)
console.log(`[Mercado Pago] Modo: ${isProduction ? '⚠️ PRODUÇÃO (pagamentos reais)' : '✅ TESTE (sandbox)'}`)

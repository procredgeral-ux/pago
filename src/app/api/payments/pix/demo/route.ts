import { NextRequest, NextResponse } from 'next/server'
import { mpConfig } from '@/lib/mercadoPago'
import { Payment } from 'mercadopago'

export async function POST(request: NextRequest) {
  try {
    // Modo DEMO/TESTE - sem autenticação necessária
    // Em produção, este endpoint deve ser removido ou protegido
    
    console.log('[PIX DEMO] Starting payment creation...')
    console.log('[PIX DEMO] MP_ACCESS_TOKEN exists:', !!process.env.MP_ACCESS_TOKEN)
    console.log('[PIX DEMO] MP_ACCESS_TOKEN starts with:', process.env.MP_ACCESS_TOKEN?.substring(0, 10))
    
    const { planType, amount, description, email = 'teste@demo.com' } = await request.json()
    console.log('[PIX DEMO] Request body:', { planType, amount, description, email })

    // Valores padrão para planos
    const planValues: Record<string, { amount: number; description: string }> = {
      basic: { amount: 2900, description: 'Plano Basic - BigDataCorp API (DEMO)' },
      pro: { amount: 9900, description: 'Plano Pro - BigDataCorp API (DEMO)' },
      enterprise: { amount: 49900, description: 'Plano Enterprise - BigDataCorp API (DEMO)' },
    }

    const paymentAmount = amount || planValues[planType]?.amount || 2900
    const paymentDescription = description || planValues[planType]?.description || 'Pagamento Demo BigDataCorp'

    const payment = new Payment(mpConfig)
    
    const response = await payment.create({
      body: {
        transaction_amount: paymentAmount / 100, // Converter centavos para reais
        description: paymentDescription,
        payment_method_id: 'pix',
        payer: {
          email: email,
          first_name: 'Teste',
          last_name: 'Demo',
        },
        external_reference: `demo-${planType}-${Date.now()}`,
        // notification_url removida para testes locais - Mercado Pago não acessa localhost
      }
    })

    return NextResponse.json({
      payment_id: response.id,
      qr_code: response.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: response.point_of_interaction?.transaction_data?.qr_code_base64,
      external_reference: response.external_reference,
      amount: paymentAmount,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
      demo_mode: true,
    })

  } catch (error: any) {
    console.error('[PIX DEMO] Error creating payment:', error)
    console.error('[PIX DEMO] Error message:', error.message)
    console.error('[PIX DEMO] Error cause:', error.cause)
    console.error('[PIX DEMO] Error stack:', error.stack)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create PIX payment',
        details: error.cause || null,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

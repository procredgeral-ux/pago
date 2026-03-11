import { NextRequest, NextResponse } from 'next/server'
import { mpConfig, mpEnvironment } from '@/lib/mercadoPago'
import { Preference } from 'mercadopago'

export async function POST(request: NextRequest) {
  try {
    console.log(`[PIX CHECKOUT] Ambiente: ${mpEnvironment.environment}`)
    const { planType, planName, amount, email = 'teste@demo.com' } = await request.json()

    // Valores padrão para planos
    const planValues: Record<string, { amount: number; title: string }> = {
      basic: { amount: 2900, title: 'Plano Basic - BigDataCorp API' },
      pro: { amount: 9900, title: 'Plano Pro - BigDataCorp API' },
      enterprise: { amount: 49900, title: 'Plano Enterprise - BigDataCorp API' },
    }

    const paymentAmount = amount || planValues[planType]?.amount || 2900
    const title = planName || planValues[planType]?.title || 'Plano BigDataCorp API'

    const preference = new Preference(mpConfig)
    
    const response = await preference.create({
      body: {
        items: [
          {
            id: planType,
            title: title,
            quantity: 1,
            unit_price: paymentAmount / 100, // Converter centavos para reais
            currency_id: 'BRL',
          },
        ],
        payer: {
          email: email,
          name: 'Teste Demo',
        },
        external_reference: `checkout-${planType}-${Date.now()}`,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/failure`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/pending`,
        },
      }
    })

    return NextResponse.json({
      checkout_url: response.init_point,
      sandbox_url: response.sandbox_init_point,
      preference_id: response.id,
      external_reference: response.external_reference,
    })

  } catch (error: any) {
    console.error('[PIX CHECKOUT] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

const mp = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN! 
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planType, amount, description } = await request.json()

    // Valores padrão para planos
    const planValues: Record<string, { amount: number; description: string }> = {
      basic: { amount: 2900, description: 'Plano Basic - BigDataCorp API' },
      pro: { amount: 9900, description: 'Plano Pro - BigDataCorp API' },
      enterprise: { amount: 49900, description: 'Plano Enterprise - BigDataCorp API' },
    }

    const paymentAmount = amount || planValues[planType]?.amount || 2900
    const paymentDescription = description || planValues[planType]?.description || 'Pagamento BigDataCorp'

    const payment = new Payment(mp)
    
    const response = await payment.create({
      body: {
        transaction_amount: paymentAmount / 100, // Converter centavos para reais
        description: paymentDescription,
        payment_method_id: 'pix',
        payer: {
          email: user.email!,
          first_name: user.user_metadata?.full_name?.split(' ')[0] || 'Cliente',
          last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
        },
        external_reference: `${user.id}-${planType}-${Date.now()}`,
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
      }
    })

    // Salvar pagamento no banco
    await supabase.from('payments').insert({
      user_id: user.id,
      mp_payment_id: response.id?.toString(),
      amount: paymentAmount,
      plan_type: planType,
      status: 'pending',
      payment_method: 'pix',
      qr_code: response.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: response.point_of_interaction?.transaction_data?.qr_code_base64,
      external_reference: response.external_reference,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
    })

    return NextResponse.json({
      payment_id: response.id,
      qr_code: response.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: response.point_of_interaction?.transaction_data?.qr_code_base64,
      external_reference: response.external_reference,
      amount: paymentAmount,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    })

  } catch (error: any) {
    console.error('PIX Payment Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create PIX payment' },
      { status: 500 }
    )
  }
}

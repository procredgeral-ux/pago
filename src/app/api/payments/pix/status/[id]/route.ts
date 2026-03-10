import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

const mp = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN! 
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const paymentId = params.id

    // Verificar no Mercado Pago
    const payment = new Payment(mp)
    const mpPayment = await payment.get({ id: paymentId })

    // Mapear status do MP para nosso status
    const statusMap: Record<string, string> = {
      'pending': 'pending',
      'in_process': 'pending',
      'approved': 'approved',
      'authorized': 'approved',
      'cancelled': 'cancelled',
      'rejected': 'cancelled',
      'refunded': 'refunded',
      'charged_back': 'refunded',
    }

    const mappedStatus = statusMap[mpPayment.status || 'pending']

    // Atualizar no banco se mudou
    await supabase
      .from('payments')
      .update({ 
        status: mappedStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('mp_payment_id', paymentId)

    // Se aprovado, ativar assinatura
    if (mappedStatus === 'approved') {
      const { data: paymentData } = await supabase
        .from('payments')
        .select('plan_type')
        .eq('mp_payment_id', paymentId)
        .single()

      if (paymentData?.plan_type) {
        // Atualizar ou criar assinatura
        await supabase.from('subscriptions').upsert({
          user_id: user.id,
          plan_type: paymentData.plan_type,
          status: 'active',
          mp_payment_id: paymentId,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        })
      }
    }

    return NextResponse.json({
      status: mappedStatus,
      mp_status: mpPayment.status,
      payment_id: paymentId,
      transaction_amount: mpPayment.transaction_amount,
      date_created: mpPayment.date_created,
      date_approved: mpPayment.date_approved,
    })

  } catch (error: any) {
    console.error('Status Check Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check payment status' },
      { status: 500 }
    )
  }
}

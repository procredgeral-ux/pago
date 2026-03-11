'use client'

import { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Copy, CheckCircle, XCircle, Clock } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface PixPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  planType: 'basic' | 'pro' | 'enterprise'
  planName: string
  amount: number
  demoMode?: boolean // Modo teste sem autenticação
}

interface PaymentData {
  payment_id: string
  qr_code: string
  qr_code_base64: string
  external_reference: string
  amount: number
  expires_at: string
}

export function PixPaymentModal({ 
  isOpen, 
  onClose, 
  planType, 
  planName, 
  amount,
  demoMode = false
}: PixPaymentModalProps) {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'pending' | 'approved' | 'cancelled' | 'expired'>('pending')
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutos em segundos

  const createPayment = useCallback(async () => {
    setLoading(true)
    try {
      // Usar endpoint demo em modo teste (sem autenticação)
      const endpoint = demoMode ? '/api/payments/pix/demo' : '/api/payments/pix/create'
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType, amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment')
      }

      const data = await response.json()
      setPaymentData(data)
      setStatus('pending')
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o pagamento PIX',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [planType, amount, demoMode])

  const checkStatus = useCallback(async () => {
    if (!paymentData?.payment_id) return

    try {
      const response = await fetch(`/api/payments/pix/status/${paymentData.payment_id}`)
      const data = await response.json()
      
      if (data.status === 'approved') {
        setStatus('approved')
        toast({
          title: 'Pagamento aprovado!',
          description: 'Seu plano foi ativado com sucesso.',
        })
        setTimeout(onClose, 2000)
      } else if (data.status === 'cancelled' || data.status === 'expired') {
        setStatus(data.status)
      }
    } catch (error) {
      console.error('Error checking status:', error)
    }
  }, [paymentData?.payment_id, onClose])

  useEffect(() => {
    if (isOpen && !paymentData) {
      createPayment()
    }
  }, [isOpen, paymentData, createPayment])

  useEffect(() => {
    if (status !== 'pending' || !paymentData) return

    const interval = setInterval(checkStatus, 5000) // Verifica a cada 5 segundos
    return () => clearInterval(interval)
  }, [status, paymentData, checkStatus])

  useEffect(() => {
    if (timeLeft > 0 && status === 'pending') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, status])

  const copyPixCode = () => {
    if (paymentData?.qr_code) {
      navigator.clipboard.writeText(paymentData.qr_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({ title: 'Código PIX copiado!' })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatAmount = (cents: number) => {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1D203A] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Pagamento PIX - {planName}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#0069FF]" />
            <p className="mt-4 text-gray-400">Gerando QR Code...</p>
          </div>
        ) : paymentData ? (
          <div className="space-y-6">
            {/* Valor */}
            <div className="text-center">
              <p className="text-sm text-gray-400">Valor a pagar</p>
              <p className="text-3xl font-bold text-[#0069FF]">
                {formatAmount(paymentData.amount)}
              </p>
            </div>

            {/* Status */}
            {status === 'pending' && (
              <div className="flex items-center justify-center gap-2 text-amber-400">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Aguardando pagamento... ({formatTime(timeLeft)})</span>
              </div>
            )}
            {status === 'approved' && (
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Pagamento aprovado!</span>
              </div>
            )}
            {status === 'cancelled' && (
              <div className="flex items-center justify-center gap-2 text-red-400">
                <XCircle className="h-4 w-4" />
                <span className="text-sm">Pagamento cancelado</span>
              </div>
            )}

            {/* QR Code */}
            {status === 'pending' && (
              <>
                <Card className="bg-white p-4 flex justify-center">
                  {paymentData.qr_code_base64 ? (
                    <img
                      src={`data:image/png;base64,${paymentData.qr_code_base64}`}
                      alt="QR Code PIX"
                      className="w-64 h-64"
                    />
                  ) : (
                    <div className="w-64 h-64 flex items-center justify-center text-gray-500">
                      QR Code não disponível
                    </div>
                  )}
                </Card>

                {/* Código Copia e Cola */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 text-center">
                    Ou copie o código PIX:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={paymentData.qr_code || ''}
                      readOnly
                      className="flex-1 bg-white/5 border-white/10 rounded px-3 py-2 text-xs text-white font-mono"
                    />
                    <Button
                      onClick={copyPixCode}
                      variant="outline"
                      size="icon"
                      className="border-white/20 hover:bg-white/10"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Instruções */}
                <div className="text-sm text-gray-400 space-y-1 text-center">
                  <p>1. Abra o app do seu banco</p>
                  <p>2. Escaneie o QR Code ou cole o código</p>
                  <p>3. Confirme o pagamento</p>
                </div>
              </>
            )}

            {/* Botões */}
            <div className="flex gap-2">
              {status === 'pending' && (
                <Button
                  onClick={createPayment}
                  variant="outline"
                  className="flex-1 border-white/20 hover:bg-white/10"
                  disabled={loading}
                >
                  Gerar novo QR Code
                </Button>
              )}
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-white/20 hover:bg-white/10"
              >
                Fechar
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-red-400">
            <XCircle className="h-8 w-8 mx-auto mb-2" />
            <p>Erro ao criar pagamento</p>
            <Button
              onClick={createPayment}
              className="mt-4 bg-[#0069FF] hover:bg-[#0069FF]/90"
            >
              Tentar novamente
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

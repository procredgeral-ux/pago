'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    priceCents: 0,
    period: 'forever',
    description: 'Perfect for testing and small projects',
    popular: false,
    features: [
      '1,000 API calls/month',
      '100 calls/day',
      '10 calls/minute',
      'All 6 endpoints',
      'Email support',
      'API documentation',
    ],
    cta: 'Get Started Free',
    href: '/register',
    isPaid: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '$29',
    priceCents: 2900,
    period: '/month',
    description: 'Ideal for small to medium businesses',
    popular: false,
    features: [
      '30,000 API calls/month',
      '1,000 calls/day',
      '60 calls/minute',
      'All 6 endpoints',
      'Priority email support',
      'API documentation',
      'Usage analytics',
    ],
    cta: 'Start Basic Plan',
    href: '/register',
    isPaid: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    priceCents: 9900,
    period: '/month',
    description: 'For growing companies with high volume',
    popular: true,
    features: [
      '300,000 API calls/month',
      '10,000 calls/day',
      '300 calls/minute',
      'All 6 endpoints',
      'Priority support 24/7',
      'Advanced analytics',
      'Webhook integrations',
      'Custom rate limits',
    ],
    cta: 'Start Pro Plan',
    href: '/register',
    isPaid: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$499',
    priceCents: 49900,
    period: '/month',
    description: 'Unlimited access for large organizations',
    popular: false,
    ctaColor: 'bg-[#1D203A] hover:bg-[#2a2d4a] text-white',
    features: [
      'Unlimited API calls',
      'No rate limits',
      'All 6 endpoints',
      'Dedicated support',
      'SLA guarantee 99.9%',
      'Custom integrations',
      'White-label options',
      'Dedicated account manager',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
    href: '/register',
    isPaid: true,
  },
]

export function PricingSection() {
  const [loading, setLoading] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setAuthChecked(true)
    }
    checkAuth()
  }, [])

  const handleCheckout = async (plan: typeof plans[0]) => {
    if (!plan.isPaid) return
    
    // Se não está logado, mostrar modal de autenticação
    if (!user) {
      setSelectedPlan(plan)
      setShowAuthModal(true)
      return
    }
    
    setLoading(true)
    setLoadingPlan(plan.id)
    
    try {
      const response = await fetch('/api/payments/pix/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: plan.id,
          planName: plan.name,
          amount: plan.priceCents,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout')
      }

      const data = await response.json()
      
      // Redirecionar para o checkout do Mercado Pago (produção)
      window.location.href = data.checkout_url
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível iniciar o checkout. Tente novamente.',
        variant: 'destructive',
      })
      setLoading(false)
      setLoadingPlan(null)
    }
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="text-center mb-16">
          <h2 className="text-[45px] font-bold text-[#1D203A] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[18px] text-[#555866] max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include access to all 6 API endpoints.
            <span className="block mt-2 text-sm text-[#0069FF] font-medium">
              💳 Checkout Mercado Pago - Pague com PIX
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-white border-2 rounded-lg shadow-md hover:shadow-xl transition-all ${
                plan.popular ? 'border-[#0069FF] scale-105' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#0069FF] text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4 pt-8">
                <CardTitle className="text-[24px] font-bold text-[#1D203A] mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-2">
                  <span className="text-[42px] font-bold text-[#1D203A]">{plan.price}</span>
                  <span className="text-[16px] text-[#555866]">{plan.period}</span>
                </div>
                <CardDescription className="text-[14px]">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[14px] text-[#555866]">
                      <Check className="w-5 h-5 text-[#0069FF] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.isPaid ? (
                  // Plano pago - verifica auth antes de prosseguir
                  <Button
                    onClick={() => handleCheckout(plan)}
                    disabled={loading && loadingPlan === plan.id}
                    className={`w-full h-12 rounded-md font-semibold ${
                      plan.ctaColor || (plan.popular
                        ? 'bg-[#0069FF] hover:bg-[#0055DD] text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-[#1D203A]')
                    }`}
                  >
                    {loading && loadingPlan === plan.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      plan.cta
                    )}
                  </Button>
                ) : (
                  // Plano free - link para registro
                  <Link href={plan.href} className="block">
                    <Button
                      className={`w-full h-12 rounded-md font-semibold ${
                        plan.popular
                          ? 'bg-[#0069FF] hover:bg-[#0055DD] text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-[#1D203A]'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal de Autenticação */}
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                {selectedPlan?.name ? `Assinar Plano ${selectedPlan.name}` : 'Criar Conta'}
              </DialogTitle>
              <DialogDescription className="text-center">
                Para assinar um plano pago, você precisa criar uma conta ou fazer login.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              <Link href="/register" className="w-full">
                <Button className="w-full bg-[#0069FF] hover:bg-[#0055DD] text-white h-12">
                  Criar Conta Grátis
                </Button>
              </Link>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full h-12">
                  Já tenho conta - Fazer Login
                </Button>
              </Link>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              É rápido, grátis e leva menos de 1 minuto.
            </p>
          </DialogContent>
        </Dialog>

        <div className="text-center">
          <p className="text-[16px] text-[#555866] mb-4">
            Pagamentos processados com segurança pelo Mercado Pago
          </p>
          <p className="text-[14px] text-[#555866]">
            Need a custom plan? <Link href="/register" className="text-[#0069FF] hover:underline font-semibold">Contact our sales team</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

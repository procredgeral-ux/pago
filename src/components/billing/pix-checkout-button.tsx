'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PixPaymentModal } from './pix-payment-modal'

interface PixCheckoutButtonProps {
  planType: 'basic' | 'pro' | 'enterprise'
  planName: string
  amount: number // em centavos (ex: 2900 = R$ 29,00)
  children: React.ReactNode
  className?: string
}

export function PixCheckoutButton({ 
  planType, 
  planName, 
  amount, 
  children,
  className 
}: PixCheckoutButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        {children}
      </Button>

      <PixPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planType={planType}
        planName={planName}
        amount={amount}
      />
    </>
  )
}

'use client'

import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import { SessionSync } from '@/components/session-sync'
import { LoggerInit } from '@/components/logger-init'

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoggerInit />
      <SessionSync />
      {children}
      <Toaster />
    </>
  )
}

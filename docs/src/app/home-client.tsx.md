# home-client.tsx

## Descrição
Componente client-side principal da landing page da BigDataCorp. Contém toda a interface e lógica da página inicial, incluindo hero section, formulário de contato e seções de serviços.

## Funcionalidades Principais
- **Hero Section**: Seção principal com background image e call-to-action
- **Get in Touch Section**: Formulário de captura de leads com telefone
- **Partner Logos**: Exibição de logos de clientes parceiros
- **Services Section**: Apresentação dos serviços da plataforma
- **Process Support**: Explicação do processo de uso
- **Pricing Section**: Tabela de preços e planos

## Estado e Hooks
- **phoneNumber**: Estado para armazenar número de telefone do formulário
- **router**: Hook do Next.js para navegação programática
- **useEffect**: Verificação automática de sessão válida e redirecionamento

## Componentes Utilizados
- LandingHeader (src/components/landing/Header.tsx)
- ProcessSupport (src/components/landing/ProcessSupport.tsx)
- ServicesSection (src/components/landing/ServicesSection.tsx)
- PricingSection (src/components/landing/PricingSection.tsx)
- PhoneInputField (src/components/ui/phone-input.tsx)
- Componentes UI: Button, Card, Input, Label

## Estrutura Visual
### Hero Section
- Background image: "/assets/dashboard.avif"
- Título: "The most revolutionary datatech in the country!"
- Descrição sobre captura e entrega de dados
- CTA button com animação hover

### Get in Touch Section
- Grid layout com formulário e benefícios
- Input de telefone com validação
- Lista de benefícios com checkmarks
- Grid de logos de parceiros (Votorantim, B3, Certisign, VTEX, Azul)

## Validação e Redirecionamento
- Verificação de sessão válida com `hasValidSession()`
- Redirecionamento automático para `/dashboard` se logado
- Proteção contra acesso desnecessário à landing page

## Estilização
- Utiliza Tailwind CSS com cores customizadas
- Design responsivo com breakpoints
- Animações e transições suaves
- Cores da marca: #394afa, #0069FF, #23264A

## Importações
```typescript
import Link from 'next/link'
import Image from 'next/image'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { Input, Label } from '@/components/ui'
import { LandingHeader } from '@/components/landing/Header'
import { ProcessSupport } from '@/components/landing/ProcessSupport'
import { ServicesSection } from '@/components/landing/ServicesSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { PhoneInputField } from '@/components/ui/phone-input'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { hasValidSession } from '@/lib/utils/session'
```

## Performance
- Componente client-side otimizado
- Lazy loading de imagens com Next.js Image
- Estruturação eficiente de componentes

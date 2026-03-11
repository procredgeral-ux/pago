# button.tsx

## Descrição
Componente de botão universal baseado em Radix UI e Tailwind CSS. Implementa o design system da BigDataCorp com múltiplas variantes, tamanhos e estados.

## Funcionalidades
- **Multiple Variants**: Default, destructive, outline, secondary, ghost, link
- **Multiple Sizes**: sm, default, lg, icon
- **AsChild Pattern**: Permite renderizar como outro elemento
- **Loading State**: Suporte a estado de carregamento
- **Accessibility**: Suporte completo a ARIA
- **Type Safety**: Props tipadas com TypeScript

## Propriedades
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}
```

## Variantes Visuais

### default
- Background: primary (#0069FF)
- Text: white
- Hover: darker primary
- Uso: Actions principais

### destructive
- Background: red (#ef4444)
- Text: white
- Hover: darker red
- Uso: Actions destrutivas

### outline
- Background: transparent
- Border: primary
- Text: primary
- Hover: light background
- Uso: Actions secundárias

### secondary
- Background: gray (#f1f5f9)
- Text: gray (#0f172a)
- Hover: darker gray
- Uso: Actions neutras

### ghost
- Background: transparent
- Text: gray
- Hover: light gray
- Uso: Actions sutis

### link
- Background: transparent
- Text: primary
- Hover: underline
- Uso: Links estilizados

## Tamanhos

### sm (small)
- Height: h-8 (32px)
- Padding: px-3
- Text size: text-sm
- Uso: Interfaces compactas

### default
- Height: h-9 (36px)
- Padding: px-4
- Text size: text-sm
- Uso: Padrão do sistema

### lg (large)
- Height: h-10 (40px)
- Padding: px-8
- Text size: text-sm
- Uso: Destaque importante

### icon
- Height: h-9 (36px)
- Width: w-9 (36px)
- Padding: p-0
- Uso: Botões de ícone

## Implementação
```typescript
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
```

## Exemplos de Uso
```typescript
// Botão padrão
<Button>Click me</Button>

// Botão com variante
<Button variant="outline">Cancel</Button>

// Botão grande
<Button size="lg">Large Button</Button>

// Botão de ícone
<Button size="icon">
  <PlusIcon />
</Button>

// Como link (asChild)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

// Com loading state
<Button disabled>Loading...</Button>
```

## Accessibility
- Suporte a screen readers
- Navegação por teclado
- Focus management
- ARIA attributes

## Performance
- Componente otimizado
- CSS classes estáticas
- Minimal re-renders
- Tree-shakeable

## Relacionamento
- Base: Radix UI Slot
- Styling: Tailwind CSS + CVA
- Utils: cn function
- Design: System tokens

## Best Practices
- Usar variantes consistentemente
- Manter hierarquia visual clara
- Adicionar icones quando apropriado
- Considerar estados de loading
- Testar accessibility

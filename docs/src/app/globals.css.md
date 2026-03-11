# globals.css

## Descrição
Arquivo de estilos CSS globais da aplicação utilizando Tailwind CSS com configuração de design system personalizado.

## Funcionalidades
- Importação das diretivas base do Tailwind CSS
- Definição de variáveis CSS customizadas no layer base
- Configuração de paleta de cores completa para o tema light
- Definição de cores para componentes (card, popover, primary, secondary)
- Configuração de cores para elementos de interface (muted, accent, destructive)

## Estrutura de Cores
### Cores Principais
- **Background**: Branco puro (0 0% 100%)
- **Foreground**: Preto suave (222.2 84% 4.9%)
- **Primary**: Azul vibrante (217 91% 60%)
- **Secondary**: Cinza muito claro (220 14% 96%)

### Cores de Componentes
- **Card**: Branco puro com foreground preto suave
- **Popover**: Branco puro com foreground preto suave
- **Muted**: Cinza claro (210 40% 96%)
- **Accent**: Azul claro (210 40% 96%)
- **Destructive**: Vermelho suave (0 84.2% 60.2%)

### Cores de Bordas
- **Border**: Cinza claro (214.3 31.8% 91.4%)
- **Input**: Cinza claro (214.3 31.8% 91.4%)
- **Ring**: Azul primário (217 91% 60%)

## Diretivas Tailwind
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Layer Base
Configuração de variáveis CSS no escopo :root para tema claro, permitindo fácil personalização e manutenção do design system.

## Uso
Este arquivo é importado no layout.tsx e aplica estilos globais a toda aplicação, servindo como base para o sistema de design da BigDataCorp.

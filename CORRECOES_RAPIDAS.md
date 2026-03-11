# 🔧 CORREÇÕES RÁPIDAS - Build Next.js Falhou

## ❌ PROBLEMA 1: API Routes Usando Cookies (Dynamic Server)

**Rotas afetadas:**
- `/api/subscriptions/status/`
- `/api/user/profile/`
- `/api/documentation/` (usa `nextUrl.searchParams`)
- `/api/modules/` (usa `request.url`)

**SOLUÇÃO:** Adicione isto no início de cada arquivo dessas rotas:

```javascript
// app/api/subscriptions/status/route.js
export const dynamic = 'force-dynamic';

export async function GET(request) {
  // seu código aqui
}
```

**OU** para rotas com parâmetros dinâmicos:

```javascript
export const revalidate = 0; // Desabilita cache estático
```

---

## ❌ PROBLEMA 2: Html Component em /404 e /500

**ARQUIVO ERRADO:**
```javascript
// ❌ pages/404.js - ERRADO
import { Html } from 'next/document';

export default function Custom404() {
  return (
    <Html>
      <h1>404</h1>
    </Html>
  );
}
```

**SOLUÇÃO CORRETA:**
```javascript
// ✅ pages/404.js - CORRETO
export default function Custom404() {
  return (
    <div>
      <h1>404 - Página não encontrada</h1>
      <p>A página que você procura não existe.</p>
    </div>
  );
}
```

**Mesma coisa para `/500`:**
```javascript
// ✅ pages/500.js
export default function Custom500() {
  return (
    <div>
      <h1>500 - Erro no servidor</h1>
      <p>Houve um problema. Tente novamente mais tarde.</p>
    </div>
  );
}
```

---

## ⚠️ PROBLEMA 3: DATABASE_URL Não Definida (Aviso Prisma)

Se estiver usando Prisma, certifique-se que:

1. **Variável de ambiente está definida no Railway/deployment:**
   - Vá em: Settings → Variables
   - Adicione: `DATABASE_URL` com a URL do seu banco

2. **Ou em `.env.local` localmente:**
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   ```

3. **Se não usa Prisma no build**, adicione no `next.config.js`:
   ```javascript
   module.exports = {
     typescript: {
       tsc: false // se der erro de Prisma
     }
   }
   ```

---

## 📋 CHECKLIST DE CORREÇÃO

- [ ] Adicionar `export const dynamic = 'force-dynamic'` em TODAS as rotas `/api/*` que usam:
  - `cookies()`
  - `headers()`
  - `request.url`
  - `nextUrl.searchParams`

- [ ] Remover `import { Html } from 'next/document'` dos arquivos `/pages/404.js` e `/pages/500.js`

- [ ] Verificar que essas páginas retornam apenas `<div>` ou componentes normais, não `<Html>`

- [ ] Definir variáveis de ambiente no Railway/Vercel (DATABASE_URL se usar Prisma)

---

## 🚀 DEPOIS DE CORRIGIR

1. Faça commit e push:
   ```bash
   git add .
   git commit -m "fix: dynamic routes and error pages"
   git push
   ```

2. O Railway/deployment vai automaticamente reconstruir e deploy

3. Verifique os logs para confirmar que build passou ✅

---

## 🆘 DÚVIDAS COMUNS

**P: Preciso adicionar `dynamic` em TODAS as rotas?**
R: Só nas que usam `cookies()`, `headers()`, `request.url`, ou `searchParams`. Rotas simples que retornam JSON fixo podem ficar estáticas.

**P: Posso usar `export const revalidate = 0` em vez de `dynamic`?**
R: Sim, faz a mesma coisa nesse contexto.

**P: O que fazer com DATABASE_URL se não uso Prisma?**
R: Se não usa, pode ignorar. É apenas um aviso.

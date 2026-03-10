# Deploy na Railway

Guia completo para fazer deploy do BigDataCorp API Platform na Railway.

## 📋 Pré-requisitos

- Conta na Railway: https://railway.app
- Repositório no GitHub: `procredgeral-ux/pago`
- Projeto já configurado com `railway.toml`

## 🚀 Deploy Automático

### 1. Conectar GitHub na Railway

1. Acesse https://railway.app/dashboard
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Autorize a Railway e escolha o repositório `procredgeral-ux/pago`
5. Clique em **"Deploy"**

A Railway detectará automaticamente o `railway.toml` e fará o deploy.

---

## 🔐 Variáveis de Ambiente (Obrigatórias)

Configure estas variáveis no painel da Railway (**Project > Variables**):

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://rrpmfmqzmtmfuyktltnz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
```

### Mercado Pago (Teste)
```
MP_ACCESS_TOKEN=TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx
MP_PUBLIC_KEY=TEST-xxxxxxxxxxxxxxxxxxxxxxxx
MP_PIX_KEY=sua_chave_pix@email.com
```

### Banco de Dados (Railway Postgres ou externo)
```
DATABASE_URL=postgresql://user:password@host:5432/database
DIRECT_URL=postgresql://user:password@host:5432/database
```

### App
```
NEXT_PUBLIC_APP_URL=https://seu-app.up.railway.app
NODE_ENV=production
```

### Opcionais
```
MP_WEBHOOK_SECRET=whsec_xxxxxxxx  # Se usar webhook validation
UPSTASH_REDIS_URL=                  # Para rate limiting (opcional)
UPSTASH_REDIS_TOKEN=                 # Para rate limiting (opcional)
RESEND_API_KEY=re_xxxxxxxx          # Para emails (opcional)
```

---

## 📁 Arquivos de Configuração

### railway.toml (já criado)
Configurações de build e deploy.

### next.config.js (já atualizado)
- `output: 'standalone'` - Otimizado para containers
- `images.unoptimized: true` - Compatibilidade Railway
- ESLint/TypeScript ignorados em build

---

## 🔄 Comandos Úteis

### Build local (testar antes do deploy)
```bash
npm ci
npx prisma generate
npm run build
npm run start
```

### Acessar logs
Painel Railway > Project > Deployments > Logs

### Reiniciar deploy
Painel Railway > Project > Deployments > Click no deploy > Redeploy

---

## ✅ Checklist Pré-Deploy

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Banco de dados PostgreSQL provisionado (Railway ou externo)
- [ ] Supabase configurado e acessível
- [ ] Mercado Pago credenciais de teste (inicialmente)
- [ ] `railway.toml` no repositório
- [ ] Endpoint `/api/health` funcionando localmente

---

## 🐛 Troubleshooting

### "Build failed"
1. Verifique logs no painel Railway
2. Confirme que `node_modules` está no `.gitignore`
3. Teste build localmente

### "Database connection failed"
1. Verifique `DATABASE_URL` está correto
2. Confirme que Prisma está gerado: `npx prisma generate`
3. Verifique se IP está liberado no banco

### "Cannot find module"
1. Confirme `npx prisma generate` roda no build
2. Verifique se `@prisma/client` está em `dependencies` (não devDependencies)

### Imagens não carregam
- `next.config.js` já configurado com `images.unoptimized: true`
- Railway não suporta otimização de imagens do Next.js

---

## 🔗 Links Úteis

- Railway Dashboard: https://railway.app/dashboard
- Railway Docs: https://docs.railway.app
- Next.js Deploy: https://docs.railway.app/guides/nextjs

---

## 💡 Dicas

1. **Ambiente de Teste**: Use credenciais `TEST-` do Mercado Pago inicialmente
2. **Banco de Dados**: Railway oferece PostgreSQL gratuito - use `railway add --database`
3. **Deploy Automático**: Cada push no `main` dispara novo deploy
4. **Domains**: Railway gera URL automaticamente ou configure domínio customizado

---

**Pronto para deploy! 🚀**

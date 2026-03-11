# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copiar arquivos de dependências primeiro (cache eficiente)
COPY package*.json ./
COPY prisma ./prisma/
COPY postcss.config.* ./
COPY tailwind.config.* ./

# Instalar TODAS as dependências (incluindo dev) para o build
RUN npm ci

# Gerar Prisma Client
RUN npx prisma generate

# Copiar código fonte
COPY . .

# Limpar qualquer cache anterior
RUN rm -rf .next node_modules/.cache

# Build da aplicação
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Produção
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários (modo normal, não standalone)
COPY --from=base --chown=nextjs:nodejs /app/.next ./.next
COPY --from=base --chown=nextjs:nodejs /app/public ./public
COPY --from=base --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=base --chown=nextjs:nodejs /app/package*.json ./
COPY --from=base --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=base --chown=nextjs:nodejs /app/.env ./.env

USER nextjs

EXPOSE 3000

# Usar npm start em vez de node server.js
CMD ["npm", "start"]

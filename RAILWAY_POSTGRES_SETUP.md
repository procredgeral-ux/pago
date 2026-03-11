# ============================================
# Configuração de Banco de Dados - RAILWAY
# ============================================
#
# O Supabase está bloqueando conexões externas do Railway.
# Solução: Usar PostgreSQL nativo do Railway
#
# ============================================
# PASSO A PASSO:
# ============================================
#
# 1. Acesse o Railway Dashboard:
#    https://railway.app/dashboard
#
# 2. Selecione seu projeto "pago" (ou o nome do projeto)
#
# 3. Clique em "New" (botão + no canto superior direito)
#
# 4. Selecione "Database" → "Add PostgreSQL"
#
# 5. Aguarde o Railway provisionar (leva ~1 minuto)
#
# 6. O Railway vai injetar automaticamente a variável:
#    DATABASE_URL=postgresql://... (já configurada)
#
# 7. Adicione também a variável DIRECT_URL com o mesmo valor:
#    - Vá em Variables → New Variable
#    - Name: DIRECT_URL
#    - Value: Copie o mesmo valor do DATABASE_URL
#
# 8. (Opcional) Para ver as credenciais do banco:
#    - Clique no serviço PostgreSQL
#    - Vá em "Connect" → "Available Variables"
#
# 9. O Railway fará redeploy automático!
#
# ============================================
# IMPORTANTE: Migrações do Prisma
# ============================================
#
# Após o banco criar, você precisa rodar as migrações:
#
# Opção 1 - Via Console do Railway:
#   1. Clique no serviço do seu app (não o PostgreSQL)
#   2. Vá em "Deployments" → "Deploy Logs"
#   3. Procure por erros de "table not found"
#   4. Ou use o console para rodar: npx prisma migrate deploy
#
# Opção 2 - Via CLI do Railway (se tiver instalado):
#   railway run npx prisma migrate deploy
#
# ============================================
# TROUBLESHOOTING:
# ============================================
#
# Se der erro de "connection refused":
#   → Verifique se o PostgreSQL está "Running" (não "Deploying")
#
# Se der erro de "database does not exist":
#   → Aguarde mais 1-2 minutos e tente novamente
#
# Se der erro de "permission denied":
#   → As variáveis DATABASE_URL já devem ter as permissões corretas
#
# ============================================

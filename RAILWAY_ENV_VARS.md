# ============================================
# Variáveis obrigatórias no Railway Dashboard
# ============================================
#
# Cole estas variáveis em:
# Railway Dashboard → Seu Projeto → Variables → New Variable
#
# --------------------------------------------
# 1. DATABASE_URL (PostgreSQL do Supabase)
# --------------------------------------------
# Pegue em: https://supabase.com/dashboard/project/aonjvbgfbydkhsfdrpfj/settings/database
# Connection string → URI
#
# Formato:
# DATABASE_URL=postgresql://postgres:[SENHA]@db.aonjvbgfbydkhsfdrpfj.supabase.co:5432/postgres
#
# --------------------------------------------
# 2. DIRECT_URL (mesma coisa)
# --------------------------------------------
# DIRECT_URL=postgresql://postgres:[SENHA]@db.aonjvbgfbydkhsfdrpfj.supabase.co:5432/postgres
#
# --------------------------------------------
# 3. Outras variáveis já devem estar lá:
# --------------------------------------------
# NEXT_PUBLIC_SUPABASE_URL=https://aonjvbgfbydkhsfdrpfj.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
#
# --------------------------------------------
# 4. Mercado Pago (já configurado no .env local)
# --------------------------------------------
# Copie do seu .env local:
# MP_ENVIRONMENT=development
# MP_TEST_ACCESS_TOKEN=TEST-8438376993315530...
# MP_TEST_PUBLIC_KEY=TEST-9d31b528...
# MP_TEST_PIX_KEY=antonidslima@gmail.com
#
# ============================================

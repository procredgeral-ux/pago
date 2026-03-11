# ============================================
# Configuração Supabase PostgreSQL para Railway
# ============================================
# 
# 1. Acesse o Dashboard do Supabase: https://supabase.com/dashboard
# 2. Selecione seu projeto
# 3. Vá em "Project Settings" (engrenagem no canto inferior esquerdo)
# 4. Clique em "Database" na sidebar
# 5. Copie a "Connection string" URI format
#
# Exemplo de DATABASE_URL do Supabase:
# postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
#
# 6. No Railway Dashboard:
#    - Vá em Variables
#    - Adicione DATABASE_URL com a URL copiada
#    - Adicione DIRECT_URL com a mesma URL (ou use Connection Pooler)
#
# NOTA: Para usar Connection Pooler (recomendado para serverless):
# postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
#
# ============================================

# schema.prisma

## Descrição
Schema principal do banco de dados PostgreSQL definindo toda a estrutura da plataforma BigDataCorp. Implementa modelo multi-tenant com gestão de usuários, assinaturas, módulos de API e sistema de créditos.

## Configuração do Banco
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

## Modelos Principais

### User
Representa usuários do sistema com autenticação e permissões.
```prisma
model User {
  id                String       @id
  tenant_id         String
  contractor_id     String
  email             String       @unique
  password_hash     String?
  full_name         String
  avatar_url        String?
  phone             String?
  role              String       @default("user")
  status            String       @default("active")
  email_verified    Boolean      @default(false)
  last_login_at     DateTime?
  last_login_ip     String?
  createdAt         DateTime     @default(now()) @map("created_at")
  updatedAt         DateTime     @updatedAt @map("updated_at")
  function          String?
  credits_available Int          @default(0)
  credits_used      Int          @default(0)
  credits_balance   Int          @default(0)
  plan_type         String       @default("free")
  role_id           String?
  // ...
}
```

### Subscription
Gerencia assinaturas dos contractors com ciclos de faturamento.
```prisma
model Subscription {
  id                    String             @id
  contractor_id         String
  plan_id               String
  asaas_subscription_id String?            @unique
  credits_available     Int                @default(0)
  credits_used          Int                @default(0)
  cycle_start_date      DateTime
  cycle_end_date        DateTime
  status                String             @default("active")
  started_at            DateTime           @default(now())
  cancelled_at          DateTime?
  // ...
}
```

### contractors
Representa empresas/clientes do sistema (multi-tenant).
```prisma
model contractors {
  id                   String               @id
  tenant_id            String
  type                 String
  name                 String
  cpf_cnpj             String               @unique
  email                String
  phone                String?
  address_zip          String?
  address_street       String?
  address_number       String?
  address_complement   String?
  address_neighborhood String?
  address_city         String?
  address_state        String?
  asaas_customer_id    String?              @unique
  status               String               @default("active")
  // ...
}
```

### tenants
Representa organizações principais do sistema SaaS.
```prisma
model tenants {
  id                 String               @id
  name               String
  slug               String               @unique
  logo_url           String?
  primary_color      String               @default("#3b82f6")
  secondary_color    String               @default("#1e40af")
  custom_domain      String?              @unique
  status             String               @default("active")
  settings           Json                 @default("{}")
  // ...
}
```

## Sistema de Módulos de API

### api_modules
Catálogo de módulos de API disponíveis na plataforma.
```prisma
model api_modules {
  id                  String               @id @default(uuid())
  name                String               // "CPF Query", "CNPJ Query"
  slug                String               @unique // "cpf", "cnpj"
  description         String?
  long_description    String?
  category            String               // "Personal Data", "Company Data"
  icon                String?
  endpoint            String               // Path do endpoint
  method              String               @default("GET")
  status              String               @default("active")
  is_visible          Boolean              @default(true)
  is_premium          Boolean              @default(false)
  price_per_query     Int                  @default(1)
  rate_limit_minute   Int                  @default(60)
  rate_limit_day      Int                  @default(1000)
  documentation_url   String?
  example_request     Json?
  example_response    Json?
  required_fields     Json?
  response_fields     Json?
  tags                String[]             @default([])
  display_order       Int                  @default(0)
  total_queries       Int                  @default(0)
  // ...
}
```

### contractor_modules
Relaciona contractors com módulos disponíveis.
```prisma
model contractor_modules {
  id            String      @id @default(uuid())
  contractor_id String
  module_id     String
  is_enabled    Boolean     @default(true)
  custom_limit  Int?
  // ...
}
```

## Sistema de API Keys

### api_keys
Gerencia chaves de API para autenticação.
```prisma
model api_keys {
  id            String    @id @default(uuid())
  user_id       String
  contractor_id String
  name          String
  key_preview   String    // "bdc_abc...xyz"
  key_hash      String    // bcrypt hash
  key_encrypted String?   // Encrypted full key
  permissions   String    @default("read")
  is_active     Boolean   @default(true)
  last_used_at  DateTime?
  // ...
}
```

## Sistema de Logs e Analytics

### module_usage_logs
Registra todas as consultas às APIs.
```prisma
model module_usage_logs {
  id            String      @id @default(uuid())
  module_id     String
  contractor_id String
  user_id       String?
  request_data  Json?
  response_code Int
  response_time Int         // milliseconds
  credits_used  Int         @default(1)
  ip_address    String?
  user_agent    String?
  created_at    DateTime    @default(now())
  // ...
}
```

### daily_metrics
Métricas agregadas por dia.
```prisma
model daily_metrics {
  id                   String   @id
  tenant_id            String
  contractor_id        String
  date                 DateTime @db.Date
  files_processed      Int      @default(0)
  files_successful     Int      @default(0)
  files_failed         Int      @default(0)
  credits_used         Int      @default(0)
  total_file_size      BigInt   @default(0)
  average_process_time Float    @default(0)
  peak_processing_hour Int?
  // ...
}
```

## Sistema de Permissões

### roles
Define papéis no sistema.
```prisma
model roles {
  id          String   @id
  tenant_id   String?
  name        String
  slug        String
  description String?
  is_system   Boolean  @default(false)
  is_active   Boolean  @default(true)
  // ...
}
```

### permissions
Define permissões granulares.
```prisma
model permissions {
  id               String             @id
  resource         String
  action           String
  name             String
  description      String?
  category         String?
  // ...
}
```

## Sistema de Documentação

### api_documentation
Documentação rica dos módulos de API.
```prisma
model api_documentation {
  id              String      @id @default(uuid())
  module_id       String?
  title           String
  slug            String      @unique
  content         String      @db.Text // Markdown
  description     String?
  category        String      @default("General")
  order           Int         @default(0)
  is_published    Boolean     @default(true)
  is_featured     Boolean     @default(false)
  tags            String[]    @default([])
  views           Int         @default(0)
  // ...
}
```

## Índices e Performance
- Índices otimizados para queries frequentes
- Composite indexes para buscas complexas
- Unique constraints para integridade
- Foreign keys para relacionamentos

## Row Level Security (RLS)
- Todas as tabelas com RLS habilitado
- Acesso baseado em tenant_id
- Isolamento de dados entre contractors
- Segurança em nível de linha

## Migrações
- Schema versionado
- Migrações incrementais
- Rollback support
- Data seeding

## Relacionamentos
- Multi-tenant hierarchy (tenants -> contractors -> users)
- Subscription management
- Module marketplace
- Usage tracking
- Permission system

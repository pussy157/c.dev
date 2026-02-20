# C++ Master — Curso + Plataforma (Vite/React)

Este projeto é uma plataforma de curso em módulos com:
- progresso local (localStorage)
- bloqueio de tópicos/módulos
- quizzes finais por módulo
- projetos obrigatórios com upload de print
- (opcional) Supabase: login + banco de dados + dashboard admin

## Rodar local
```bash
npm install
npm run dev
```

## Modo offline (sem Supabase)
Se você não configurar as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`, o app roda em **modo offline**:
- usa o conteúdo local em `src/data/*`
- login/admin ficam indisponíveis

## Modo online (com Supabase)
### 1) Criar projeto e aplicar schema
1. Crie um projeto no Supabase
2. Abra o SQL Editor
3. Rode o arquivo: `supabase/schema.sql`

### 2) Configurar Auth
Em Authentication:
- Providers: habilite **Google**
- Settings: (opcional) habilite **Email confirmations**

### 3) Variáveis de ambiente
Crie um `.env` na raiz:

```env
VITE_SUPABASE_URL=SEU_URL
VITE_SUPABASE_ANON_KEY=SUA_ANON_KEY
```

### 4) Criar admin (email real)
1. Crie sua conta em `/signup` (ou via Google).
2. Pegue seu UUID em Authentication → Users.
3. Rode no SQL Editor:

```sql
update public.profiles set role='admin' where id='SEU_UUID';
```

Agora `/admin` libera o dashboard para criar módulos e tópicos no banco.

## Dashboard Admin
- URL: `/admin`
- Cria módulos e tópicos (lesson/project/quiz)
- Para tópicos do banco, o conteúdo é **Markdown**.

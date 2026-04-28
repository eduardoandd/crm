// Aplica as migrations em sequência via DATABASE_URL (pg direto)
// Uso: node supabase/apply.mjs
// Requer: DATABASE_URL no .env.local
// Formato: postgresql://postgres:[SENHA]@db.xbgvqmsxbqwmrythkxld.supabase.co:5432/postgres

import { readFileSync } from 'fs'
import { createInterface } from 'readline'

const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [k, ...v] = line.split('=')
    if (k && v.length) acc[k.trim()] = v.join('=').trim()
    return acc
  }, {})

const DATABASE_URL = env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌  DATABASE_URL não encontrada no .env.local')
  console.error('   Adicione: DATABASE_URL=postgresql://postgres:[SENHA]@db.xbgvqmsxbqwmrythkxld.supabase.co:5432/postgres')
  console.error('   Senha disponível em: Supabase Dashboard → Settings → Database → Connection string')
  process.exit(1)
}

const { default: pg } = await import('pg').catch(() => {
  console.error('❌  Pacote "pg" não encontrado. Instale com: npm install pg')
  process.exit(1)
})

const migrations = [
  '001_init_schema.sql',
  '002_rls_policies.sql',
  '003_triggers.sql',
]

const client = new pg.Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
  console.log('✓  Conectado ao banco\n')

  for (const file of migrations) {
    const sql = readFileSync(new URL(`./migrations/${file}`, import.meta.url), 'utf8')
    process.stdout.write(`→  Aplicando ${file} ... `)
    await client.query(sql)
    console.log('✓')
  }

  console.log('\n✅  Todas as migrations aplicadas com sucesso.')
} catch (err) {
  console.error('\n❌  Erro:', err.message)
  process.exit(1)
} finally {
  await client.end()
}

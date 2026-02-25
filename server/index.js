import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT ? Number(process.env.PORT) : 5174
const DB_PATH = path.join(__dirname, 'db.json')
const DIST_PATH = path.join(__dirname, '..', 'catalog-app', 'dist')

async function readDb() {
  const raw = await fs.readFile(DB_PATH, 'utf-8')
  const parsed = JSON.parse(raw)
  if (!parsed || typeof parsed !== 'object') throw new Error('Invalid db.json')
  if (!Array.isArray(parsed.categories)) parsed.categories = []
  if (!Array.isArray(parsed.items)) parsed.items = []
  return parsed
}

async function writeDb(nextDb) {
  const tmpPath = `${DB_PATH}.tmp`
  const json = `${JSON.stringify(nextDb, null, 2)}\n`
  await fs.writeFile(tmpPath, json, 'utf-8')
  await fs.rename(tmpPath, DB_PATH)
}

function badRequest(res, message) {
  return res.status(400).json({ error: message })
}

const app = express()
app.use(express.json({ limit: '1mb' }))

app.get('/api/db', async (_req, res) => {
  try {
    const db = await readDb()
    res.json(db)
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to read db' })
  }
})

app.post('/api/categories', async (req, res) => {
  const { id, name, description, color } = req.body || {}
  if (!id || !name || !description) {
    return badRequest(res, 'Missing required fields: id, name, description')
  }

  try {
    const db = await readDb()
    const exists = db.categories.some(
      (c) => String(c.id).toLowerCase() === String(id).toLowerCase()
    )
    if (exists) return badRequest(res, 'Category id already exists')

    const category = {
      id: String(id).trim(),
      name: String(name).trim(),
      description: String(description).trim(),
      color: color ? String(color) : '#eff6ff',
    }

    db.categories.push(category)
    await writeDb(db)
    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to create category' })
  }
})

app.delete('/api/categories/:id', async (req, res) => {
  const { id } = req.params
  try {
    const db = await readDb()
    const before = db.categories.length
    db.categories = db.categories.filter((c) => c.id !== id)
    const deleted = db.categories.length !== before
    if (!deleted) return res.status(404).json({ error: 'Category not found' })

    db.items = db.items.filter((i) => i.categoryId !== id)
    await writeDb(db)
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to delete category' })
  }
})

app.post('/api/items', async (req, res) => {
  const {
    id,
    name,
    categoryId,
    priceUsd,
    priceArs,
    image,
    highlight,
    accent,
    videoUrl,
  } = req.body || {}

  if (
    !id ||
    !name ||
    !categoryId ||
    priceUsd == null ||
    priceArs == null ||
    !image ||
    !highlight ||
    !accent ||
    !videoUrl
  ) {
    return badRequest(
      res,
      'Missing required fields: id, name, categoryId, priceUsd, priceArs, image, highlight, accent, videoUrl'
    )
  }

  const numericUsd = Number(priceUsd)
  const numericArs = Number(priceArs)
  if (!Number.isFinite(numericUsd) || numericUsd <= 0) {
    return badRequest(res, 'Invalid priceUsd')
  }
  if (!Number.isFinite(numericArs) || numericArs <= 0) {
    return badRequest(res, 'Invalid priceArs')
  }

  try {
    const db = await readDb()
    const itemExists = db.items.some((i) => i.id === id)
    if (itemExists) return badRequest(res, 'Item id already exists')

    const categoryExists = db.categories.some((c) => c.id === categoryId)
    if (!categoryExists) return badRequest(res, 'categoryId does not exist')

    const item = {
      id: String(id).trim(),
      name: String(name).trim(),
      categoryId: String(categoryId),
      priceUsd: numericUsd,
      priceArs: numericArs,
      image: String(image).trim(),
      highlight: String(highlight).trim(),
      accent: String(accent).trim(),
      videoUrl: String(videoUrl).trim(),
    }

    db.items.push(item)
    await writeDb(db)
    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to create item' })
  }
})

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params
  try {
    const db = await readDb()
    const before = db.items.length
    db.items = db.items.filter((i) => i.id !== id)
    const deleted = db.items.length !== before
    if (!deleted) return res.status(404).json({ error: 'Item not found' })
    await writeDb(db)
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to delete item' })
  }
})

app.use(express.static(DIST_PATH))

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Frontend not built. Run: cd catalog-app && npm run build')
    }
  })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`)
})


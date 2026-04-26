import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import FirestoreService from './FirestoreService.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT ? Number(process.env.PORT) : 5174
const DB_PATH = path.join(__dirname, 'db.json')
const DIST_PATH = path.join(__dirname, '..', 'catalog-app', 'dist')



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
    const sheets = await FirestoreService.getAll("sheets")
    const categories = await FirestoreService.getAll("categories")
    res.json({items:sheets, categories:categories})
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

    const category = {
      id: String(id).trim(),
      name: String(name).trim(),
      description: String(description).trim(),
      color: color ? String(color) : '#eff6ff',
    }

    const response = await FirestoreService.createWithCustomId("categories", id, category)
    res.status(201).json(response)

  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to create category' })
  }
})

app.delete('/api/categories/:id', async (req, res) => {
  const { id } = req.params
  try {
    await FirestoreService.delete("categories", id)
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
    discountUsd,
    discountArs,
    image,
    image2,
    image3,
    highlight,
    accent,
    videoUrl,
  } = req.body || {}
  console.log(req.body)
  const images = [image,image2,image3]
  const cleanImages = images.filter(item => item !== null && item !== undefined);


  if (
    !id ||
    !name ||
    !categoryId ||
    priceUsd == null ||
    priceArs == null ||
    cleanImages.length == 0 ||
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


    const item = {
      id: String(id).trim(),
      name: String(name).trim(),
      categoryId: String(categoryId),
      priceUsd: numericUsd,
      priceArs: numericArs,
      images: cleanImages.map((img) => String(img).trim()),
      highlight: String(highlight).trim(),
      accent: String(accent).trim(),
      videoUrl: String(videoUrl).trim(),
    }

    if (discountUsd && discountArs) {
      const numDiscUsd = Number(discountUsd)
      const numDiscArs = Number(discountArs)
      if (Number.isFinite(numDiscUsd) && numDiscUsd > 0 && Number.isFinite(numDiscArs) && numDiscArs > 0) {
        item.discountUsd = numDiscUsd
        item.discountArs = numDiscArs
      }
    } else if (discountUsd === '' || discountArs === '' || discountUsd === null || discountArs === null) {
      item.discountUsd = null
      item.discountArs = null
    }

    await FirestoreService.createWithCustomId("sheets", item.id, item)
    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to create item' })
  }
})

app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params
  const {
    name,
    categoryId,
    priceUsd,
    priceArs,
    discountUsd,
    discountArs,
    highlight,
    accent,
    videoUrl,
  } = req.body || {}

  if (
    !name ||
    !categoryId ||
    priceUsd == null ||
    priceArs == null ||
    !highlight ||
    !accent ||
    !videoUrl
  ) {
    return badRequest(
      res,
      'Missing required fields: name, categoryId, priceUsd, priceArs, highlight, accent, videoUrl'
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
    const updatedItem = {
      name: String(name).trim(),
      categoryId: String(categoryId),
      priceUsd: numericUsd,
      priceArs: numericArs,
      highlight: String(highlight).trim(),
      accent: String(accent).trim(),
      videoUrl: String(videoUrl).trim(),
    }

    if (discountUsd && discountArs) {
      const numDiscUsd = Number(discountUsd)
      const numDiscArs = Number(discountArs)
      if (Number.isFinite(numDiscUsd) && numDiscUsd > 0 && Number.isFinite(numDiscArs) && numDiscArs > 0) {
        updatedItem.discountUsd = numDiscUsd
        updatedItem.discountArs = numDiscArs
      }
    } else if (discountUsd === '' || discountArs === '' || discountUsd === null || discountArs === null) {
      // Clear out discounts if they were removed
      updatedItem.discountUsd = null
      updatedItem.discountArs = null
    }

    await FirestoreService.update("sheets", id, updatedItem)
    res.json({ id, ...updatedItem })
  } catch (error) {
    res.status(500).json({ error: error?.message || 'Failed to update item' })
  }
})

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params
  try {
    await FirestoreService.delete("sheets", id)
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


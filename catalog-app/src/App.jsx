import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Stack,
} from '@mui/material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import LandingPage from './pages/LandingPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import {
  fetchDb,
  createCategory,
  deleteCategory as apiDeleteCategory,
  createItem,
  deleteItem as apiDeleteItem,
} from './api.js'

const seedCategories = [
  {
    id: 'finances',
    name: 'Finanzas',
    description: 'Control total de tus finanzas personales y de negocio.',
    color: '#eef2ff',
  },
  {
    id: 'personal-expenses',
    name: 'Gastos personales',
    description: 'Sigue al detalle tus gastos del día a día.',
    color: '#ecfeff',
  },
  {
    id: 'planning',
    name: 'Planificación',
    description: 'Organiza tus metas, rutinas y proyectos.',
    color: '#fefce8',
  },
]

const seedItems = [
  {
    id: 'sheet-001',
    name: 'Dashboard financiero mensual',
    categoryId: 'finances',
    priceUsd: 19,
    priceArs: 19900,
    image:
      'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Ideal para freelancers y pequeños negocios',
    accent: 'Incluye gráficos listos para usar',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'sheet-002',
    name: 'Control de gastos personales',
    categoryId: 'personal-expenses',
    priceUsd: 12,
    priceArs: 12900,
    image:
      'https://images.pexels.com/photos/4386324/pexels-photo-4386324.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Perfecto para entender a dónde va tu dinero',
    accent: 'Alertas visuales por categoría',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'sheet-003',
    name: 'Planificador semanal premium',
    categoryId: 'planning',
    priceUsd: 9,
    priceArs: 9900,
    image:
      'https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Diseñado para creadores y estudiantes',
    accent: 'Vista limpia y minimalista',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 'sheet-004',
    name: 'Control de suscripciones',
    categoryId: 'personal-expenses',
    priceUsd: 8,
    priceArs: 8900,
    image:
      'https://images.pexels.com/photos/6303684/pexels-photo-6303684.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Evita pagos sorpresa cada mes',
    accent: 'Recordatorios de renovación',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
]

function App() {
  const location = useLocation()
  const [categories, setCategories] = useState(seedCategories)
  const [items, setItems] = useState(seedItems)

  const refreshDb = async () => {
    const db = await fetchDb()
    setCategories(db.categories || [])
    setItems(db.items || [])
  }

  useEffect(() => {
    refreshDb().catch(() => {
      // If the API isn't running yet, keep seed data.
    })
  }, [])

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== '/') return
    const target = document.getElementById(sectionId)
    if (!target) return

    const appBarOffset = 80
    const rect = target.getBoundingClientRect()
    const offsetTop = rect.top + window.scrollY - appBarOffset

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    })
  }

  const addCategory = async (category) => {
    await createCategory(category)
    await refreshDb()
  }

  const deleteCategory = async (id) => {
    await apiDeleteCategory(id)
    await refreshDb()
  }

  const addItem = async (item) => {
    await createItem(item)
    await refreshDb()
  }

  const deleteItem = async (id) => {
    await apiDeleteItem(id)
    await refreshDb()
  }

  const categoryStats = useMemo(
    () =>
      categories.map((cat) => ({
        ...cat,
        itemCount: items.filter((i) => i.categoryId === cat.id).length,
      })),
    [categories, items]
  )

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(18px)',
          background:
            'linear-gradient(to right, rgba(15,23,42,0.92), rgba(30,64,175,0.92))',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'secondary.main',
                boxShadow: '0 0 0 2px rgba(15,23,42,0.3)',
              }}
            >
              <ShoppingBagIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  textTransform: 'uppercase',
                  fontSize: { xs: 14, sm: 16 },
                }}
              >
                tu plantilla perfecta
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.7, display: { xs: 'none', sm: 'block' } }}
              >
                Plantillas de hojas de cálculo listas para usar
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              color="inherit"
              onClick={() => handleScrollToSection('catalog-section')}
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Catálogo
            </Button>
            <Button
              color="inherit"
              onClick={() => handleScrollToSection('about-section')}
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Quiénes somos
            </Button>
            <Button
              color="inherit"
              onClick={() => handleScrollToSection('faq-section')}
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Preguntas frecuentes
            </Button>
            <Button
              color="inherit"
              onClick={() => handleScrollToSection('contact-section')}
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Contáctanos
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage categories={categoryStats} items={items} />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPage
                categories={categories}
                items={items}
                onAddCategory={addCategory}
                onDeleteCategory={deleteCategory}
                onAddItem={addItem}
                onDeleteItem={deleteItem}
              />
            }
          />
        </Routes>
      </Container>
    </Box>
  )
}

export default App


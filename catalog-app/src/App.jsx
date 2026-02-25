import React, { useMemo, useState } from 'react'
import { Routes, Route, Link as RouterLink } from 'react-router-dom'
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LandingPage from './pages/LandingPage.jsx'
import AdminPage from './pages/AdminPage.jsx'

const initialCategories = [
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

const initialItems = [
  {
    id: 'sheet-001',
    name: 'Dashboard financiero mensual',
    categoryId: 'finances',
    price: 19,
    image:
      'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Ideal para freelancers y pequeños negocios',
    accent: 'Incluye gráficos listos para usar',
  },
  {
    id: 'sheet-002',
    name: 'Control de gastos personales',
    categoryId: 'personal-expenses',
    price: 12,
    image:
      'https://images.pexels.com/photos/4386324/pexels-photo-4386324.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Perfecto para entender a dónde va tu dinero',
    accent: 'Alertas visuales por categoría',
  },
  {
    id: 'sheet-003',
    name: 'Planificador semanal premium',
    categoryId: 'planning',
    price: 9,
    image:
      'https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Diseñado para creadores y estudiantes',
    accent: 'Vista limpia y minimalista',
  },
  {
    id: 'sheet-004',
    name: 'Control de suscripciones',
    categoryId: 'personal-expenses',
    price: 8,
    image:
      'https://images.pexels.com/photos/6303684/pexels-photo-6303684.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlight: 'Evita pagos sorpresa cada mes',
    accent: 'Recordatorios de renovación',
  },
]

function App() {
  const [categories, setCategories] = useState(initialCategories)
  const [items, setItems] = useState(initialItems)

  const addCategory = (category) => {
    setCategories((prev) => [...prev, category])
  }

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setItems((prev) => prev.filter((i) => i.categoryId !== id))
  }

  const addItem = (item) => {
    setItems((prev) => [...prev, item])
  }

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
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
              component={RouterLink}
              to="/"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Catálogo
            </Button>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<AdminPanelSettingsIcon />}
              component={RouterLink}
              to="/admin"
              size="small"
            >
              Admin
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


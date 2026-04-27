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
  updateItem as apiUpdateItem,
  deleteItem as apiDeleteItem,
} from './api.js'


function App() {
  const location = useLocation()
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])

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

  const updateItem = async (id, item) => {
    await apiUpdateItem(id, item)
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
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF' }}>
      <AppBar
        position="sticky"
        elevation={0}   
        color="white"
        sx={{
          color: "white",
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(18px)',
          background:
            'linear-gradient(to right, #2E7D32, #1B5E20)',
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
              src= "./LOGO_-_TPP_-_SIN_CIRCULO_-_SOLO_SIGLAS.svg"
              alt= "Logo"
              sx={{
                width: 40,
                height: 40,
                borderRadius: 0,
                

              }}
              imgProps={{
                style: {
                  objectFit: 'contain', 
                }
              }}
            >
              <ShoppingBagIcon fontSize="small"  alt="Logo" />
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

      <Container  maxWidth="lg" bgcolor="#EFE6DD" sx={{ py: { xs: 4, md: 6 } }} >
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
                onUpdateItem={updateItem}
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


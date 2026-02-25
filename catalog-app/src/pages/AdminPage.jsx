import React, { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LockIcon from '@mui/icons-material/Lock'
import AddIcon from '@mui/icons-material/Add'

const ADMIN_USER = 'admin'
const ADMIN_PASSWORD = 'admin123'

function AdminPage({
  categories,
  items,
  onAddCategory,
  onDeleteCategory,
  onAddItem,
  onDeleteItem,
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')
  const [newCategoryDescription, setNewCategoryDescription] = useState('')

  const [newItemName, setNewItemName] = useState('')
  const [newItemCategoryId, setNewItemCategoryId] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')
  const [newItemImage, setNewItemImage] = useState('')
  const [newItemHighlight, setNewItemHighlight] = useState('')
  const [newItemAccent, setNewItemAccent] = useState('')

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Usuario o contraseña incorrectos.')
    }
  }

  const handleCreateCategory = (event) => {
    event.preventDefault()
    if (!newCategoryId || !newCategoryName) return

    const exists = categories.some(
      (cat) => cat.id.toLowerCase() === newCategoryId.toLowerCase()
    )
    if (exists) return

    onAddCategory({
      id: newCategoryId.trim(),
      name: newCategoryName.trim(),
      description: newCategoryDescription.trim(),
      color: '#eff6ff',
    })

    setNewCategoryId('')
    setNewCategoryName('')
    setNewCategoryDescription('')
  }

  const handleCreateItem = (event) => {
    event.preventDefault()
    if (!newItemName || !newItemCategoryId || !newItemPrice) return

    const numericPrice = Number(newItemPrice)
    if (Number.isNaN(numericPrice) || numericPrice <= 0) return

    const idBase = newItemName.toLowerCase().replace(/\s+/g, '-')
    const uniqueSuffix = String(Date.now()).slice(-4)
    const newId = `${idBase}-${uniqueSuffix}`

    onAddItem({
      id: newId,
      name: newItemName.trim(),
      categoryId: newItemCategoryId,
      price: numericPrice,
      image:
        newItemImage ||
        'https://images.pexels.com/photos/669609/pexels-photo-669609.jpeg?auto=compress&cs=tinysrgb&w=1200',
      highlight:
        newItemHighlight ||
        'Descripción breve sobre para quién es esta plantilla.',
      accent:
        newItemAccent ||
        'Añade un beneficio concreto o una característica destacada.',
    })

    setNewItemName('')
    setNewItemCategoryId('')
    setNewItemPrice('')
    setNewItemImage('')
    setNewItemHighlight('')
    setNewItemAccent('')
  }

  const categoryWithCounts = useMemo(
    () =>
      categories.map((cat) => ({
        ...cat,
        itemCount: items.filter((i) => i.categoryId === cat.id).length,
      })),
    [categories, items]
  )

  if (!isAuthenticated) {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow:
                '0 30px 70px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(148, 163, 184, 0.4)',
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2.5,
                background:
                  'radial-gradient(circle at 0% 0%, #4f46e5, transparent 60%), radial-gradient(circle at 100% 100%, #f97316, transparent 55%)',
                color: '#f9fafb',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'rgba(15,23,42,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 0 2px rgba(191, 219, 254, 0.7)',
                  }}
                >
                  <LockIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: 'uppercase', letterSpacing: 1.4 }}
                  >
                    Panel privado
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Acceso administrador
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Inicia sesión para crear nuevas plantillas y organizar las
                categorías del catálogo.
              </Typography>
              <Box component="form" onSubmit={handleLoginSubmit} noValidate>
                <Stack spacing={2.5}>
                  <TextField
                    label="Usuario"
                    fullWidth
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                  />
                  <TextField
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPassword((previous) => !previous)
                            }
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    helperText="Demo: admin / admin123"
                  />
                  {loginError && (
                    <Typography
                      variant="body2"
                      sx={{ color: 'error.main', mt: -1 }}
                    >
                      {loginError}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disableElevation
                    startIcon={<LockIcon />}
                  >
                    Entrar
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Stack spacing={3}>
          <Card>
            <CardContent sx={{ pb: 1.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Crear categoría
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: 'text.secondary' }}
              >
                Agrupa tus plantillas en temas como finanzas, gastos personales
                o planificación.
              </Typography>
              <Box component="form" onSubmit={handleCreateCategory}>
                <Stack spacing={2.5}>
                  <TextField
                    label="ID de la categoría"
                    value={newCategoryId}
                    onChange={(event) => setNewCategoryId(event.target.value)}
                    helperText="Usa algo corto y sin espacios. Ej: finances"
                    fullWidth
                  />
                  <TextField
                    label="Nombre visible"
                    value={newCategoryName}
                    onChange={(event) => setNewCategoryName(event.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Descripción"
                    value={newCategoryDescription}
                    onChange={(event) =>
                      setNewCategoryDescription(event.target.value)
                    }
                    fullWidth
                    multiline
                    minRows={2}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    startIcon={<AddIcon />}
                  >
                    Añadir categoría
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ pb: 1.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Crear plantilla
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: 'text.secondary' }}
              >
                Añade una nueva hoja al catálogo. Puedes dejar algunos campos en
                blanco y completarlos más tarde.
              </Typography>
              <Box component="form" onSubmit={handleCreateItem}>
                <Stack spacing={2.5}>
                  <TextField
                    label="Nombre de la plantilla"
                    value={newItemName}
                    onChange={(event) => setNewItemName(event.target.value)}
                    fullWidth
                  />
                  <TextField
                    select
                    label="Categoría"
                    value={newItemCategoryId}
                    onChange={(event) =>
                      setNewItemCategoryId(event.target.value)
                    }
                    fullWidth
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Precio"
                    type="number"
                    value={newItemPrice}
                    onChange={(event) => setNewItemPrice(event.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">€</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="URL de imagen (opcional)"
                    value={newItemImage}
                    onChange={(event) => setNewItemImage(event.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Mensaje principal (opcional)"
                    value={newItemHighlight}
                    onChange={(event) =>
                      setNewItemHighlight(event.target.value)
                    }
                    fullWidth
                    multiline
                    minRows={2}
                  />
                  <TextField
                    label="Beneficio extra (opcional)"
                    value={newItemAccent}
                    onChange={(event) => setNewItemAccent(event.target.value)}
                    fullWidth
                    multiline
                    minRows={2}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    startIcon={<AddIcon />}
                  >
                    Añadir plantilla
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Grid>

      <Grid item xs={12} md={7}>
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Categorías
                </Typography>
                <Chip
                  label={`${categories.length} categorías`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                {categoryWithCounts.map((category) => (
                  <Stack
                    key={category.id}
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{
                      p: 1.2,
                      borderRadius: 2,
                      bgcolor: 'rgba(15,23,42,0.02)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 40,
                        borderRadius: 999,
                        bgcolor: 'primary.main',
                        opacity: 0.2,
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 0.3 }}
                      >
                        {category.name}{' '}
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: 'text.secondary', ml: 0.5 }}
                        >
                          ({category.id})
                        </Typography>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', fontSize: 13 }}
                      >
                        {category.description || 'Sin descripción.'}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${category.itemCount} ${
                        category.itemCount === 1 ? 'plantilla' : 'plantillas'
                      }`}
                      size="small"
                      color="default"
                    />
                    <IconButton
                      color="error"
                      onClick={() => onDeleteCategory(category.id)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                ))}
                {categoryWithCounts.length === 0 && (
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}
                  >
                    Aún no hay categorías creadas.
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Plantillas
                </Typography>
                <Chip
                  label={`${items.length} plantillas`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                {items.map((item) => {
                  const categoryName =
                    categories.find((category) => category.id === item.categoryId)
                      ?.name || 'Sin categoría'

                  return (
                    <Stack
                      key={item.id}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        p: 1.2,
                        borderRadius: 2,
                        bgcolor: 'rgba(15,23,42,0.02)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 40,
                          borderRadius: 1.5,
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 0.2 }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.secondary', fontSize: 12 }}
                        >
                          {categoryName} · {item.price.toFixed(0)}€
                        </Typography>
                      </Box>
                      <IconButton
                        color="error"
                        onClick={() => onDeleteItem(item.id)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  )
                })}
                {items.length === 0 && (
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}
                  >
                    Aún no hay plantillas en el catálogo.
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default AdminPage


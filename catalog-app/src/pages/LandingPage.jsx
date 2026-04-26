import React, { useMemo, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Stack,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
  TextField,
  MenuItem,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ProductModal from '../components/ProductModal'
import ProductCard from '../components/ProductCard'

function LandingPage({ categories, items }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openItem, setOpenItem] = useState(null)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const formatArs = useMemo(
    () =>
      new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
      }),
    []
  )
  const formatUsd = useMemo(
    () =>
      new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }),
    []
  )

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items
    return items.filter((item) => item.categoryId === selectedCategory)
  }, [items, selectedCategory])

  const activeCategory =
    selectedCategory === 'all'
      ? null
      : categories.find((c) => c.id === selectedCategory)

  const handleOpenItem = (item) => {
    setOpenItem(item)
  }

  const handleCloseItem = () => {
    setOpenItem(null)
  }

  const dummyVideoUrl =
    openItem?.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'

  const handleWhatsAppCompra = () => {
    if (!openItem) return
    const text = encodeURIComponent(
      `Hola! Me interesa la plantilla "${openItem.name}" que vi en tuplantillaperfecta. Precio: ${formatUsd.format(
        openItem.priceUsd
      )} USD / ${formatArs.format(openItem.priceArs)} ARS.`
    )
    window.open(`https://wa.me/5491164799746?text=${text}`, '_blank')
  }

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 3, md: 5 }}
        alignItems="center"
        sx={{
          mb: { xs: 5, md: 8 },
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Stack 
            spacing={2.5} 
            sx={{ 
              display: 'flex', 
              alignItems: { xs: 'center', sm: 'flex-start' }, 
              textAlign: { xs: 'center', sm: 'left' } 
            }}
          >

            <Chip
              label="Plantillas de hojas de cálculo"
              color="secondary"
              variant="filled"
              sx={{
                backgroundColor:"#FFC107",
                alignSelf: { xs: 'center', sm: 'flex-start' },
                fontWeight: 600,
                boxShadow: '0 10px 30px rgba(248, 113, 113, 0.25)',
              }}
            />
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 30, md: 40 },
                fontWeight: 800,
                letterSpacing: -0.5,
                display:"flex",

                '@media (max-width: 1024px)': {
                  fontSize: { xs: 23, md: 30 },

                },
                

                '@media (max-width: 612px)': {
                  display: 'flex',
                  flexDirection:'column',
                  fontSize: { xs: 23, md: 24 },

                },
                '@media (max-width: 400px)': {

                  fontSize: { xs: 21, md: 24 },

                },
               
              }}
            >
              Tu sistema en una hoja:
              <br />
              <Box component="span" sx={{ color: '#2196F3',marginLeft:"15px" }}>
                Tu plantilla perfecta
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: 14, md: 16 },
              }}
            >
              Explora plantillas listas para usar para tus finanzas, gastos
              personales y planificación. Sólo duplica, personaliza y empieza a
              ahorrar tiempo.
            </Typography>

            {/* Mobile-only "Ver catálogo" CTA */}
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                const el = document.getElementById('catalog-section')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              sx={{
                display: { xs: 'inline-flex', sm: 'none' },
                alignSelf: 'center',
                px: 4,
                py: 1.4,
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 15,
                background: 'linear-gradient(to right, #2E7D32, #1B5E20)',
                color: 'white',
                boxShadow: '0 8px 20px rgba(27,94,32,0.25)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(27,94,32,0.35)',
                },
                transition: 'all 0.2s',
              }}
            >
              Ver catálogo
            </Button>

            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  pr: 2,
                  borderRadius: 999,
                  bgcolor: 'rgba(15,23,42,0.04)',
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle at 30% 30%, #f97316, #4f46e5)',
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Diseñadas para verse increíbles en cualquier dispositivo
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Box id="catalog-section" sx={{ mb: 6 }}>
        <Box sx={{ mb: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Catálogo de plantillas
            </Typography>

            <Box sx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }}>
              <TextField
                select
                fullWidth
                size="small"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="all">Todas</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name} {c.itemCount ? `(${c.itemCount})` : ''}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Chip
                label="Todas"
                clickable
                color={selectedCategory === 'all' ? 'primary' : 'default'}
                variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                onClick={() => setSelectedCategory('all')}
              />
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  label={`${category.name} ${
                    category.itemCount ? `(${category.itemCount})` : ''
                  }`}
                  clickable
                  onClick={() => setSelectedCategory(category.id)}
                  color={
                    selectedCategory === category.id ? 'primary' : 'default'
                  }
                  variant={
                    selectedCategory === category.id ? 'filled' : 'outlined'
                  }
                  sx={{
                    bgcolor:
                      selectedCategory === category.id
                        ? undefined
                        : category.color,
                  }}
                />
              ))}
            </Stack>
          </Stack>

          {activeCategory && (
            <Box
              sx={{
                mb: 3,
                p: 1.5,
                borderRadius: 3,
                bgcolor: activeCategory.color || 'rgba(248, 250, 252, 0.9)',
                border: '1px solid rgba(148, 163, 184, 0.5)',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {activeCategory.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {activeCategory.description}
              </Typography>
            </Box>
          )}
        </Box>

        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 360px))', 
            justifyContent: 'center', 
            gap: 3 
          }}
        >
          {filteredItems.map((item) => (
            <Box key={item.id} sx={{ display: 'flex' }}>
              <ProductCard
                item={item}
                onClick={() => handleOpenItem(item)}
                formatUsd={formatUsd}
                formatArs={formatArs}
              />
            </Box>
          ))}

          {filteredItems.length === 0 && (
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: 'rgba(248, 250, 252, 0.9)',
                  border: '1px dashed rgba(148, 163, 184, 0.6)',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Aún no hay plantillas en esta categoría
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Añade nuevas hojas desde el panel de administrador.
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>



      <Box id="faq-section" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
          Preguntas frecuentes
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 2, maxWidth: 520 }}
        >
          Algunas dudas típicas antes de elegir tu plantilla perfecta. Más
          adelante podrás ajustar estas preguntas y respuestas a tu proyecto.
        </Typography>

        <Stack spacing={1.2}>
          <Accordion disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-panel-1-content"
              id="faq-panel-1-header"
            >
              <Typography variant="subtitle2">
                ¿En qué programas puedo usar las plantillas?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Están pensadas para funcionar sin problemas en Google Sheets y
                en Excel. También suelen abrirse bien en otros programas
                compatibles con archivos de hoja de cálculo.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-panel-2-content"
              id="faq-panel-2-header"
            >
              <Typography variant="subtitle2">
                ¿Puedo editar las fórmulas y los estilos?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Sí. Una vez que hagas tu copia tendrás control total sobre
                colores, textos, fórmulas y estructura. Nuestra idea es que la
                plantilla sea un punto de partida sólido, no una jaula.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-panel-3-content"
              id="faq-panel-3-header"
            >
              <Typography variant="subtitle2">
                ¿Qué pasa después de la compra?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Recibirás un enlace inmediato para duplicar la plantilla en tu
                cuenta o descargarla. A partir de ahí, es tuya para siempre:
                sin renovaciones ni suscripciones ocultas.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Box>

      <Box
        id="contact-section"
        sx={{
          mt: 5,
          mb: 2,
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          bgcolor: 'rgba(15,23,42,0.03)',
          border: '1px solid rgba(148, 163, 184, 0.35)',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={7}>
            <Stack spacing={1.5}>
              <Typography variant="overline" sx={{ letterSpacing: 1.5 }}>
                Contáctanos
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                ¿Tienes dudas o quieres una plantilla a medida?
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 520 }}
              >
                Escríbenos por Instagram o WhatsApp y hablamos sobre lo que
                necesitas. Respondemos de forma personal, sin bots.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="flex-end"
            >
              <Button
                component="a"
                href={`https://ig.me/m/tuplantillaperfecta?text=${encodeURIComponent(
                  'Hola! Me gustaría saber más sobre tus plantillas de hojas de cálculo.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="secondary"
                startIcon={<InstagramIcon />}
                disableElevation
                sx={{ flex: 1 }}
              >
                Instagram
              </Button>
              <Button
                component="a"
                href={`https://wa.me/5491164799746?text=${encodeURIComponent(
                  'Hola! Me gustaría saber más sobre tus plantillas de hojas de cálculo.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                color="primary"
                startIcon={<WhatsAppIcon />}
                sx={{ flex: 1 }}
              >
                WhatsApp
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <ProductModal 
        open={Boolean(openItem)} 
        item={openItem} 
        onClose={handleCloseItem} 
        onBuy={handleWhatsAppCompra} 
        formatUsd={formatUsd} 
        formatArs={formatArs} 
      />
    </Box>
  )
}

export default LandingPage


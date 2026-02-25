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
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function LandingPage({ categories, items }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items
    return items.filter((item) => item.categoryId === selectedCategory)
  }, [items, selectedCategory])

  const activeCategory =
    selectedCategory === 'all'
      ? null
      : categories.find((c) => c.id === selectedCategory)

  return (
    <Box>
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{ mb: { xs: 4, md: 8 } }}
      >
        <Grid item xs={12} md={6}>
          <Stack spacing={2.5}>
            <Chip
              label="Plantillas de hojas de cálculo"
              color="secondary"
              variant="filled"
              sx={{
                alignSelf: 'flex-start',
                fontWeight: 600,
                boxShadow: '0 10px 30px rgba(248, 113, 113, 0.25)',
              }}
            />
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 32, md: 40 },
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              Tu sistema en una hoja:
              <br />
              <Box component="span" sx={{ color: 'primary.main' }}>
                tu plantilla perfecta
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: 480,
                fontSize: { xs: 14, md: 16 },
              }}
            >
              Explora plantillas listas para usar para tus finanzas, gastos
              personales y planificación. Sólo duplica, personaliza y empieza a
              ahorrar tiempo.
            </Typography>
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
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              background:
                'radial-gradient(circle at 0% 0%, #4f46e5 0, transparent 55%), radial-gradient(circle at 100% 100%, #f97316 0, transparent 55%)',
              p: 1.5,
              boxShadow:
                '0 28px 80px rgba(15, 23, 42, 0.55), 0 0 0 1px rgba(148, 163, 184, 0.35)',
            }}
          >
            <Box
              sx={{
                borderRadius: 3,
                bgcolor: 'background.paper',
                p: 2,
                display: 'grid',
                gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                gap: 0.75,
                minHeight: 260,
              }}
            >
              {Array.from({ length: 18 }).map((_, index) => (
                <Box
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  sx={{
                    borderRadius: 1.5,
                    bgcolor:
                      index % 7 === 0
                        ? 'primary.main'
                        : index % 5 === 0
                        ? 'secondary.main'
                        : 'rgba(148,163,184,0.22)',
                    opacity: index % 7 === 0 || index % 5 === 0 ? 0.9 : 1,
                    gridColumn:
                      index % 7 === 0
                        ? 'span 2'
                        : index % 5 === 0
                        ? 'span 3'
                        : 'span 1',
                    height:
                      index % 7 === 0
                        ? 80
                        : index % 5 === 0
                        ? 64
                        : index % 3 === 0
                        ? 40
                        : 28,
                  }}
                />
              ))}
            </Box>
          </Box>
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
            <Stack direction="row" spacing={1} flexWrap="wrap">
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

        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.paper',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      height: 220,
                      objectFit: 'cover',
                      filter: 'saturate(1.05)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(15,23,42,0.7), transparent 55%)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 14,
                      left: 14,
                      right: 14,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: 'rgba(241,245,249,0.9)',
                          textTransform: 'uppercase',
                          letterSpacing: 1,
                          fontSize: 11,
                        }}
                      >
                        Hoja de cálculo
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: '#f9fafb',
                          fontWeight: 700,
                          textShadow: '0 2px 10px rgba(15,23,42,0.7)',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 999,
                        bgcolor: 'rgba(15,23,42,0.85)',
                        border: '1px solid rgba(148, 163, 184, 0.7)',
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: '#e5e7eb', fontWeight: 700 }}
                      >
                        {item.price.toFixed(0)}€
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={1.2}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {item.highlight}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 13, color: 'text.secondary' }}
                    >
                      {item.accent}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', fontSize: 12 }}
                      >
                        Editable en Google Sheets y Excel.
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 1,
                          py: 0.3,
                          borderRadius: 999,
                          bgcolor: 'rgba(16, 185, 129, 0.08)',
                          color: 'rgb(5, 150, 105)',
                          fontWeight: 600,
                        }}
                      >
                        Sin suscripción
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>

                <CardActions
                  sx={{
                    px: 2,
                    pb: 2,
                    pt: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'text.secondary', fontWeight: 600 }}
                  >
                    Pago único · Entrega inmediata
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    sx={{ px: 2.5 }}
                  >
                    Comprar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {filteredItems.length === 0 && (
            <Grid item xs={12}>
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
            </Grid>
          )}
        </Grid>
      </Box>

      <Box
        id="about-section"
        sx={{
          mb: 6,
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          bgcolor: 'rgba(15,23,42,0.03)',
          border: '1px solid rgba(148, 163, 184, 0.35)',
        }}
      >
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Stack spacing={2.5} sx={{ height: '100%' }}>
              <Typography variant="overline" sx={{ letterSpacing: 1.5 }}>
                Quiénes somos
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, maxWidth: 460 }}
              >
                Un pequeño estudio obsesionado con las hojas que simplifican tu
                vida financiera.
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', maxWidth: 520 }}
              >
                Diseñamos plantillas claras, bonitas y listas para usar para
                personas que quieren tener control sin complicarse. Cada
                plantilla está pensada para que puedas empezar en minutos, no
                en horas.
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mt: 1 }}
              >
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    boxShadow:
                      '0 18px 40px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(148, 163, 184, 0.25)',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    Menos caos, más claridad
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontSize: 13 }}
                  >
                    Nos enfocamos en lo esencial: que entiendas tus números de
                    un vistazo y tomes mejores decisiones cada mes.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 3,
                    border: '1px dashed rgba(148, 163, 184, 0.6)',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 0.5 }}
                  >
                    Diseñadas para personas reales
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontSize: 13 }}
                  >
                    Probamos nuestras plantillas con freelancers, creadores y
                    personas que simplemente quieren dejar de improvisar con su
                    dinero.
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: '100%',
                borderRadius: 3,
                p: 2.5,
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 2,
                boxShadow:
                  '0 20px 50px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(148, 163, 184, 0.3)',
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Lo que nos guía
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip
                    label="Claridad"
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label="Sencillez"
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                  <Chip
                    label="Resultados"
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', fontSize: 13 }}
                >
                  Cada plantilla incluye instrucciones sencillas para que sepas
                  exactamente qué rellenar y cómo leer tus datos, incluso si no
                  te llevas bien con Excel.
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', fontSize: 11 }}
                >
                  Construido en Google Sheets y Excel · Sin código · Sin
                  suscripciones.
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
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
    </Box>
  )
}

export default LandingPage


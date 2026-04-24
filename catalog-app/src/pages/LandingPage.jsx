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
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

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
          md={6}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Stack spacing={2.5} display={"flex"}>

            <Chip
              label="Plantillas de hojas de cálculo"
              color="secondary"
              variant="filled"
              bgcolor="#FFC107"
              sx={{
                backgroundColor:"#FFC107",
                alignSelf: 'flex-start',
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
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            mt: { xs: 1, md: 0 },
            display: { xs: 'none', md: 'flex' },
            justifyContent: { xs: 'center', md: 'flex-end' },
          }}
        >
       
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

        <Grid container spacing={3} alignItems="stretch" justifyContent="left">
          {filteredItems.map((item) => (
            <Grid key={item.id} item xs={16} sm={5} md={5} lg={5}>
              <Card
                onClick={() => handleOpenItem(item)}
                sx={{
                  flexGrow:1,
                  maxWidth:360,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.paper',
                  cursor: 'pointer',
                  transition: 'transform 180ms ease, box-shadow 180ms ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow:
                      '0 20px 45px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(148, 163, 184, 0.5)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      height: 150,
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
                        px: 2,
                        py: 0.8,
                        borderRadius: 999,
                        bgcolor: 'rgba(15,23,42,0.85)',
                        border: '1px solid rgba(148, 163, 184, 0.7)',
                      }}
                    >
                      <Stack spacing={0} alignItems="flex-end" minWidth={"90px"}>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: '#e5e7eb', fontWeight: 800, lineHeight: 1.1, marginRight:0, alignSelf:'center' }}
                        >
                          {`${formatUsd.format(item.priceUsd)} `}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'rgba(229,231,235,0.92)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                          }}
                        >
                          {`${formatArs.format(item.priceArs)} ARS`}
                        </Typography>
                      </Stack>
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
                    Ver detalles
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

      <Dialog
        open={Boolean(openItem)}
        onClose={handleCloseItem}
        fullWidth
        maxWidth="md"
        fullScreen={isSmallScreen}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, md: 2 },
            overflow: 'hidden',
          },
        }}
        style={{justifyContent:'center'}}
      >
        {openItem && (
          <DialogContent
            sx={{
              p: { xs: 2, md: 3 },
              pb: { xs: 2.5, md: 3 },
              position: 'relative',
            }}
          >
            <IconButton
              onClick={handleCloseItem}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 2,
              }}
              aria-label="Cerrar"
            >
              <CloseIcon />
            </IconButton>

            <Grid
              container
              spacing={{ xs: 5, md: 23 }}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow:
                      '0 14px 40px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(148, 163, 184, 0.4)',
                    height: '100%',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={openItem.image}
                    alt={openItem.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      maxHeight: { xs: 260, md: 420 },
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={7}>
                <Stack spacing={2.25} sx={{ height: '100%' }}>
                  <Stack spacing={0.75}>
                    <Typography variant="overline" sx={{ letterSpacing: 1.4 }}>
                      Plantilla · Hoja de cálculo
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: -0.2,
                      }}
                    >
                      {openItem.name}
                    </Typography>
                  </Stack>

                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {openItem.highlight}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontSize: 13 }}
                    >
                      {openItem.accent}
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      alignSelf: 'flex-start',
                      px: 1.6,
                      py: 0.9,
                      borderRadius: 999,
                      bgcolor: 'rgba(15,23,42,0.03)',
                      border: '1px solid rgba(148, 163, 184, 0.55)',
                    }}
                  >
                    <Stack spacing={0.2}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700 }}
                      >
                        {`${formatUsd.format(openItem.priceUsd)}`}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', fontWeight: 600 }}
                      >
                        {`${formatArs.format(openItem.priceArs)} ARS`}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow:
                        '0 12px 35px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(148, 163, 184, 0.4)',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        pt: '56.25%',
                      }}
                    >
                      <Box
                        component="iframe"
                        src={dummyVideoUrl}
                        title="Vista previa de la plantilla"
                        sx={{
                          border: 0,
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </Box>
                  </Box>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.5}
                    sx={{ mt: 'auto' }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      sx={{ flex: 1, py: 1.1 }}
                      onClick={handleWhatsAppCompra}
                    >
                      Comprar por WhatsApp
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleCloseItem}
                      sx={{ flex: 1, py: 1.1 }}
                    >
                      Seguir viendo
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  )
}

export default LandingPage


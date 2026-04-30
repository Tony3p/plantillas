import React from 'react'
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ImageCarousel from './ImageCarousel'

function ProductModal({ open, item, onClose, onBuy, formatUsd, formatArs }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const onYotubeClick=()=>{
    window.open(item.videoUrl.replace("embed/", "watch?v="), '_blank')
  }

  if (!item) return null

  const dummyVideoUrl = item.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  const images = item.images?.length > 0
    ? item.images
    : [item.image, item.image2, item.image3].filter(Boolean)
  const hasDiscount = Boolean(item.discountUsd && item.discountArs)

  const PriceBox = () => (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 1.5,
        bgcolor: hasDiscount ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.05)',
        border: hasDiscount
          ? '1px solid rgba(16,185,129,0.4)'
          : '1px solid rgba(16,185,129,0.2)',
      }}
    >
      {hasDiscount ? (
        <Box>
          <Box
            sx={{
              display: 'inline-block',
              px: 1,
              py: 0.2,
              mb: 0.5,
              borderRadius: 1,
              bgcolor: '#10B981',
              color: 'white',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Descuento
          </Box>
          <Stack direction="row" spacing={1.5} alignItems="baseline">
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1B5E20' }}>
              {formatUsd.format(item.discountUsd)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: 'text.disabled', textDecoration: 'line-through' }}
            >
              {formatUsd.format(item.priceUsd)}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="baseline">
            <Typography variant="body2" sx={{ color: '#2E7D32', fontWeight: 700 }}>
              {formatArs.format(item.discountArs)} ARS
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.disabled', fontWeight: 500, textDecoration: 'line-through' }}
            >
              {formatArs.format(item.priceArs)} ARS
            </Typography>
          </Stack>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1B5E20' }}>
            {formatUsd.format(item.priceUsd)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {formatArs.format(item.priceArs)} ARS
          </Typography>
        </Box>
      )}
    </Box>
  )

  const Buttons = () => (
    <Stack direction="row" spacing={1.5}>
      <Button
        variant="contained"
        disableElevation
        sx={{
          maxHeight: '80%',
          flex: 1,
          py: 1.3,
          background: 'linear-gradient(to right, #2E7D32, #1B5E20)',
          color: 'white',
          fontWeight: 700,
          borderRadius: 2,
          fontSize: { xs: 13, md: 14 },
          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 16px rgba(27,94,32,0.3)' },
          transition: 'all 0.2s',
        }}
        onClick={onBuy}
      >
        Comprar
      </Button>
      <Button
        variant="outlined"
        sx={{
          maxHeight: '80%',
          flex: 1,
          py: 1.3,
          borderColor: 'rgba(21,101,192,0.5)',
          color: '#1565C0',
          fontWeight: 700,
          borderRadius: 2,
          fontSize: { xs: 13, md: 14 },
          '&:hover': { borderColor: '#1565C0', bgcolor: 'rgba(21,101,192,0.05)' },
        }}
        onClick={onClose}
      >
        Seguir viendo
      </Button>
    </Stack>
  )

  /* ─── MOBILE: full screen ─────────────────────────────────── */
  if (isMobile) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen
        
        PaperProps={{ sx: { bgcolor: 'background.paper',               '&::-webkit-scrollbar': {
                display: 'none', // Para Chrome, Safari y Opera
              },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none', } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Carousel — top half */}
          <Box sx={{ position: 'relative', flex: '0 0 55%', overflow: 'hidden' }}>
            <ImageCarousel images={images} altText={item.name} objectFit="cover" />
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 10,
                bgcolor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(4px)',
                '&:hover': { bgcolor: 'white', color: '#10B981' },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Info — bottom half */}
          <Box
            sx={{
              flex: 1,
              p: 2.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,

            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ color: '#1565C0', fontWeight: 800, letterSpacing: 1.5, lineHeight: 1 }}
              >
                Plantilla Exclusiva
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: 'text.primary', mt: 0.3, lineHeight: 1.2 }}
              >
                {item.name}
              </Typography>
            </Box>
            <PriceBox />
            <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5}}>
                    {item.videoUrl && <Button
                     variant="outlined"
                     sx={{
                       maxHeight: '35%',
                       alignSelf: 'center',
                       alignContent: 'center',
                       py: 1.3,
                       borderColor: 'red',
                       color: 'white',
                       fontWeight: 700,
                       borderRadius: 2,
                       bgcolor: 'red',
                       fontSize: { xs: 13, md: 14 },
                       '&:hover': { borderColor: 'red', bgcolor: 'red' },
                     }}
                     onClick={onYotubeClick}
      >             Ver en youtube </Button>}
              <Buttons />
            </Box>
          </Box>
        </Box>
      </Dialog>
    )
  }

  /* ─── DESKTOP / TABLET ────────────────────────────────────── */
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(16,185,129,0.25)',
          m: 3,
          maxHeight: 'calc(100vh - 48px)',
          maxWidth: '83%',
        },
      }}
    >
      <DialogContent sx={{ p: 0, display: 'flex', overflow: 'hidden' }}>
        {/* Left: Carousel */}
        <Box
          sx={{
            width: '42%',
            flexShrink: 0,
            position: 'relative',
            bgcolor: '#f1f5f9',
          }}
        >
          <ImageCarousel images={images} altText={item.name} objectFit="cover" />
        </Box>

        {/* Right: Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 3,
            overflow: 'hidden',
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 10,
              bgcolor: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(4px)',
              '&:hover': { bgcolor: 'white', color: '#10B981', transform: 'scale(1.1)' },
              transition: 'all 0.2s',
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* Title + description */}
          <Stack spacing={1.5}>
            <Box>
              <Typography
                variant="overline"
                sx={{ letterSpacing: 1.5, color: '#1565C0', fontWeight: 800, lineHeight: 1 }}
              >
                Plantilla Exclusiva
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, letterSpacing: -0.3, color: 'text.primary', lineHeight: 1.2, mt: 0.3 }}
              >
                {item.name}
              </Typography>
            </Box>

            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {item.highlight}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10B981', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {item.accent}
                </Typography>
              </Box>
            </Stack>

            <PriceBox />
          </Stack>

          {/* Video */}
          <Box
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              flexShrink: 0,
              maxHeight: "45%",
              marginBottom: "2%",
              marginTop: "2%"
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', pt: '52%' }}>
              <Box
                component="iframe"
                src={dummyVideoUrl}
                title="Vista previa"
                sx={{ border: 0, position: 'absolute', inset: 0, width: '100%', height: "100%" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </Box>
          </Box>

          {/* Buttons */}
          <Buttons />
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal

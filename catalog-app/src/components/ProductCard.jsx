import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Stack,
  Divider,
  Button
} from '@mui/material';

const ProductCard = ({ item, onClick, formatUsd, formatArs }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        flexGrow: 1,
        maxWidth: 360,
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
          image={item.images?.[0] || item.image}
          alt={item.name}
          sx={{
            height: 190,
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
              border: item.discountUsd && item.discountArs
                ? '1px solid rgba(110,231,183,0.6)'
                : '1px solid rgba(148, 163, 184, 0.7)',
            }}
          >
            {item.discountUsd && item.discountArs ? (
              <Stack spacing={0} alignItems="center" minWidth="90px">
                {/* Discount prices — top, highlighted */}
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#6ee7b7', fontWeight: 800, lineHeight: 1.2, fontSize: 14 }}
                >
                  {formatUsd.format(item.discountUsd)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(110,231,183,0.85)', fontWeight: 700, lineHeight: 1.1, fontSize: 10 }}
                >
                  {formatArs.format(item.discountArs)} ARS
                </Typography>
                {/* Real prices — bottom, crossed out */}
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.3 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(229,231,235,0.4)',
                      fontWeight: 500,
                      textDecoration: 'line-through',
                      fontSize: 9,
                      lineHeight: 1,
                    }}
                  >
                    {formatUsd.format(item.priceUsd)}
                  </Typography>
                  <Typography sx={{ color: 'rgba(229,231,235,0.3)', fontSize: 9, lineHeight: 1 }}>·</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(229,231,235,0.4)',
                      fontWeight: 500,
                      textDecoration: 'line-through',
                      fontSize: 9,
                      lineHeight: 1,
                    }}
                  >
                    {formatArs.format(item.priceArs)}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={0} alignItems="flex-end" minWidth="90px">
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#e5e7eb', fontWeight: 800, lineHeight: 1.1, alignSelf: 'center' }}
                >
                  {`${formatUsd.format(item.priceUsd)} `}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(229,231,235,0.92)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    alignSelf: 'center'
                  }}
                >
                  {`${formatArs.format(item.priceArs)} ARS`}
                </Typography>
              </Stack>
            )}
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1.5 }}>
        <Stack spacing={1.2}>
          <Typography variant="body2" sx={{ color: 'black', fontWeight:700 }}>
            {item.highlight}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 13, color: 'text.secondary' }}
          >
            {item.accent}
          </Typography>          
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
  );
};

export default ProductCard;

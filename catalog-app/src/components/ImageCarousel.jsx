import React, { useState } from 'react';
import { Box, CardMedia, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ImageCarousel = ({ images, altText, objectFit = 'contain' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = images.filter(img => img !== "");

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  if (!filteredImages || filteredImages.length === 0) return null;

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Box sx={{ width: '100%', height: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1)' }}>
        <CardMedia
          component="img"
          image={images[currentIndex]}
          alt={`${altText} - imagen ${currentIndex + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: objectFit,
            bgcolor: '#ffffff',
          }}
        />
        {filteredImages.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1,
              zIndex: 2,
            }}
          >
            {filteredImages.map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: idx === currentIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: idx === currentIndex ? '#10B981' : 'rgba(0, 0, 0, 0.2)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {filteredImages.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: { xs: 4, md: -48 },
              transform: 'translateY(-50%)',
              color: 'text.secondary',
              bgcolor: 'transparent',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', color: '#10B981' },
            }}
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: { xs: 4, md: -48 },
              transform: 'translateY(-50%)',
              color: 'text.secondary',
              bgcolor: 'transparent',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', color: '#10B981' },
            }}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default ImageCarousel;

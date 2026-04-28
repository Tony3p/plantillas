import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { storage } from '../Firebase/config.js'; 

export default function ImageField({ 
  value, 
  onChange, 
  folder = 'images', 
  label = 'Subir imagen' 
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("estoy ACA!!!")

    // Validación básica de tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecciona un archivo de imagen válido.');
      return;
    }

    uploadImage(file);
  };

  const uploadImage = (file) => {
    setUploading(true);
    setError('');
    
    // Crear una referencia única para la imagen en el storage
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
    const storageRef = ref(storage, `${folder}/${uniqueFileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(currentProgress));
      },
      (error) => {
        console.error('Error al subir:', error);
        setError('Ocurrió un error al subir la imagen.');
        setUploading(false);
      },
      async () => {
        // Subida exitosa
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onChange(downloadURL); // Pasamos la URL al componente padre
        setUploading(false);
        setProgress(0);
      }
    );
  };

  const handleRemove = () => {
    onChange(''); // Limpiamos la URL en el componente padre
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reseteamos el input
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Estado 1: No hay imagen y no está subiendo */}
      {!value && !uploading && (
        <Button
          variant="outlined"
          component="label"
          fullWidth
          startIcon={<CloudUploadIcon />}
          sx={{
            height: 56,
            borderStyle: 'dashed',
            borderWidth: 2,
            color: error ? 'error.main' : 'text.secondary',
            borderColor: error ? 'error.main' : 'divider',
            '&:hover': {
              borderStyle: 'dashed',
              borderWidth: 2,
            }
          }}
        >
          {label}
          <input
            type="file"
            hidden
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
        </Button>
      )}

      {/* Estado 2: Subiendo archivo */}
      {uploading && (
        <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center" 
          justifyContent="center"
          sx={{ height: 56, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
        >
          <CircularProgress size={24} variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary">
            Subiendo... {progress}%
          </Typography>
        </Stack>
      )}

      {/* Estado 3: Imagen subida (Previsualización) */}
      {value && !uploading && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 160,
            borderRadius: 1,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            component="img"
            src={value}
            alt="Preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <IconButton
            size="small"
            color="error"
            onClick={handleRemove}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { bgcolor: 'error.main', color: 'white' }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Mensaje de error */}
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
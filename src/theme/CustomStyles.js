// src/theme/CustomStyles.js
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Definición de gradientes LGBTIQ+
const elegantGradients = {
  horizontal: `linear-gradient(to right, 
    #E91E63, 
    #FF5722, 
    #FFC107, 
    #4CAF50, 
    #2196F3, 
    #9C27B0)`,
  vertical: `linear-gradient(to bottom, 
    #E91E63, 
    #FF5722, 
    #FFC107, 
    #4CAF50, 
    #2196F3, 
    #9C27B0)`,
  diagonal: `linear-gradient(135deg, 
    #E91E63, 
    #FF5722, 
    #FFC107, 
    #4CAF50, 
    #2196F3, 
    #9C27B0)`,
  subtle: `linear-gradient(135deg, 
    #CE93D8 0%, 
    #90CAF9 100%)`,
  rainbow: `linear-gradient(90deg, 
    #E91E6340 0%, 
    #FF572240 20%, 
    #FFC10740 40%, 
    #4CAF5040 60%, 
    #2196F340 80%, 
    #9C27B040 100%)`,
  rainbowSubtle: `linear-gradient(90deg, 
    #E91E6320 0%, 
    #FF572220 20%, 
    #FFC10720 40%, 
    #4CAF5020 60%, 
    #2196F320 80%, 
    #9C27B020 100%)`,
};

// Barra arcoíris decorativa
export const RainbowBar = styled(Box)(({ theme, height = 4, opacity = 1, variant = 'rainbow' }) => {
  // Determinar el gradiente basado en la variante
  const getGradient = () => {
    switch (variant) {
      case 'primary': return `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`;
      case 'secondary': return `linear-gradient(90deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`;
      case 'subtle': return elegantGradients.subtle;
      case 'rainbowSubtle': return elegantGradients.rainbowSubtle;
      case 'rainbow':
      default: return elegantGradients.horizontal;
    }
  };

  return {
    height,
    width: '100%',
    background: getGradient(),
    opacity: opacity,
  };
});

// Contenedor para texto con gradiente
export const GradientText = styled(Typography)(({ 
  theme, 
  variant = 'primary',
  glow = false
}) => {
  // Determinar el gradiente basado en la variante
  const getGradient = () => {
    switch (variant) {
      case 'secondary': return `linear-gradient(90deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`;
      case 'rainbow': return elegantGradients.horizontal;
      case 'primary':
      default: return `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`;
    }
  };

  return {
    background: getGradient(),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
    ...(glow && {
      textShadow: variant === 'rainbow' 
        ? '0 0 20px rgba(126, 87, 194, 0.3)' 
        : `0 0 20px ${theme.palette.primary.main}30`,
    }),
  };
});

// Contenedor para secciones con fondo sutil
export const ElegantSection = styled(Box)(({ 
  theme, 
  variant = 'default',
  borderRadius = true
}) => {
  // Determinar el fondo basado en la variante
  const getBackground = () => {
    switch (variant) {
      case 'primary': return `${theme.palette.primary.main}08`;
      case 'secondary': return `${theme.palette.secondary.main}08`;
      case 'subtle': return theme.palette.background.subtle || '#f8f9fa';
      case 'rainbow': return elegantGradients.rainbowSubtle;
      default: return theme.palette.background.paper;
    }
  };

  return {
    padding: theme.spacing(4),
    background: getBackground(),
    ...(borderRadius && { borderRadius: theme.shape.borderRadius * 2 }),
  };
});

// Barra elegante
export const ElegantBar = styled(Box)(({ 
  theme, 
  height = 2, 
  width = '100%',
  variant = 'rainbow', 
  opacity = 1,
  borderRadius = 0
}) => {
  // Determinar el gradiente basado en la variante
  const getGradient = () => {
    switch (variant) {
      case 'primary': return `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`;
      case 'secondary': return `linear-gradient(90deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`;
      case 'subtle': return elegantGradients.subtle;
      case 'rainbowSubtle': return elegantGradients.rainbowSubtle;
      case 'rainbow':
      default: return elegantGradients.horizontal;
    }
  };

  return {
    height,
    width,
    background: getGradient(),
    opacity,
    borderRadius: borderRadius ? theme.shape.borderRadius : 0,
    transition: 'all 0.3s ease',
  };
});

// Exportaciones principales
export { elegantGradients };

// Exportación por defecto
export default {
  RainbowBar,
  GradientText,
  ElegantBar,
  ElegantSection,
  elegantGradients
};
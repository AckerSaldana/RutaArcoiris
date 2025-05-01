// src/components/common/InfoCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Styled card minimalista
const InfoCard = ({
  title,
  description,
  icon,
  image,
  imageAlt,
  imageHeight = 200,
  linkText,
  linkTo,
  color = 'primary',
  elevation = 0,
  accentColor,
  onClick,
  sx = {},
}) => {
  const theme = useTheme();
  
  // Determine accent color
  const cardAccentColor = accentColor || (
    color === 'primary' ? theme.palette.primary.main :
    color === 'secondary' ? theme.palette.secondary.main :
    color === 'error' ? theme.palette.error.main :
    color === 'warning' ? theme.palette.warning.main :
    color === 'info' ? theme.palette.info.main :
    color === 'success' ? theme.palette.success.main :
    theme.palette.primary.main
  );

  return (
    <Card 
      elevation={elevation} 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        borderLeft: `2px solid ${cardAccentColor}`,
        borderTop: 'none',
        borderRight: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
        ...sx 
      }}
    >
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={imageAlt || title}
          sx={{ borderRadius: 0 }}
        />
      )}
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        p: 3,
        height: '100%',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          {icon && (
            <Box sx={{ 
              mr: 2, 
              color: cardAccentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {icon}
            </Box>
          )}
          <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 400, letterSpacing: '0.02em' }}>
            {title}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 'auto' }}>
          {description}
        </Typography>
        
        {(linkText && linkTo) && (
          <Button
            component={RouterLink}
            to={linkTo}
            color={color}
            onClick={onClick}
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              mt: 2, 
              alignSelf: 'flex-start',
              fontWeight: 400,
              textTransform: 'none',
              p: 0,
              '&:hover': {
                backgroundColor: 'transparent',
                color: cardAccentColor,
              }
            }}
          >
            {linkText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
// src/components/common/InfoCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  useTheme, 
  styled 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Styled card with hover effect
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

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
  elevation = 1,
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
    <StyledCard elevation={elevation} sx={{ ...sx }}>
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={imageAlt || title}
        />
      )}
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        p: 3,
        borderLeft: `4px solid ${cardAccentColor}`,
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
          <Typography variant="h6" component="h3" gutterBottom>
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
              fontWeight: 500,
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
    </StyledCard>
  );
};

export default InfoCard;
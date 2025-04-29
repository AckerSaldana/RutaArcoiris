// src/components/common/RouteSafetyCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Chip,
  Button,
  Divider 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PlaceIcon from '@mui/icons-material/Place';
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DirectionsIcon from '@mui/icons-material/Directions';

// Styled warning item
const WarningItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  '& .MuiListItemIcon-root': {
    minWidth: 32,
    color: theme.palette.warning.main,
  },
}));

// Styled tip item
const TipItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  '& .MuiListItemIcon-root': {
    minWidth: 32,
    color: theme.palette.success.main,
  },
}));

const RouteSafetyCard = ({
  title,
  description,
  image,
  imageAlt,
  safePoints = [],
  dangerPoints = [],
  tips = [],
  active = false,
  onClick,
  sx = {},
}) => {
  return (
    <Card 
      elevation={active ? 3 : 1} 
      sx={{
        position: 'relative',
        overflow: 'visible',
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        borderLeft: active ? '4px solid' : 'none',
        borderColor: 'primary.main',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4,
        },
        ...sx
      }}
      onClick={onClick}
    >
      {image && (
        <CardMedia
          component="img"
          height={200}
          image={image}
          alt={imageAlt || title}
        />
      )}
      
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        
        {safePoints.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
              <PlaceIcon sx={{ mr: 1, color: 'success.main' }} />
              Puntos Seguros
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {safePoints.map((point, index) => (
                <Chip 
                  key={index}
                  label={point.name || point}
                  color="success"
                  variant="outlined"
                  size="small"
                  icon={<PlaceIcon />}
                />
              ))}
            </Box>
          </Box>
        )}
        
        {dangerPoints.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
              <WarningAmberIcon sx={{ mr: 1, color: 'warning.main' }} />
              Puntos de Precaución
            </Typography>
            <List dense disablePadding>
              {dangerPoints.map((point, index) => (
                <WarningItem key={index} disableGutters>
                  <ListItemIcon>
                    <WarningAmberIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={point} 
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </WarningItem>
              ))}
            </List>
          </Box>
        )}
        
        {tips.length > 0 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckIcon sx={{ mr: 1, color: 'success.main' }} />
              Consejos de Seguridad
            </Typography>
            <List dense disablePadding>
              {tips.map((tip, index) => (
                <TipItem key={index} disableGutters>
                  <ListItemIcon>
                    <CheckIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={tip} 
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </TipItem>
              ))}
            </List>
          </Box>
        )}
        
        {active && (
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button 
              variant="contained" 
              color="primary" 
              endIcon={<DirectionsIcon />}
            >
              Ver Detalles
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteSafetyCard;
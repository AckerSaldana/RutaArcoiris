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

// Styled warning item - minimalista
const WarningItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  '& .MuiListItemIcon-root': {
    minWidth: 32,
    color: theme.palette.warning.main,
  },
}));

// Styled tip item - minimalista
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
      elevation={0} 
      sx={{
        position: 'relative',
        overflow: 'visible',
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        borderLeft: active ? '2px solid' : '1px solid',
        borderLeftColor: active ? 'primary.main' : 'divider',
        borderTop: 'none',
        borderRight: '1px solid',
        borderRightColor: 'divider',
        borderBottom: '1px solid',
        borderBottomColor: 'divider',
        borderRadius: 0,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
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
          sx={{ borderRadius: 0 }}
        />
      )}
      
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 400, letterSpacing: '0.02em' }}>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        
        {safePoints.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight={400} sx={{ display: 'flex', alignItems: 'center', letterSpacing: '0.02em' }}>
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
                  sx={{ borderRadius: 0 }}
                />
              ))}
            </Box>
          </Box>
        )}
        
        {dangerPoints.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight={400} sx={{ display: 'flex', alignItems: 'center', letterSpacing: '0.02em' }}>
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
            <Typography variant="subtitle1" gutterBottom fontWeight={400} sx={{ display: 'flex', alignItems: 'center', letterSpacing: '0.02em' }}>
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
              sx={{ 
                borderRadius: 0, 
                fontWeight: 400,
                textTransform: 'none'
              }}
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
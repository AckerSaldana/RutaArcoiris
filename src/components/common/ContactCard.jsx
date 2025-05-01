// src/components/common/ContactCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Divider, 
  Link, 
  Button,
  useTheme 
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import { styled } from '@mui/material/styles';

// Chip de categoría minimalista
const CategoryChip = styled(Chip)(({ theme, categorycolor }) => ({
  backgroundColor: categorycolor ? `${categorycolor}10` : theme.palette.primary.light,
  color: categorycolor || theme.palette.primary.main,
  fontWeight: 400,
  borderRadius: 0,
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

// Chip de servicio minimalista
const ServiceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ContactCard = ({
  name,
  description,
  phone,
  email,
  address,
  website,
  category,
  categoryIcon,
  categoryColor,
  services = [],
  isEmergency = false,
  onClick,
  sx = {},
}) => {
  const theme = useTheme();
  
  return (
    <Card 
      elevation={0} 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: isEmergency 
          ? `2px solid ${theme.palette.error.main}` 
          : categoryColor 
            ? `2px solid ${categoryColor}`
            : 'none',
        borderTop: 'none',
        borderRight: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
        ...sx
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        {/* Header with name and category */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom fontWeight={400} letterSpacing="0.02em">
            {name}
          </Typography>
          
          {category && (
            <CategoryChip 
              label={category} 
              size="small"
              categorycolor={categoryColor}
              icon={categoryIcon}
            />
          )}
        </Box>
        
        {/* Description */}
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Contact Information */}
        <Box sx={{ mt: 2 }}>
          {phone && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <PhoneIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5, mt: 0.3 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Teléfono:
                </Typography>
                <Typography variant="body2" fontWeight={isEmergency ? 600 : 400}>
                  {phone}
                </Typography>
              </Box>
            </Box>
          )}
          
          {email && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <EmailIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5, mt: 0.3 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Correo:
                </Typography>
                <Link 
                  href={`mailto:${email}`} 
                  variant="body2" 
                  color="primary"
                  underline="hover"
                  sx={{ fontWeight: 400 }}
                >
                  {email}
                </Link>
              </Box>
            </Box>
          )}
          
          {address && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5, mt: 0.3 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Dirección:
                </Typography>
                <Typography variant="body2">
                  {address}
                </Typography>
              </Box>
            </Box>
          )}
          
          {website && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <LanguageIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5, mt: 0.3 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Sitio web:
                </Typography>
                <Link 
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  color="primary"
                  underline="hover"
                  sx={{ fontWeight: 400 }}
                >
                  {website}
                </Link>
              </Box>
            </Box>
          )}
        </Box>
        
        {/* Services List */}
        {services.length > 0 && (
          <>
            <Typography variant="subtitle2" gutterBottom>
              Servicios
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {services.map((service, index) => (
                <ServiceChip 
                  key={index} 
                  label={service} 
                  size="small" 
                />
              ))}
            </Box>
          </>
        )}
        
        {phone && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant={isEmergency ? 'contained' : 'outlined'}
              size="small"
              color={isEmergency ? 'error' : 'primary'}
              startIcon={<PhoneIcon />}
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              sx={{ 
                borderRadius: 0,
                fontWeight: 400,
                textTransform: 'none'
              }}
            >
              Llamar
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactCard;
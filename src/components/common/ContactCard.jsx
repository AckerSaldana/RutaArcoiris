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

// Styled category chip
const CategoryChip = styled(Chip)(({ theme, categorycolor }) => ({
  backgroundColor: categorycolor ? `${categorycolor}20` : theme.palette.primary.light,
  color: categorycolor || theme.palette.primary.main,
  fontWeight: 500,
  '& .MuiChip-icon': {
    color: 'inherit',
  },
}));

// Styled service chip
const ServiceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
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
      elevation={1} 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: isEmergency 
          ? `4px solid ${theme.palette.error.main}` 
          : categoryColor 
            ? `4px solid ${categoryColor}`
            : 'none',
        ...sx
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        {/* Header with name and category */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
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
        <Box sx={{ mb: 2 }}>
          {phone && (
            <Box sx={{ display: 'flex', mb: 1 }}>
              <PhoneIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: isEmergency ? 600 : 400,
                  color: isEmergency ? 'error.main' : 'text.primary',
                  fontSize: isEmergency ? '1rem' : 'inherit',
                }}
              >
                {phone}
              </Typography>
            </Box>
          )}
          
          {email && (
            <Box sx={{ display: 'flex', mb: 1 }}>
              <EmailIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5 }} />
              <Link 
                href={`mailto:${email}`} 
                variant="body2" 
                color="primary"
                underline="hover"
              >
                {email}
              </Link>
            </Box>
          )}
          
          {address && (
            <Box sx={{ display: 'flex', mb: 1 }}>
              <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5 }} />
              <Typography variant="body2" color="text.primary">
                {address}
              </Typography>
            </Box>
          )}
          
          {website && (
            <Box sx={{ display: 'flex', mb: 1 }}>
              <LanguageIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5 }} />
              <Link 
                href={website.startsWith('http') ? website : `https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
                color="primary"
                underline="hover"
              >
                {website}
              </Link>
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
      </CardContent>
    </Card>
  );
};

export default ContactCard;
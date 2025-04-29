// src/pages/ContactsPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Paper, 
  TextField, 
  InputAdornment, 
  Button, 
  Card, 
  CardContent, 
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  alpha,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import WarningIcon from '@mui/icons-material/Warning';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import GavelIcon from '@mui/icons-material/Gavel';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LanguageIcon from '@mui/icons-material/Language';
import { Link as RouterLink } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import { ElegantBar, ElegantSection, GradientText } from '../theme/CustomStyles';
import { useLanguage } from '../context/LanguageContext';

// Categoría chip elegante
const CategoryChip = styled(Chip)(({ theme, isActive, categoryColor }) => ({
  borderRadius: 16,
  fontWeight: isActive ? 600 : 500,
  backgroundColor: isActive 
    ? alpha(categoryColor || theme.palette.primary.main, 0.15) 
    : alpha(theme.palette.action.hover, 0.5),
  color: isActive 
    ? (categoryColor || theme.palette.primary.main) 
    : theme.palette.text.primary,
  border: isActive 
    ? `1px solid ${alpha(categoryColor || theme.palette.primary.main, 0.3)}` 
    : `1px solid transparent`,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: isActive 
      ? alpha(categoryColor || theme.palette.primary.main, 0.2) 
      : alpha(theme.palette.action.hover, 0.8),
  },
}));

// Tarjeta de contacto elegante
const ContactCard = styled(Card)(({ theme, accentColor, isEmergency }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  position: 'relative',
  ...(isEmergency && {
    borderLeft: `4px solid ${theme.palette.error.main}`,
  }),
  ...(!isEmergency && accentColor && {
    borderLeft: `4px solid ${accentColor}`,
  }),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[3],
    borderColor: 'transparent',
  },
}));

// Tarjeta de emergencia elegante
const EmergencyCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  border: 'none',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  position: 'relative',
  background: `linear-gradient(145deg, ${alpha(theme.palette.error.main, 0.05)} 0%, ${alpha(theme.palette.error.light, 0.15)} 100%)`,
  borderLeft: `4px solid ${theme.palette.error.main}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

// Icono de categoría circular elegante
const CategoryIcon = styled(Box)(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 44,
  height: 44,
  borderRadius: '50%',
  backgroundColor: alpha(color || theme.palette.primary.main, 0.1),
  color: color || theme.palette.primary.main,
  marginRight: theme.spacing(1.5),
  flexShrink: 0,
}));

const ContactsPage = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Estados para filtros y búsqueda
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  
  // Categorías de contactos
  const categories = [
    { id: 'all', name: 'Todos', icon: <FilterListIcon />, color: theme.palette.primary.main },
    { id: 'emergency', name: 'Emergencia', icon: <WarningIcon />, color: theme.palette.error.main },
    { id: 'shelter', name: 'Albergues', icon: <HomeWorkIcon />, color: '#2196f3' },
    { id: 'legal', name: 'Apoyo Legal', icon: <GavelIcon />, color: '#4caf50' },
    { id: 'health', name: 'Salud', icon: <LocalHospitalIcon />, color: '#ff9800' },
    { id: 'mental', name: 'Apoyo Psicológico', icon: <PsychologyIcon />, color: '#9c27b0' },
  ];

  // Contactos de ejemplo
  const contactsData = [
    {
      id: 1,
      name: 'Emergencias Nacionales',
      description: 'Línea nacional de emergencias para situaciones que requieran intervención inmediata de policía, ambulancias o bomberos.',
      phone: '911',
      category: 'emergency',
      categoryIcon: <WarningIcon />,
      categoryColor: theme.palette.error.main,
      isEmergency: true,
    },
    {
      id: 2,
      name: 'Comisión Nacional de Derechos Humanos',
      description: 'Organismo público que atiende quejas por presuntas violaciones a los derechos humanos cometidas por autoridades federales.',
      phone: '800-715-2000',
      email: 'contacto@cndh.org.mx',
      website: 'www.cndh.org.mx',
      category: 'legal',
      categoryIcon: <GavelIcon />,
      categoryColor: '#4caf50',
    },
    {
      id: 3,
      name: 'Línea de Crisis LGBTQ+',
      description: 'Servicio de atención para crisis emocionales y situaciones de emergencia para la comunidad LGBTQ+.',
      phone: '55-5533-5533',
      category: 'emergency',
      categoryIcon: <WarningIcon />,
      categoryColor: theme.palette.error.main,
      isEmergency: true,
    },
    {
      id: 4,
      name: 'Casa Arcoíris - CDMX',
      description: 'Albergue especializado para personas LGBTQ+ migrantes en la Ciudad de México. Ofrece alojamiento, alimentación, atención médica, asesoría legal y apoyo psicológico.',
      phone: '55-1234-5678',
      email: 'contacto@casaarcoiris.org',
      website: 'www.casaarcoiris.org',
      address: 'Calle ejemplo #123, Col. Centro, Ciudad de México',
      category: 'shelter',
      categoryIcon: <HomeWorkIcon />,
      categoryColor: '#2196f3',
      services: ['Alojamiento', 'Alimentación', 'Atención médica', 'Asesoría legal', 'Apoyo psicológico'],
    },
    {
      id: 5,
      name: 'Refugio Diversidad - Tijuana',
      description: 'Albergue para personas LGBTQ+ migrantes en Tijuana. Ofrece alojamiento, alimentación, asesoría legal y orientación sobre asilo.',
      phone: '664-123-4567',
      email: 'contacto@refugiodiversidad.org',
      website: 'www.refugiodiversidad.org',
      address: 'Av. Ejemplo #456, Col. Zona Norte, Tijuana, BC',
      category: 'shelter',
      categoryIcon: <HomeWorkIcon />,
      categoryColor: '#2196f3',
      services: ['Alojamiento', 'Alimentación', 'Asesoría legal', 'Orientación sobre asilo'],
    },
    {
      id: 6,
      name: 'Centro Legal para Migrantes LGBTQ+',
      description: 'Organización que brinda asesoría legal gratuita a migrantes LGBTQ+, especializada en derechos humanos, asilo y regularización migratoria.',
      phone: '55-9876-5432',
      email: 'contacto@centrolegal.org',
      website: 'www.centrolegal.org',
      address: 'Calle ejemplo #789, Col. Roma, Ciudad de México',
      category: 'legal',
      categoryIcon: <GavelIcon />,
      categoryColor: '#4caf50',
      services: ['Asesoría legal', 'Acompañamiento en trámites', 'Defensa de derechos'],
    },
    {
      id: 7,
      name: 'Clínica Especializada en Salud LGBTQ+',
      description: 'Centro de salud especializado en atención médica para población LGBTQ+, incluyendo servicios de salud física, sexual y reproductiva.',
      phone: '55-2468-1357',
      email: 'contacto@clinicalgbt.org',
      website: 'www.clinicalgbt.org',
      address: 'Av. ejemplo #101, Col. Juárez, Ciudad de México',
      category: 'health',
      categoryIcon: <LocalHospitalIcon />,
      categoryColor: '#ff9800',
      services: ['Consultas médicas', 'Pruebas rápidas', 'Atención psicológica', 'Medicamentos básicos'],
    },
    {
      id: 8,
      name: 'Apoyo Psicológico Migrante',
      description: 'Servicio de atención psicológica especializada para migrantes LGBTQ+ que enfrentan situaciones de estrés, trauma o discriminación.',
      phone: '664-987-6543',
      email: 'contacto@apoyopsicologico.org',
      website: 'www.apoyopsicologico.org',
      address: 'Calle ejemplo #202, Col. Centro, Tijuana, BC',
      category: 'mental',
      categoryIcon: <PsychologyIcon />,
      categoryColor: '#9c27b0',
      services: ['Terapia individual', 'Grupos de apoyo', 'Atención en crisis'],
    },
  ];
  
  // Filtrar contactos según la categoría y término de búsqueda
  useEffect(() => {
    let filtered = contactsData;
    
    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(contact => contact.category === selectedCategory);
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(term) || 
        contact.description.toLowerCase().includes(term) ||
        (contact.address && contact.address.toLowerCase().includes(term))
      );
    }
    
    setFilteredContacts(filtered);
  }, [selectedCategory, searchTerm]);
  
  // Contactos de emergencia
  const emergencyContacts = contactsData.filter(contact => contact.isEmergency);
  
  // Manejar cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  // Manejar cambio en término de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Obtener el icono de la categoría
  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : <FilterListIcon />;
  };

  // Obtener el color de la categoría
  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : theme.palette.primary.main;
  };

  return (
    <Layout maxWidth={false} disablePadding>
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02), pt: 6, pb: 10 }}>
        <Container maxWidth="lg">
          <PageHeader
            title={t('contacts.title')}
            subtitle={t('contacts.subtitle')}
            breadcrumbs={[{ label: t('contacts.title'), path: '/contactos' }]}
          />

          {/* Sección de Contactos de Emergencia */}
          <Box sx={{ mb: 6 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 3
              }}
            >
              <CategoryIcon color={theme.palette.error.main}>
                <WarningIcon />
              </CategoryIcon>
              <GradientText 
                variant="h4" 
                component="h2" 
                variant="primary"
                fontWeight={700}
              >
                {t('contacts.emergency.title')}
              </GradientText>
            </Box>
            
            <Grid container spacing={3}>
              {emergencyContacts.map(contact => (
                <Grid item xs={12} md={6} key={contact.id}>
                  <EmergencyCard>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight={700}>
                        {contact.name}
                      </Typography>
                      
                      <Typography variant="body2" paragraph>
                        {contact.description}
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        p: 2,
                        mt: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 1,
                      }}>
                        <PhoneIcon 
                          fontSize="large" 
                          sx={{ 
                            mr: 2, 
                            color: theme.palette.error.main 
                          }} 
                        />
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            Teléfono de emergencia:
                          </Typography>
                          <Typography variant="h4" component="p" fontWeight={700}>
                            {contact.phone}
                          </Typography>
                        </Box>
                        <Button 
                          variant="contained" 
                          color="error" 
                          sx={{ ml: 'auto' }}
                          href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                        >
                          Llamar
                        </Button>
                      </Box>
                    </CardContent>
                  </EmergencyCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6 }}>
        {/* Sección de Filtros */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 6, 
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder={t('contacts.search')}
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" gutterBottom>
                  {t('contacts.filter.title')}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {categories.map(category => (
                    <CategoryChip
                      key={category.id}
                      icon={category.icon}
                      label={category.name}
                      onClick={() => handleCategoryChange(category.id)}
                      isActive={selectedCategory === category.id ? 1 : 0}
                      categoryColor={category.color}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Lista de Contactos */}
        {filteredContacts.length > 0 ? (
          <Fade in={true} timeout={800}>
            <Grid container spacing={3} sx={{ mb: 8 }}>
              {filteredContacts.map(contact => (
                <Grid item xs={12} md={6} lg={4} key={contact.id}>
                  <ContactCard 
                    accentColor={contact.categoryColor} 
                    isEmergency={contact.isEmergency ? 1 : 0}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" component="h3" fontWeight={600}>
                          {contact.name}
                        </Typography>
                        
                        <Chip 
                          label={contact.category === 'emergency' ? 'Emergencia' : 
                                contact.category === 'shelter' ? 'Albergue' :
                                contact.category === 'legal' ? 'Apoyo Legal' :
                                contact.category === 'health' ? 'Salud' :
                                contact.category === 'mental' ? 'Apoyo Psicológico' : 
                                contact.category}
                          size="small"
                          sx={{ 
                            bgcolor: alpha(contact.categoryColor, 0.1),
                            color: contact.categoryColor,
                            fontWeight: 500,
                            borderRadius: '12px',
                          }}
                          icon={contact.categoryIcon}
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {contact.description}
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box sx={{ mt: 2 }}>
                        {contact.phone && (
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                            <PhoneIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5, mt: 0.3 }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Teléfono:
                              </Typography>
                              <Typography variant="body2" fontWeight={contact.isEmergency ? 600 : 400}>
                                {contact.phone}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                        
                        {contact.email && (
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                            <EmailIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5, mt: 0.3 }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Correo:
                              </Typography>
                              <Typography variant="body2">
                                {contact.email}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                        
                        {contact.address && (
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                            <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5, mt: 0.3 }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Dirección:
                              </Typography>
                              <Typography variant="body2">
                                {contact.address}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                        
                        {contact.website && (
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                            <LanguageIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5, mt: 0.3 }} />
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Sitio web:
                              </Typography>
                              <Typography 
                                variant="body2" 
                                component="a"
                                href={`https://${contact.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ 
                                  color: 'primary.main',
                                  textDecoration: 'none',
                                  '&:hover': { textDecoration: 'underline' }
                                }}
                              >
                                {contact.website}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                      
                      {contact.services && contact.services.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                            Servicios:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {contact.services.map((service, index) => (
                              <Chip 
                                key={index} 
                                label={service} 
                                size="small"
                                sx={{ 
                                  borderRadius: '10px',
                                  bgcolor: 'background.default',
                                  border: `1px solid ${theme.palette.divider}`,
                                  fontSize: '0.75rem',
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                      
                      {contact.phone && (
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            variant={contact.isEmergency ? 'contained' : 'outlined'}
                            size="small"
                            color={contact.isEmergency ? 'error' : 'primary'}
                            startIcon={<PhoneIcon />}
                            href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                            sx={{ 
                              borderRadius: '20px',
                              px: 2,
                              fontWeight: 500,
                              textTransform: 'none'
                            }}
                          >
                            Llamar
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </ContactCard>
                </Grid>
              ))}
            </Grid>
          </Fade>
        ) : (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 6, 
              textAlign: 'center',
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              borderRadius: 3,
              mb: 6,
            }}
          >
            <SearchIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {t('contacts.noResults')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('contacts.tryAgain')}
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 3 }}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Mostrar todos los contactos
            </Button>
          </Paper>
        )}
      </Container>

      {/* Formulario de Contacto */}
      <Box sx={{ bgcolor: alpha(theme.palette.background.paper, 0.6), py: 10 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <GradientText
              variant="h3"
              component="h2"
              fontWeight={700}
              variant="primary"
            >
              {t('contacts.form.title')}
            </GradientText>
            
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 700, mx: 'auto' }}
            >
              {t('contacts.form.description')}
            </Typography>
            
            <ElegantBar width={60} height={3} sx={{ mx: 'auto', my: 3 }} />
          </Box>
          
          <Paper 
            elevation={2}
            sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: 3
            }}
          >
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.name')}
                    variant="outlined"
                    required
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.email')}
                    variant="outlined"
                    type="email"
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.subject')}
                    variant="outlined"
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.message')}
                    variant="outlined"
                    multiline
                    rows={6}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<SendIcon />}
                      type="submit"
                      sx={{ 
                        px: 4,
                        py: 1.5,
                        borderRadius: '28px',
                        fontWeight: 600
                      }}
                    >
                      {t('contacts.form.submit')}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default ContactsPage;
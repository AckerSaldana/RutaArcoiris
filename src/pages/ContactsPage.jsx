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
  useTheme,
  useMediaQuery,
  alpha,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import WarningIcon from '@mui/icons-material/Warning';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import FilterListIcon from '@mui/icons-material/FilterList';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import GavelIcon from '@mui/icons-material/Gavel';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PsychologyIcon from '@mui/icons-material/Psychology';

import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import ContactCard from '../components/common/ContactCard';
import { useLanguage } from '../context/LanguageContext';

// Categoría chip elegante y minimalista
const CategoryChip = styled(Chip)(({ theme, isActive, categoryColor }) => ({
  borderRadius: 0,
  fontWeight: isActive ? 500 : 400,
  backgroundColor: isActive 
    ? alpha(categoryColor || theme.palette.primary.main, 0.07) 
    : 'transparent',
  color: isActive 
    ? (categoryColor || theme.palette.primary.main) 
    : theme.palette.text.primary,
  border: isActive 
    ? `1px solid ${categoryColor || theme.palette.primary.main}` 
    : `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: isActive 
      ? alpha(categoryColor || theme.palette.primary.main, 0.1) 
      : alpha(theme.palette.action.hover, 0.5),
  },
}));

// Tarjeta de emergencia minimalista
const EmergencyCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 0,
  boxShadow: 'none',
  border: 'none',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  position: 'relative',
  borderLeft: `2px solid ${theme.palette.error.main}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
}));

// Icono de categoría circular minimalista
const CategoryIcon = styled(Box)(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
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
      <Box sx={{ bgcolor: 'background.default', pt: 6, pb: 10 }}>
        <Container maxWidth="lg">
          <PageHeader
            title="Contactos y Soporte"
            subtitle="Directorio de organizaciones, albergues y líneas de ayuda para migrantes LGBTQ+"
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
              <Typography 
                variant="h6" 
                component="p"
                sx={{ 
                  mb: 1,
                  color: 'text.secondary',
                  letterSpacing: '0.05em',
                  fontWeight: 400
                }}
              >
                CONTACTOS DE EMERGENCIA
              </Typography>
            </Box>
            
            <Divider sx={{ width: 40, mb: 4 }} />
            
            <Grid container spacing={3}>
              {emergencyContacts.map(contact => (
                <Grid item xs={12} md={6} key={contact.id}>
                  <EmergencyCard>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" component="h3" gutterBottom fontWeight={400} letterSpacing="0.02em">
                        {contact.name}
                      </Typography>
                      
                      <Typography variant="body2" paragraph color="text.secondary">
                        {contact.description}
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        p: 3,
                        mt: 2,
                        bgcolor: 'background.paper',
                        border: `1px solid ${theme.palette.divider}`,
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
                          <Typography variant="h3" component="p" fontWeight={300}>
                            {contact.phone}
                          </Typography>
                        </Box>
                        <Button 
                          variant="outlined" 
                          color="error" 
                          sx={{ ml: 'auto', borderRadius: 0 }}
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
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 6, 
            borderRadius: 0,
            border: `1px solid ${theme.palette.divider}`,
            borderTop: 'none',
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
                  sx: {
                    borderRadius: 0,
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={400} sx={{ letterSpacing: '0.02em' }}>
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
          <Box>
            <Typography 
              variant="h6" 
              component="p"
              sx={{ 
                mb: 1,
                color: 'text.secondary',
                letterSpacing: '0.05em',
                fontWeight: 400
              }}
            >
              ORGANIZACIONES DE APOYO
            </Typography>
            
            <Divider sx={{ width: 40, mb: 4 }} />
            
            <Fade in={true} timeout={800}>
              <Grid container spacing={3} sx={{ mb: 8 }}>
                {filteredContacts.map(contact => (
                  <Grid item xs={12} md={6} lg={4} key={contact.id}>
                    <ContactCard 
                      name={contact.name}
                      description={contact.description}
                      phone={contact.phone}
                      email={contact.email}
                      address={contact.address}
                      website={contact.website}
                      category={
                        contact.category === 'emergency' ? 'Emergencia' : 
                        contact.category === 'shelter' ? 'Albergue' :
                        contact.category === 'legal' ? 'Apoyo Legal' :
                        contact.category === 'health' ? 'Salud' :
                        contact.category === 'mental' ? 'Apoyo Psicológico' : 
                        contact.category
                      }
                      categoryIcon={contact.categoryIcon}
                      categoryColor={contact.categoryColor}
                      services={contact.services}
                      isEmergency={contact.isEmergency}
                    />
                  </Grid>
                ))}
              </Grid>
            </Fade>
          </Box>
        ) : (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 6, 
              textAlign: 'center',
              bgcolor: 'background.paper',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 0,
              borderTop: 'none',
              mb: 6,
            }}
          >
            <SearchIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight={400}>
              {t('contacts.noResults')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('contacts.tryAgain')}
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 3, borderRadius: 0 }}
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
      <Box sx={{ py: 10, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h6" 
              component="p"
              sx={{ 
                mb: 2,
                color: 'text.secondary',
                letterSpacing: '0.05em',
                fontWeight: 400
              }}
            >
              CONTÁCTANOS
            </Typography>
            
            <Divider sx={{ width: 40, mx: 'auto', mb: 4 }} />
            
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight={300}
            >
              {t('contacts.form.title')}
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 700, mx: 'auto' }}
            >
              {t('contacts.form.description')}
            </Typography>
          </Box>
          
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: 0,
              border: `1px solid ${theme.palette.divider}`,
              borderTop: 'none',
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
                    InputProps={{
                      sx: {
                        borderRadius: 0,
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.email')}
                    variant="outlined"
                    type="email"
                    required
                    InputProps={{
                      sx: {
                        borderRadius: 0,
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('contacts.form.subject')}
                    variant="outlined"
                    required
                    InputProps={{
                      sx: {
                        borderRadius: 0,
                      }
                    }}
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
                    InputProps={{
                      sx: {
                        borderRadius: 0,
                      }
                    }}
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
                        borderRadius: 0,
                        fontWeight: 400
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
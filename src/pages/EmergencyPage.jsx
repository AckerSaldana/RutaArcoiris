// src/pages/EmergencyPage.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Paper, 
  Button, 
  Divider, 
  Card, 
  CardContent,
  useTheme 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HelpIcon from '@mui/icons-material/Help';
import SosIcon from '@mui/icons-material/SOS';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import AlertBanner from '../components/common/AlertBanner';
import { useLanguage } from '../context/LanguageContext';

const EmergencyPage = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  
  // Contactos de emergencia
  const emergencyContacts = [
    {
      id: 1,
      name: 'Emergencias Nacionales',
      phone: '911',
      description: 'Para situaciones que requieren intervención inmediata de policía, ambulancias o bomberos.',
      primary: true,
    },
    {
      id: 2,
      name: 'Línea de Crisis LGBTQ+',
      phone: '55-5533-5533',
      description: 'Servicio de atención para crisis emocionales y situaciones de emergencia para la comunidad LGBTQ+.',
      primary: true,
    },
    {
      id: 3,
      name: 'Comisión Nacional de Derechos Humanos',
      phone: '800-715-2000',
      description: 'Para reportar violaciones a derechos humanos por parte de autoridades.',
      primary: false,
    },
    {
      id: 4,
      name: 'Casa Arcoíris - Emergencias',
      phone: '55-1234-5678',
      description: 'Línea directa para situaciones de emergencia relacionadas con migrantes LGBTQ+.',
      primary: false,
    },
  ];
  
  // Albergues de emergencia
  const emergencyShelters = [
    {
      id: 1,
      name: 'Casa Arcoíris - CDMX',
      address: 'Calle ejemplo #123, Col. Centro, Ciudad de México',
      phone: '55-1234-5678',
      hours: '24 horas',
    },
    {
      id: 2,
      name: 'Refugio Diversidad - Tijuana',
      address: 'Av. Ejemplo #456, Col. Zona Norte, Tijuana, BC',
      phone: '664-123-4567',
      hours: '24 horas',
    },
    {
      id: 3,
      name: 'Albergue Arcoíris Tapachula',
      address: 'Calle ejemplo #303, Col. Centro, Tapachula, Chiapas',
      phone: '962-123-4567',
      hours: '8:00 AM - 8:00 PM',
    },
  ];

  return (
    <Layout>
      <Box sx={{ 
        bgcolor: 'error.main', 
        color: 'white', 
        py: 2,
        mb: 4,
        textAlign: 'center',
      }}>
        <Container maxWidth="lg">
          <Typography variant="h5" component="h1" fontWeight={600}>
            PÁGINA DE EMERGENCIA
          </Typography>
        </Container>
      </Box>
      
      <PageHeader
        title="Contactos y Recursos de Emergencia"
        subtitle="Información vital para situaciones que requieren atención inmediata"
        breadcrumbs={[{ label: 'Emergencia', path: '/emergencia' }]}
      />

      <AlertBanner
        type="warning"
        title="Si estás en peligro inmediato"
        message="Si tu vida o integridad física están en peligro inmediato, llama al 911 o contacta a las autoridades locales de inmediato."
        icon={<WarningIcon fontSize="large" />}
        sx={{ mb: 4 }}
      />

      {/* Contactos de Emergencia Principales */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        <SosIcon sx={{ mr: 1 }} color="error" />
        Contactos de Emergencia
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {emergencyContacts.filter(contact => contact.primary).map(contact => (
          <Grid item xs={12} md={6} key={contact.id}>
            <Card 
              elevation={3}
              sx={{ 
                borderLeft: `6px solid ${theme.palette.error.main}`,
                background: `linear-gradient(90deg, ${theme.palette.error.main}10 0%, rgba(255,255,255,0) 50%)`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                  {contact.name}
                </Typography>
                
                <Typography variant="body2" paragraph>
                  {contact.description}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mt: 2,
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 1,
                }}>
                  <PhoneIcon 
                    fontSize="large" 
                    sx={{ mr: 2, color: theme.palette.error.main }} 
                  />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
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
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Albergues de Emergencia */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        <LocationOnIcon sx={{ mr: 1 }} color="primary" />
        Albergues de Emergencia
      </Typography>
      
      <Typography variant="body1" paragraph>
        Estos albergues ofrecen refugio seguro para migrantes LGBTQ+ en situación de emergencia.
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {emergencyShelters.map(shelter => (
          <Grid item xs={12} md={4} key={shelter.id}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                  {shelter.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {shelter.address}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {shelter.phone}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Horario:</strong> {shelter.hours}
                  </Typography>
                </Box>
                
                <Button 
                  variant="outlined" 
                  color="primary" 
                  fullWidth
                  href={`tel:${shelter.phone.replace(/[^0-9]/g, '')}`}
                  startIcon={<PhoneIcon />}
                >
                  Llamar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Otros Contactos */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
        <HelpIcon sx={{ mr: 1 }} color="secondary" />
        Otros Contactos de Ayuda
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {emergencyContacts.filter(contact => !contact.primary).map(contact => (
          <Grid item xs={12} md={6} key={contact.id}>
            <Card elevation={1} sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                  {contact.name}
                </Typography>
                
                <Typography variant="body2" paragraph color="text.secondary">
                  {contact.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1" fontWeight={500}>
                      {contact.phone}
                    </Typography>
                  </Box>
                  <Button 
                    variant="text" 
                    color="primary" 
                    sx={{ ml: 'auto' }}
                    href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                    startIcon={<PhoneIcon />}
                  >
                    Llamar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Botón de volver */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/contactos"
          size="large"
        >
          Ver todos los contactos
        </Button>
      </Box>
    </Layout>
  );
};

export default EmergencyPage;
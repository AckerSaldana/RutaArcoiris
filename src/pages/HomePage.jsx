// src/pages/HomePage.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Container, 
  Paper,
  Card, 
  CardContent,
  Divider,
  useTheme, 
  useMediaQuery,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import WarningIcon from '@mui/icons-material/Warning';
import ShieldIcon from '@mui/icons-material/Shield';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Layout from '../components/layout/Layout';
import { 
  GradientText
} from '../theme/CustomStyles';
import { useLanguage } from '../context/LanguageContext';

// Sección hero minimalista y simétrica
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    minHeight: '70vh',
  },
}));

// Decoración de fondo para el hero - línea minimalista
const HeroDecoration = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  right: 0,
  transform: 'translateY(-50%)',
  width: '45%',
  height: '1px',
  backgroundColor: theme.palette.divider,
  zIndex: 0,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

// Botón CTA principal minimalista
const MainCTAButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  fontSize: '0.875rem',
  fontWeight: 400,
  borderRadius: 0,
  boxShadow: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
  },
}));

// Botón CTA secundario minimalista
const SecondaryCTAButton = styled(Button)(({ theme }) => ({
  padding: '11px 24px',
  fontSize: '0.875rem',
  fontWeight: 400,
  borderRadius: 0,
  borderWidth: 1,
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));

// Tarjeta de servicio minimalista y simétrica
const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 0,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    border: `1px solid ${theme.palette.text.primary}`,
    transform: 'translateY(-4px)',
  },
}));

// Icono de servicio minimalista
const ServiceIcon = styled(Box)(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

// Tarjeta de alerta para emergencias minimalista
const AlertCard = styled(Box)(({ theme }) => ({
  borderRadius: 0,
  border: `1px solid ${theme.palette.error.main}`,
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
}));

// Botón de emergencia mejorado
const EmergencyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  fontWeight: 400,
  borderRadius: 0,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const HomePage = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Servicios principales
  const services = [
    {
      title: 'Rutas Seguras',
      description: 'Información actualizada sobre rutas migratorias seguras, albergues y puntos de apoyo para la comunidad LGBTQ+.',
      icon: <MapIcon sx={{ fontSize: 24 }} />,
      linkText: 'Explorar rutas',
      linkTo: '/rutas',
    },
    {
      title: 'Contactos de Apoyo',
      description: 'Directorio de organizaciones, albergues y líneas de ayuda para migrantes de la comunidad LGBTQ+.',
      icon: <PhoneIcon sx={{ fontSize: 24 }} />,
      linkText: 'Ver contactos',
      linkTo: '/contactos',
    },
    {
      title: 'Conoce tus Derechos',
      description: 'Información sobre los derechos de los migrantes LGBTQ+ en México y cómo protegerte durante tu trayecto.',
      icon: <ShieldIcon sx={{ fontSize: 24 }} />,
      linkText: 'Informarte',
      linkTo: '/derechos',
    },
  ];

  return (
    <Layout maxWidth={false} disablePadding>
      {/* Hero Section */}
      <HeroSection>
        <HeroDecoration />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
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
                  APOYO PARA MIGRANTES LGBTQ+
                </Typography>
                
                <Divider sx={{ width: 40, mb: 4 }} />
                
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 300, 
                    mb: 2,
                    lineHeight: 1.2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' } 
                  }}
                >
                  Apoyo para migrantes LGBTQ+
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  component="div" 
                  color="text.secondary"
                  sx={{ 
                    mb: 4, 
                    maxWidth: '90%',
                    fontWeight: 400,
                    lineHeight: 1.5
                  }}
                >
                  Información, recursos y contactos seguros para tu trayecto por México
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  gap: 2, 
                  mt: 6 
                }}>
                  <EmergencyButton
                    component={RouterLink}
                    to="/emergencia"
                    variant="contained"
                    startIcon={<WarningIcon />}
                  >
                    Contactos de emergencia
                  </EmergencyButton>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                  position: 'relative', 
                  zIndex: 1,
                  display: { xs: 'none', md: 'block' },
                  textAlign: 'center',
                  p: 4
                }}>
                  {/* Placeholder para una imagen/ilustración - Reemplazar con imagen real */}
                  <Box
                    component="img"
                    src="/api/placeholder/600/400"
                    alt="Migrantes LGBTQ+"
                    sx={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: 0,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    }}
                  />
                </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>
      
      {/* Servicios Section - Simétrico y centrado */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
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
              NUESTROS SERVICIOS
            </Typography>
            
            <Divider sx={{ width: 40, mx: 'auto', mb: 4 }} />
            
            <Typography 
              variant="h3" 
              component="h2" 
              align="center"
              sx={{ 
                fontWeight: 300,
                mb: 2
              }}
            >
              ¿Cómo podemos ayudarte?
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              align="center"
              sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}
            >
              Recursos diseñados para apoyar tu trayecto migratorio
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ServiceCard elevation={0}>
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <ServiceIcon>
                      {service.icon}
                    </ServiceIcon>
                    
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 400 }}>
                      {service.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 'auto', pb: 2 }}>
                      {service.description}
                    </Typography>
                    
                    <Button
                      component={RouterLink}
                      to={service.linkTo}
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        alignSelf: 'flex-start', 
                        mt: 'auto',
                        fontWeight: 400,
                        p: 0,
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: 'primary.main',
                        }
                      }}
                    >
                      {service.linkText}
                    </Button>
                  </CardContent>
                </ServiceCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* About Section */}
      <Box sx={{ py: 10, backgroundColor: alpha(theme.palette.background.paper, 0.4) }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box>
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
                  SOBRE NOSOTROS
                </Typography>
                
                <Divider sx={{ width: 40, mb: 4 }} />
                
                <Typography 
                  variant="h3" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 300,
                    mb: 2 
                  }}
                >
                  Red Arcoíris
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  color="text.secondary" 
                  sx={{ mb: 3 }}
                >
                  Un espacio para migrantes LGBTQ+ en tránsito por México
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                  Red Arcoíris es una iniciativa que brinda información esencial y recursos para personas migrantes LGBTQ+ en México, ofreciendo rutas seguras, contactos importantes y apoyo a lo largo de tu viaje.
                </Typography>
                
                <Button
                  component={RouterLink}
                  to="/about"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    fontWeight: 400,
                    p: 0,
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'primary.main',
                    }
                  }}
                >
                  Conoce más sobre nosotros
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 0, border: `1px solid ${theme.palette.divider}` }}>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      p: 3, 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderBottom: { xs: `1px solid ${theme.palette.divider}`, md: 'none' },
                      borderRight: { xs: 'none', md: `1px solid ${theme.palette.divider}` },
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1.5 
                        }}>
                          <FavoriteIcon />
                        </Box>
                        <Typography variant="h6" fontWeight={400}>
                          Nuestra Misión
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Buscamos resolver la desinformación, discriminación y falta de apoyo que enfrentan las personas migrantes LGBTQ+, ayudándoles a sentirse seguras y apoyadas durante su viaje.
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      p: 3, 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: alpha(theme.palette.background.light, 0.5) 
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1.5 
                        }}>
                          <InfoIcon />
                        </Box>
                        <Typography variant="h6" fontWeight={400}>
                          ¿Por qué es importante?
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Los inmigrantes de la comunidad LGBTQ+ se enfrentan a múltiples desafíos, incluyendo abuso físico, discriminación y desconocimiento de sus derechos como migrantes.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Emergency Alert Section */}
      <Box sx={{ py: 8, backgroundColor: alpha(theme.palette.background.paper, 0.6) }}>
        <Container maxWidth="lg">
          <AlertCard>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ 
                  fontWeight: 300, 
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.error.main
                }}
              >
                <WarningIcon sx={{ mr: 1.5 }} fontSize="large" />
                ¿Necesitas ayuda urgente?
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ maxWidth: 700 }}>
                Si estás en una situación de emergencia o peligro inmediato, contacta a las líneas de ayuda disponibles:
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 0,
                      border: `1px solid ${theme.palette.error.main}`,
                    }}
                  >
                    <Typography variant="h6" gutterBottom color="text.primary" fontWeight={400}>
                      Emergencias Nacionales
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="h3" component="p" fontWeight={300} color="error.main">
                        911
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        href="tel:911"
                        startIcon={<PhoneIcon />}
                        sx={{ borderRadius: 0 }}
                      >
                        Llamar
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 0,
                      border: `1px solid ${theme.palette.warning.main}`,
                    }}
                  >
                    <Typography variant="h6" gutterBottom color="text.primary" fontWeight={400}>
                      Línea de Crisis LGBTQ+
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="h3" component="p" fontWeight={300} color="warning.main">
                        55-5533-5533
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color="warning" 
                        href="tel:5555335533"
                        startIcon={<PhoneIcon />}
                        sx={{ borderRadius: 0 }}
                      >
                        Llamar
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <EmergencyButton
                  component={RouterLink}
                  to="/contactos"
                  variant="contained"
                  startIcon={<WarningIcon />}
                  size="large"
                >
                  Ver todos los contactos de emergencia
                </EmergencyButton>
              </Box>
            </Box>
          </AlertCard>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box sx={{ 
        py: 10, 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
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
            EXPLORA NUESTROS RECURSOS
          </Typography>
          
          <Divider sx={{ width: 40, mx: 'auto', mb: 4 }} />
          
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 300, mb: 2 }}
          >
            Comienza a explorar los recursos disponibles
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}
          >
            Descubre toda la información y apoyo que tenemos para ti. Tu seguridad y bienestar son nuestra prioridad.
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'center',
            gap: 2,
            mt: 6,
          }}>
            <MainCTAButton
              component={RouterLink}
              to="/rutas"
              variant="contained"
              size="large"
            >
              Rutas Seguras
            </MainCTAButton>
            
            <SecondaryCTAButton
              component={RouterLink}
              to="/contactos"
              variant="outlined"
              size="large"
            >
              Contactos
            </SecondaryCTAButton>
            
            <SecondaryCTAButton
              component={RouterLink}
              to="/recursos"
              variant="outlined"
              size="large"
            >
              Recursos
            </SecondaryCTAButton>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default HomePage;
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
  alpha,
  IconButton,
  Fade,
  Slide
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
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import Layout from '../components/layout/Layout';
import { 
  ElegantBar, 
  GradientText, 
  ElegantSection, 
  ElegantCard 
} from '../theme/CustomStyles';
import { useLanguage } from '../context/LanguageContext';

// Sección hero elegante
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '85vh',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    minHeight: '60vh',
  },
}));

// Decoración de fondo para el hero
const HeroDecoration = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: '50%',
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.03)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
  clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 20% 0)',
  zIndex: 0,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    clipPath: 'none',
    background: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 1)} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
  },
}));

// Círculo decorativo
const DecorativeCircle = styled(Box)(({ theme, size = 300, color, opacity = 0.03, top, left, right, bottom }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: color || theme.palette.primary.main,
  opacity: opacity,
  top: top,
  left: left,
  right: right,
  bottom: bottom,
  zIndex: 0,
}));

// Botón CTA principal
const MainCTAButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  },
}));

// Botón CTA secundario
const SecondaryCTAButton = styled(Button)(({ theme }) => ({
  padding: '11px 24px',
  fontSize: '1rem',
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  borderWidth: 2,
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    borderWidth: 2,
  },
}));

// Tarjeta de servicio
const ServiceCard = styled(Card)(({ theme, color }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    borderColor: 'transparent',
    '& .MuiCardContent-root': {
      borderColor: 'transparent',
    },
    '&::before': {
      opacity: 1,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: color || theme.palette.primary.main,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
}));

// Icono de servicio
const ServiceIcon = styled(Box)(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: '12px',
  backgroundColor: alpha(color || theme.palette.primary.main, 0.1),
  color: color || theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

// Tarjeta de alerta para emergencias
const AlertCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  background: alpha(theme.palette.error.light, 0.15),
  border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
}));

const HomePage = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Servicios principales
  const services = [
    {
      title: t('home.service1.title'),
      description: t('home.service1.description'),
      icon: <MapIcon sx={{ fontSize: 28 }} />,
      linkText: t('home.service1.link'),
      linkTo: '/rutas',
      color: theme.palette.primary.main,
    },
    {
      title: t('home.service2.title'),
      description: t('home.service2.description'),
      icon: <PhoneIcon sx={{ fontSize: 28 }} />,
      linkText: t('home.service2.link'),
      linkTo: '/contactos',
      color: '#E91E63', // Rosa
    },
    {
      title: t('home.service3.title'),
      description: t('home.service3.description'),
      icon: <ShieldIcon sx={{ fontSize: 28 }} />,
      linkText: t('home.service3.link'),
      linkTo: '/derechos',
      color: '#2196F3', // Azul
    },
  ];

  return (
    <Layout maxWidth={false} disablePadding>
      {/* Hero Section */}
      <HeroSection>
        <HeroDecoration />
        <DecorativeCircle 
          size={500} 
          top="-250px" 
          right="-100px" 
          color={theme.palette.primary.main}
          opacity={0.03}
        />
        <DecorativeCircle 
          size={300} 
          bottom="-150px" 
          left="10%" 
          color={theme.palette.secondary.main}
          opacity={0.02}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <ElegantBar width={80} height={4} sx={{ mb: 3 }} />
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 800, 
                      mb: 2,
                      lineHeight: 1.2,
                      fontSize: { xs: '2.5rem', md: '3.5rem' } 
                    }}
                  >
                    {t('home.hero.title')}
                  </Typography>
                  
                  <Typography 
                    variant="h5" 
                    component="div" 
                    color="text.secondary"
                    sx={{ 
                      mb: 4, 
                      maxWidth: '90%',
                      fontWeight: 400,
                      lineHeight: 1.5
                    }}
                  >
                    {t('home.hero.subtitle')}
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    gap: 2, 
                    mt: 4 
                  }}>
                    <MainCTAButton
                      component={RouterLink}
                      to="/rutas"
                      endIcon={<ArrowForwardIcon />}
                    >
                      {t('home.hero.cta1')}
                    </MainCTAButton>
                    
                    <SecondaryCTAButton
                      component={RouterLink}
                      to="/contactos"
                      variant="outlined"
                    >
                      {t('home.hero.cta2')}
                    </SecondaryCTAButton>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={true} timeout={800} mountOnEnter unmountOnExit>
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
                      borderRadius: 4,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      transform: 'perspective(1000px) rotateY(-5deg)',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'perspective(1000px) rotateY(0deg)',
                      },
                    }}
                  />
                  
                  {/* Elemento decorativo */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: alpha(theme.palette.primary.main, 0.1),
                      zIndex: -1,
                    }}
                  />
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>
      
      {/* About Section */}
      <Box sx={{ py: 10, backgroundColor: alpha(theme.palette.background.paper, 0.4) }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <GradientText 
                    variant="h3" 
                    component="h2" 
                    fontWeight={700}
                    variant="primary"
                  >
                    {t('home.about.title')}
                  </GradientText>
                  
                  <Typography 
                    variant="subtitle1" 
                    color="text.secondary" 
                    sx={{ mt: 2, mb: 3 }}
                  >
                    {t('home.about.subtitle')}
                  </Typography>
                  
                  <ElegantBar width={60} height={3} sx={{ mb: 3 }} />
                  
                  <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                    {t('home.about.description')}
                  </Typography>
                  
                  <Button
                    component={RouterLink}
                    to="/about"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      fontWeight: 600,
                      p: 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        transform: 'translateX(4px)',
                      }
                    }}
                  >
                    Conoce más sobre nosotros
                  </Button>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 3 }}>
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
                          width: 40, 
                          height: 40, 
                          borderRadius: '12px', 
                          backgroundColor: alpha(theme.palette.error.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1.5 
                        }}>
                          <FavoriteIcon color="error" />
                        </Box>
                        <Typography variant="h6" fontWeight={600}>
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
                      bgcolor: alpha(theme.palette.primary.main, 0.03) 
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '12px', 
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1.5 
                        }}>
                          <InfoIcon color="primary" />
                        </Box>
                        <Typography variant="h6" fontWeight={600}>
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
      
      {/* Services Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <GradientText
              variant="h3"
              component="h2"
              fontWeight={700}
              variant="primary"
            >
              {t('home.services.title')}
            </GradientText>
            
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto', mt: 2, mb: 1 }}
            >
              {t('home.services.subtitle')}
            </Typography>
            
            <ElegantBar sx={{ width: 60, mx: 'auto', my: 3 }} />
          </Box>
          
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ServiceCard elevation={0} color={service.color}>
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <ServiceIcon color={service.color}>
                      {service.icon}
                    </ServiceIcon>
                    
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 'auto', pb: 2 }}>
                      {service.description}
                    </Typography>
                    
                    <Button
                      component={RouterLink}
                      to={service.linkTo}
                      endIcon={<KeyboardArrowRightIcon />}
                      sx={{ 
                        alignSelf: 'flex-start', 
                        mt: 'auto',
                        fontWeight: 600,
                        color: service.color,
                        '&:hover': {
                          backgroundColor: alpha(service.color, 0.08),
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
      
      {/* Emergency Alert Section */}
      <Box sx={{ py: 8, backgroundColor: alpha(theme.palette.background.paper, 0.6) }}>
        <Container maxWidth="lg">
          <AlertCard>
            <Box 
              sx={{ 
                position: 'absolute',
                top: -30,
                right: -30,
                width: 150,
                height: 150,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.error.main, 0.05),
                zIndex: 0,
              }}
            />
          
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.error.dark
                }}
              >
                <WarningIcon sx={{ mr: 1.5 }} fontSize="large" />
                {t('home.emergency.title')}
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ maxWidth: 700 }}>
                {t('home.emergency.description')}
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      bgcolor: alpha(theme.palette.error.main, 0.06),
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                    }}
                  >
                    <Typography variant="h6" gutterBottom color="error.dark" fontWeight={600}>
                      {t('home.emergency.national')}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="h3" component="p" fontWeight={700} color="error.main">
                        911
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="error" 
                        href="tel:911"
                        startIcon={<PhoneIcon />}
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
                      bgcolor: alpha(theme.palette.warning.main, 0.06),
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                    }}
                  >
                    <Typography variant="h6" gutterBottom color="warning.dark" fontWeight={600}>
                      {t('home.emergency.lgbtq')}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="h3" component="p" fontWeight={700} color="warning.main">
                        55-5533-5533
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="warning" 
                        href="tel:5555335533"
                        startIcon={<PhoneIcon />}
                      >
                        Llamar
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  component={RouterLink}
                  to="/contactos"
                  variant="outlined"
                  color="error"
                  startIcon={<WarningIcon />}
                  size="large"
                >
                  {t('home.emergency.viewAll')}
                </Button>
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
        <DecorativeCircle 
          size={400} 
          bottom="-200px" 
          left="-200px" 
          color={theme.palette.primary.main}
          opacity={0.02}
        />
        <DecorativeCircle 
          size={300} 
          top="-150px" 
          right="-150px" 
          color={theme.palette.secondary.main}
          opacity={0.02}
        />
      
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700 }}
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
            mt: 4,
          }}>
            <Button
              component={RouterLink}
              to="/rutas"
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontWeight: 600 }}
            >
              Rutas Seguras
            </Button>
            
            <Button
              component={RouterLink}
              to="/contactos"
              variant="outlined"
              color="primary"
              size="large"
              sx={{ fontWeight: 600 }}
            >
              Contactos
            </Button>
            
            <Button
              component={RouterLink}
              to="/recursos"
              variant="outlined"
              color="primary"
              size="large"
              sx={{ fontWeight: 600 }}
            >
              Recursos
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default HomePage;
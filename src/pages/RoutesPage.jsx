// src/pages/RoutesPage.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Paper, 
  Tabs, 
  Tab, 
  ButtonGroup, 
  Button, 
  Divider,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RouteIcon from '@mui/icons-material/Route';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsIcon from '@mui/icons-material/Directions';

import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import AlertBanner from '../components/common/AlertBanner';
import RouteSafetyCard from '../components/common/RouteSafetyCard';
import ContentCard from '../components/common/ContentCard';
import { useLanguage } from '../context/LanguageContext';

// Mapa estilizado (simulado)
const MapContainer = styled(Paper)(({ theme }) => ({
  height: 400,
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.grey[100],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

// Componente de punto en el mapa
const MapPoint = styled(Box)(({ theme, active, color }) => ({
  position: 'absolute',
  width: active ? 20 : 16,
  height: active ? 20 : 16,
  borderRadius: '50%',
  backgroundColor: active ? (color || theme.palette.primary.main) : theme.palette.grey[400],
  border: `2px solid ${theme.palette.background.paper}`,
  boxShadow: active ? theme.shadows[3] : 'none',
  transform: active ? 'scale(1.2)' : 'scale(1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  zIndex: active ? 2 : 1,
  '&:hover': {
    transform: 'scale(1.3)',
    boxShadow: theme.shadows[4],
  },
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 36,
    height: 36,
    borderRadius: '50%',
    backgroundColor: `${color || theme.palette.primary.main}20`,
    zIndex: -1,
  } : {},
}));

// Componente de ruta en el mapa
const MapPath = styled(Box)(({ theme, active, color }) => ({
  position: 'absolute',
  height: 4,
  backgroundColor: active ? (color || theme.palette.primary.main) : `${theme.palette.grey[400]}90`,
  opacity: active ? 1 : 0.6,
  borderRadius: 2,
  transition: 'all 0.3s ease',
}));

const RoutesPage = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Estado para la región activa
  const [activeRegion, setActiveRegion] = useState('all');
  
  // Estado para la ruta seleccionada
  const [selectedRoute, setSelectedRoute] = useState('south');
  
  // Datos de las rutas
  const routes = {
    south: {
      id: 'south',
      title: 'Ruta Sur - Frontera con Guatemala',
      description: 'Esta ruta cubre el trayecto desde la frontera sur con Guatemala hasta el sur de México, incluyendo Chiapas, Oaxaca y Veracruz.',
      image: '/api/placeholder/600/300',
      safePoints: [
        'Casa Arcoíris Tapachula',
        'Centro de Apoyo Diverso Oaxaca',
        'Refugio Arcoíris Veracruz',
      ],
      dangerPoints: [
        'Evitar viajar solo/a por zonas rurales aisladas entre Tapachula y Tuxtla Gutiérrez',
        'Precaución en terminales de autobuses de Arriaga y Tonalá durante la noche',
        'Evitar compartir información personal con desconocidos en el trayecto',
      ],
      tips: [
        'Mantén tus documentos en un lugar seguro y lleva copias digitales',
        'Utiliza el transporte público durante el día',
        'Mantén contacto regular con organizaciones de apoyo',
        'Descarga aplicaciones de geolocalización que funcionen sin internet',
      ],
      mapPoints: [
        { x: 60, y: 300, name: 'Tapachula', type: 'city' },
        { x: 120, y: 250, name: 'Tuxtla Gutiérrez', type: 'city' },
        { x: 180, y: 200, name: 'Oaxaca', type: 'city' },
        { x: 240, y: 180, name: 'Veracruz', type: 'city' },
      ],
      color: theme.palette.success.main,
    },
    center: {
      id: 'center',
      title: 'Ruta Centro - Ciudad de México',
      description: 'Esta ruta cubre la Ciudad de México y estados circundantes, incluyendo numerosos recursos para la comunidad LGBTQ+.',
      image: '/api/placeholder/600/300',
      safePoints: [
        'Casa Arcoíris CDMX',
        'Centro Comunitario de Atención a la Diversidad',
        'Albergue Zona Rosa',
      ],
      dangerPoints: [
        'Evitar zonas periféricas de la ciudad durante la noche',
        'Precaución en el transporte público en horas pico',
        'Estar alerta en zonas turísticas concurridas donde pueden ocurrir robos',
      ],
      tips: [
        'Utiliza aplicaciones oficiales para el transporte en la ciudad',
        'Mantén comunicación con las organizaciones de apoyo',
        'Lleva siempre contigo identificación y contactos de emergencia',
        'Familiarízate con el sistema de transporte público (Metro, Metrobús)',
      ],
      mapPoints: [
        { x: 240, y: 180, name: 'Veracruz', type: 'city' },
        { x: 300, y: 160, name: 'Puebla', type: 'city' },
        { x: 250, y: 140, name: 'Ciudad de México', type: 'city' },
        { x: 200, y: 120, name: 'Querétaro', type: 'city' },
      ],
      color: theme.palette.info.main,
    },
    north: {
      id: 'north',
      title: 'Ruta Norte - Frontera con EE.UU.',
      description: 'Esta ruta cubre las zonas fronterizas del norte de México con Estados Unidos, incluyendo ciudades como Tijuana, Ciudad Juárez y Nuevo Laredo.',
      image: '/api/placeholder/600/300',
      safePoints: [
        'Refugio Diversidad Tijuana',
        'Centro de Apoyo Migrante LGBTQ+ Ciudad Juárez',
        'Casa de Acogida Nuevo Laredo',
      ],
      dangerPoints: [
        'Extrema precaución en zonas periféricas de las ciudades fronterizas',
        'Evitar movimientos nocturnos en ciudades como Nuevo Laredo y Reynosa',
        'Estar alerta ante personas que ofrezcan "ayuda" para cruzar la frontera ilegalmente',
      ],
      tips: [
        'Mantén comunicación constante con organizaciones de apoyo',
        'Infórmate sobre los procesos legales de asilo antes de acercarte a la frontera',
        'Lleva documentación que acredite tu identidad y situación de vulnerabilidad',
        'Conoce la ubicación de los consulados de tu país en la zona fronteriza',
      ],
      mapPoints: [
        { x: 100, y: 50, name: 'Tijuana', type: 'city' },
        { x: 200, y: 40, name: 'Ciudad Juárez', type: 'city' },
        { x: 300, y: 60, name: 'Nuevo Laredo', type: 'city' },
        { x: 350, y: 90, name: 'Monterrey', type: 'city' },
      ],
      color: theme.palette.warning.main,
    },
  };

  // Opciones de filtro por región
  const regionOptions = [
    { value: 'all', label: t('routes.filter.all') },
    { value: 'south', label: t('routes.filter.south') },
    { value: 'center', label: t('routes.filter.center') },
    { value: 'north', label: t('routes.filter.north') },
  ];

  // Filtrar rutas según la región seleccionada
  const getFilteredRoutes = () => {
    if (activeRegion === 'all') {
      return Object.values(routes);
    }
    return [routes[activeRegion]];
  };

  // Cambiar la región activa
  const handleRegionChange = (region) => {
    setActiveRegion(region);
    if (region !== 'all') {
      setSelectedRoute(region);
    }
  };

  // Seleccionar una ruta específica
  const handleRouteSelect = (routeId) => {
    setSelectedRoute(routeId);
  };

  return (
    <Layout>
      <PageHeader
        title={t('routes.title')}
        subtitle={t('routes.subtitle')}
        breadcrumbs={[{ label: t('routes.title'), path: '/rutas' }]}
      />

      <Box sx={{ mb: 4 }}>
        <AlertBanner
          type="info"
          title={t('routes.warning.title')}
          message={t('routes.warning.description')}
          icon={<InfoIcon />}
        />
      </Box>

      {/* Filtros de ruta */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              {t('routes.filter.title')}
            </Typography>
            <ButtonGroup variant="outlined" aria-label="Filtro de rutas" sx={{ flexWrap: 'wrap' }}>
              {regionOptions.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => handleRegionChange(option.value)}
                  variant={activeRegion === option.value ? 'contained' : 'outlined'}
                  color={activeRegion === option.value ? 'primary' : 'inherit'}
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar por ciudad o punto de interés..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Mapa Interactivo */}
      <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
        {t('routes.map.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {t('routes.map.instructions')}
      </Typography>

      <MapContainer>
        {/* Esta es una simulación de mapa, en una implementación real se usaría una biblioteca como Leaflet o Google Maps */}
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Rutas (caminos) */}
          <MapPath 
            sx={{ 
              width: '25%', 
              top: '70%', 
              left: '5%',
              transform: 'rotate(-30deg)',
            }} 
            active={selectedRoute === 'south'} 
            color={routes.south.color}
          />
          <MapPath 
            sx={{ 
              width: '20%', 
              top: '40%', 
              left: '25%',
              transform: 'rotate(-20deg)',
            }} 
            active={selectedRoute === 'center'} 
            color={routes.center.color}
          />
          <MapPath 
            sx={{ 
              width: '30%', 
              top: '15%', 
              left: '10%',
              transform: 'rotate(5deg)',
            }} 
            active={selectedRoute === 'north'} 
            color={routes.north.color}
          />
          
          {/* Puntos de las ciudades - Ruta Sur */}
          {routes.south.mapPoints.map((point, index) => (
            <MapPoint
              key={`south-${index}`}
              sx={{ 
                top: `${point.y}px`, 
                left: `${point.x}px` 
              }}
              active={selectedRoute === 'south'}
              color={routes.south.color}
              onClick={() => handleRouteSelect('south')}
            />
          ))}
          
          {/* Puntos de las ciudades - Ruta Centro */}
          {routes.center.mapPoints.map((point, index) => (
            <MapPoint
              key={`center-${index}`}
              sx={{ 
                top: `${point.y}px`, 
                left: `${point.x}px` 
              }}
              active={selectedRoute === 'center'}
              color={routes.center.color}
              onClick={() => handleRouteSelect('center')}
            />
          ))}
          
          {/* Puntos de las ciudades - Ruta Norte */}
          {routes.north.mapPoints.map((point, index) => (
            <MapPoint
              key={`north-${index}`}
              sx={{ 
                top: `${point.y}px`, 
                left: `${point.x}px` 
              }}
              active={selectedRoute === 'north'}
              color={routes.north.color}
              onClick={() => handleRouteSelect('north')}
            />
          ))}
          
          {/* Leyenda del mapa */}
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 20, 
              right: 20, 
              bgcolor: 'background.paper', 
              p: 2, 
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Typography variant="body2" fontWeight={500} gutterBottom>
              Rutas Migratorias:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: routes.south.color, mr: 1 }} />
                <Typography variant="caption">Ruta Sur</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: routes.center.color, mr: 1 }} />
                <Typography variant="caption">Ruta Centro</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: routes.north.color, mr: 1 }} />
                <Typography variant="caption">Ruta Norte</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </MapContainer>

      <Divider sx={{ my: 5 }} />

      {/* Detalles de la Ruta Seleccionada */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: routes[selectedRoute].color,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <RouteIcon sx={{ mr: 1 }} />
          {routes[selectedRoute].title}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {routes[selectedRoute].description}
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <ContentCard
              title="Puntos Seguros en esta Ruta"
              titleIcon={<PlaceIcon color="success" />}
              elevation={0}
              accentPosition="left"
              accentColor={theme.palette.success.main}
              sx={{ height: '100%' }}
            >
              <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                {routes[selectedRoute].safePoints.map((point, index) => (
                  <Box component="li" key={index} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Button 
                variant="outlined" 
                color="success" 
                startIcon={<DirectionsIcon />}
                sx={{ mt: 2 }}
              >
                Ver en el mapa
              </Button>
            </ContentCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <ContentCard
              title="Puntos de Precaución"
              titleIcon={<WarningIcon color="warning" />}
              elevation={0}
              accentPosition="left"
              accentColor={theme.palette.warning.main}
              sx={{ height: '100%' }}
            >
              <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                {routes[selectedRoute].dangerPoints.map((point, index) => (
                  <Box component="li" key={index} sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </ContentCard>
          </Grid>
          
          <Grid item xs={12}>
            <ContentCard
              title="Consejos de Seguridad para esta Ruta"
              titleIcon={<InfoIcon color="info" />}
              elevation={0}
              accentPosition="top"
              accentColor={theme.palette.info.main}
            >
              <Grid container spacing={2}>
                {routes[selectedRoute].tips.map((tip, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        bgcolor: 'primary.light' + '10',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="body2">
                        {tip}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </ContentCard>
          </Grid>
        </Grid>
      </Box>

      {/* Todas las Rutas */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
          Explorar todas las rutas
        </Typography>
        
        <Grid container spacing={4}>
          {getFilteredRoutes().map((route) => (
            <Grid item xs={12} md={activeRegion === 'all' ? 4 : 12} key={route.id}>
              <RouteSafetyCard
                title={route.title}
                description={route.description}
                image={route.image}
                imageAlt={route.title}
                safePoints={route.safePoints}
                dangerPoints={route.dangerPoints}
                tips={route.tips}
                active={selectedRoute === route.id}
                onClick={() => handleRouteSelect(route.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default RoutesPage;
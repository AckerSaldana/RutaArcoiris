// src/pages/NotFoundPage.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Grid,
  useTheme 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SupportIcon from '@mui/icons-material/Support';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Layout from '../components/layout/Layout';
import { RainbowBar } from '../theme/CustomStyles';
import { useLanguage } from '../context/LanguageContext';

const NotFoundPage = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  
  // Enlaces útiles para redirigir al usuario
  const usefulLinks = [
    { text: 'Página de inicio', path: '/', icon: <HomeIcon /> },
    { text: 'Rutas seguras', path: '/rutas', icon: <SearchIcon /> },
    { text: 'Contactos', path: '/contactos', icon: <SupportIcon /> },
  ];
  
  return (
    <Layout maxWidth={false} disablePadding>
      <Container maxWidth="md" sx={{ py: 8 }}>
        {/* Encabezado 404 */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '6rem', md: '10rem' },
              fontWeight: 700,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-4px',
              mb: 2
            }}
          >
            404
          </Typography>
          
          <RainbowBar sx={{ width: '80px', height: '4px', borderRadius: '2px', mb: 4 }} />
          
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              mb: 2,
              fontWeight: 600
            }}
          >
            Página no encontrada
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph
            sx={{ 
              mb: 4, 
              maxWidth: '600px',
              color: 'text.secondary'
            }}
          >
            Lo sentimos, la página que estás buscando no existe o ha sido movida. 
            Puedes volver a la página de inicio o explorar otras secciones de nuestro sitio.
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/"
            startIcon={<ArrowBackIcon />}
          >
            Volver al inicio
          </Button>
        </Box>
        
        {/* Sugerencias de navegación */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 4, 
            mt: 6,
            borderRadius: theme.shape.borderRadius
          }}
        >
          <Typography variant="h6" component="h3" gutterBottom sx={{ mb: 3 }}>
            ¿Buscas alguna de estas páginas?
          </Typography>
          
          <Grid container spacing={3}>
            {usefulLinks.map((link, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Button
                  variant="outlined"
                  fullWidth
                  component={RouterLink}
                  to={link.path}
                  startIcon={link.icon}
                  sx={{
                    py: 2,
                    justifyContent: 'flex-start',
                    borderRadius: theme.shape.borderRadius,
                    borderWidth: '1px'
                  }}
                >
                  {link.text}
                </Button>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="body2" color="text.secondary">
              Si crees que esto es un error o necesitas ayuda adicional, por favor 
              <Button 
                component={RouterLink} 
                to="/contactos" 
                color="primary"
                size="small"
                sx={{ mx: 1 }}
              >
                contáctanos
              </Button>
              para recibir asistencia.
            </Typography>
          </Box>
        </Paper>
        
        {/* Sección de emergencia */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mt: 4,
            backgroundColor: theme.palette.error.light + '15',
            borderLeft: `4px solid ${theme.palette.error.main}`,
            borderRadius: theme.shape.borderRadius
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ flex: 1 }}>
              <strong>¿Necesitas ayuda urgente?</strong> Si estás en una situación de emergencia, accede directamente a nuestra página de contactos de emergencia.
            </Typography>
            <Button
              variant="contained"
              color="error"
              component={RouterLink}
              to="/emergencia"
              sx={{ ml: 2 }}
            >
              Emergencia
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
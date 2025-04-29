// src/pages/HelpPage.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Grid, 
  Paper, 
  Button,
  Divider,
  Link,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ChatIcon from '@mui/icons-material/Chat';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SchoolIcon from '@mui/icons-material/School';
import TranslateIcon from '@mui/icons-material/Translate';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link as RouterLink } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import { useLanguage } from '../context/LanguageContext';

const HelpPage = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  
  // Preguntas frecuentes de ejemplo
  const faqItems = [
    {
      question: '¿Cómo puedo encontrar un albergue seguro?',
      answer: 'En la sección de "Contactos" encontrarás una lista de albergues seguros para migrantes LGBTQ+ en diferentes ciudades de México. También puedes filtrar por ubicación para encontrar los más cercanos a ti.'
    },
    {
      question: '¿Qué hago si no encuentro la información que necesito?',
      answer: 'Si no encuentras la información que necesitas, puedes ponerte en contacto con nosotros a través del formulario en la sección de "Contactos" o llamar a cualquiera de los números de emergencia listados.'
    },
    {
      question: '¿Cómo puedo descargar recursos para usar sin internet?',
      answer: 'En la sección de "Recursos" encontrarás documentos PDF y guías que puedes descargar para consultarlos sin conexión a internet. Busca el botón "Descargar" en cada recurso.'
    },
    {
      question: '¿El sitio está disponible en otros idiomas?',
      answer: 'Sí, puedes cambiar el idioma del sitio utilizando el selector de idioma en la parte superior derecha de la página. Actualmente ofrecemos el sitio en español, inglés, francés y portugués.'
    },
    {
      question: '¿Cómo reporto un error en el sitio?',
      answer: 'Si encuentras algún error en el sitio o información desactualizada, puedes reportarlo utilizando el formulario de contacto en la sección de "Contactos" o enviar un correo electrónico a soporte@redarcoiris.org.'
    },
    {
      question: '¿Puedo utilizar los recursos de este sitio para ayudar a otras personas?',
      answer: 'Sí, todos los recursos de Red Arcoíris están disponibles para ser compartidos. Te animamos a difundir esta información entre personas que puedan necesitarla. Los materiales están bajo una licencia Creative Commons Attribution 4.0, lo que significa que puedes compartirlos libremente mencionando la fuente.'
    },
    {
      question: '¿Cómo puedo contribuir al proyecto Red Arcoíris?',
      answer: 'Hay varias formas de contribuir: puedes compartir información sobre rutas seguras, reportar actualizaciones sobre albergues, traducir contenido a otros idiomas, o hacer donaciones a las organizaciones asociadas. Contáctanos para más detalles sobre cómo colaborar.'
    },
  ];

  // Guías y tutoriales
  const tutorials = [
    {
      title: 'Cómo usar el mapa de rutas',
      description: 'Aprende a utilizar el mapa interactivo para encontrar rutas seguras y puntos de apoyo.',
      icon: <SchoolIcon color="primary" fontSize="large" />,
      link: '/ayuda/tutorial-rutas'
    },
    {
      title: 'Descargar recursos',
      description: 'Guía para buscar, filtrar y descargar recursos útiles para tu viaje.',
      icon: <LibraryBooksIcon color="primary" fontSize="large" />,
      link: '/ayuda/tutorial-recursos'
    },
    {
      title: 'Usar el sitio en diferentes idiomas',
      description: 'Aprende a cambiar el idioma y acceder a contenido multilingüe.',
      icon: <TranslateIcon color="primary" fontSize="large" />,
      link: '/ayuda/tutorial-idiomas'
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Ayuda y Soporte"
        subtitle="Encuentra respuestas a preguntas frecuentes y aprende a utilizar nuestro sitio"
        breadcrumbs={[{ label: 'Ayuda', path: '/ayuda' }]}
      />

      {/* Sección de acceso rápido */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 6, 
          bgcolor: 'background.paper',
          borderRadius: theme.shape.borderRadius 
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Acceso Rápido
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              component={RouterLink}
              to="/emergencia"
              startIcon={<PhoneIcon />}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              Emergencias
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              component={RouterLink}
              to="/contactos"
              startIcon={<ContactSupportIcon />}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              Contactar Soporte
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              component={RouterLink}
              to="/recursos"
              startIcon={<LibraryBooksIcon />}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              Recursos
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              component={RouterLink}
              to="/rutas"
              startIcon={<SchoolIcon />}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              Guía de Rutas
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Sección de FAQ */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center',
            mb: 3 
          }}
        >
          <HelpIcon sx={{ mr: 1 }} color="primary" />
          Preguntas Frecuentes
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          {faqItems.map((item, index) => (
            <Accordion key={index} elevation={1} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-faq${index}-content`}
                id={`panel-faq${index}-header`}
              >
                <Typography variant="subtitle1" component="h3" fontWeight={500}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>

      {/* Guías y Tutoriales */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center',
            mb: 3 
          }}
        >
          <LibraryBooksIcon sx={{ mr: 1 }} color="primary" />
          Guías y Tutoriales
        </Typography>
        
        <Grid container spacing={3}>
          {tutorials.map((tutorial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box sx={{ display: 'flex', mb: 2 }}>
                  {tutorial.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {tutorial.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                  {tutorial.description}
                </Typography>
                <Button 
                  variant="text" 
                  color="primary"
                  component={RouterLink}
                  to={tutorial.link}
                  sx={{ alignSelf: 'flex-start', mt: 'auto' }}
                >
                  Ver tutorial
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Contacto y Soporte */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center',
            mb: 3
          }}
        >
          <ContactSupportIcon sx={{ mr: 1 }} color="primary" />
          Contacto y Soporte
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 3, 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChatIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Typography variant="h6" component="h3">
                  Contacta con nuestro equipo
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Si tienes alguna pregunta específica o necesitas ayuda personalizada, nuestro equipo está disponible para asistirte.
              </Typography>
              
              <Box>
                <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                  <strong>Correo electrónico:</strong> ayuda@redarcoiris.org
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Teléfono de soporte:</strong> +52 55 1234 5678
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                color="primary" 
                component={RouterLink}
                to="/contactos"
                sx={{ mt: 'auto', alignSelf: 'flex-start' }}
              >
                Ir a contactos
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 3, 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FeedbackIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Typography variant="h6" component="h3">
                  Envía tus comentarios
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Tus comentarios nos ayudan a mejorar. Cuéntanos tu experiencia utilizando el sitio o sugiérenos mejoras.
              </Typography>
              
              <Typography variant="body2" paragraph>
                ¿Has encontrado información útil? ¿Hay algún recurso que te gustaría que añadiéramos? ¿Tienes sugerencias para mejorar la página? Tu opinión es importante para nosotros.
              </Typography>
              
              <Button 
                variant="outlined" 
                color="primary" 
                component={Link}
                href="mailto:feedback@redarcoiris.org"
                sx={{ mt: 'auto', alignSelf: 'flex-start' }}
              >
                Enviar comentarios
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Información de los desarrolladores */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          bgcolor: theme.palette.primary.light + '10',
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom align="center">
          Sobre Red Arcoíris
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph align="center">
          Red Arcoíris es un proyecto desarrollado en colaboración con LGBTQI World para apoyar a migrantes LGBTQ+ en México.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Versión 1.0.0 | © {new Date().getFullYear()} Red Arcoíris
        </Typography>
      </Paper>
    </Layout>
  );
};

export default HelpPage;
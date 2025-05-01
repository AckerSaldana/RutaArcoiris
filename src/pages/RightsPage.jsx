// src/pages/RightsPage.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import HealingIcon from '@mui/icons-material/Healing';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import FaceIcon from '@mui/icons-material/Face';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import ContentCard from '../components/common/ContentCard';
import AlertBanner from '../components/common/AlertBanner';
import { useLanguage } from '../context/LanguageContext';

// Estilos para las pestañas minimalistas
const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 1,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 400,
  fontSize: '0.875rem',
  minHeight: 48,
  minWidth: 120,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
}));

// Accordion minimalista
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: 0,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  '&::before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: '0 0 16px 0',
  },
}));

// Categorías de derechos
const rightCategories = [
  { id: 'basic', label: 'Derechos Básicos', icon: <SecurityIcon /> },
  { id: 'legal', label: 'Asilo y Protección', icon: <GavelIcon /> },
  { id: 'health', label: 'Salud', icon: <HealingIcon /> },
  { id: 'housing', label: 'Vivienda', icon: <HomeIcon /> },
  { id: 'education', label: 'Educación', icon: <SchoolIcon /> },
  { id: 'work', label: 'Trabajo', icon: <WorkIcon /> },
  { id: 'identity', label: 'Identidad de Género', icon: <FaceIcon /> },
];

// Datos de derechos por categoría
const rightsData = {
  basic: [
    {
      id: 'dignity',
      title: 'Derecho a la dignidad humana',
      description: 'Todas las personas, independientemente de su orientación sexual o identidad de género, tienen derecho a ser tratadas con dignidad y respeto.',
      details: 'La Constitución Mexicana garantiza la dignidad humana como un derecho fundamental. Ninguna autoridad puede discriminarte, humillarte o tratarte de manera degradante por ser parte de la comunidad LGBTQ+.',
      icon: <FaceIcon color="primary" />,
    },
    {
      id: 'nondiscrimination',
      title: 'Derecho a la no discriminación',
      description: 'Tienes derecho a no ser discriminado por tu orientación sexual, identidad o expresión de género.',
      details: 'La Ley Federal para Prevenir y Eliminar la Discriminación prohíbe cualquier distinción, exclusión o restricción basada en la orientación sexual o identidad de género. Si sufres discriminación, puedes presentar una queja ante el CONAPRED (Consejo Nacional para Prevenir la Discriminación).',
      icon: <SecurityIcon color="primary" />,
    },
    {
      id: 'freedom',
      title: 'Derecho a la libertad y seguridad personal',
      description: 'Tienes derecho a circular libremente por México sin miedo a ser detenido arbitrariamente.',
      details: 'Las autoridades migratorias no pueden detenerte o deportarte por tu orientación sexual o identidad de género. En caso de detención, tienes derecho a conocer los motivos, a comunicarte con tu consulado, a contar con asistencia legal y a un intérprete si no hablas español.',
      icon: <SecurityIcon color="primary" />,
    },
  ],
  legal: [
    {
      id: 'asylum',
      title: 'Derecho a solicitar asilo',
      description: 'Si has sido perseguido o temes ser perseguido en tu país de origen debido a tu orientación sexual o identidad de género, tienes derecho a solicitar asilo en México.',
      details: 'La persecución por motivos de orientación sexual o identidad de género es reconocida como base para la solicitud de asilo en México. Puedes iniciar este proceso en cualquier oficina de la COMAR (Comisión Mexicana de Ayuda a Refugiados) o en las estaciones migratorias del INM.',
      icon: <GavelIcon color="primary" />,
    },
    {
      id: 'nonrefoulement',
      title: 'Principio de no devolución',
      description: 'No puedes ser devuelto a tu país de origen si tu vida, libertad o seguridad están en riesgo por ser parte de la comunidad LGBTQ+.',
      details: 'México está obligado por tratados internacionales a no devolver a personas a países donde podrían enfrentar persecución, tortura o tratos crueles. Este principio se aplica incluso si tu solicitud de asilo ha sido rechazada.',
      icon: <SecurityIcon color="primary" />,
    },
    {
      id: 'legal_representation',
      title: 'Derecho a la representación legal',
      description: 'Tienes derecho a contar con asistencia y representación legal durante tu proceso migratorio.',
      details: 'Existen organizaciones que brindan asesoría legal gratuita a migrantes LGBTQ+ en México. Consulta la sección de contactos para obtener información sobre estas organizaciones.',
      icon: <GavelIcon color="primary" />,
    },
  ],
  health: [
    {
      id: 'healthcare',
      title: 'Derecho a servicios de salud',
      description: 'Como migrante en México, tienes derecho a recibir atención médica de emergencia sin importar tu situación migratoria.',
      details: 'El Sistema de Salud Pública de México debe proporcionarte atención médica de urgencia independientemente de tu estatus migratorio. Para acceder a servicios médicos no urgentes, puedes inscribirte al Seguro Popular o buscar clínicas comunitarias que atienden a población migrante.',
      icon: <HealingIcon color="primary" />,
    },
    {
      id: 'hiv_treatment',
      title: 'Acceso a tratamiento para VIH',
      description: 'Tienes derecho a recibir tratamiento para VIH y otras infecciones de transmisión sexual.',
      details: 'México cuenta con programas específicos para el tratamiento del VIH que son accesibles para migrantes. Estos incluyen acceso a antirretrovirales, pruebas de detección y asesoramiento.',
      icon: <HealingIcon color="primary" />,
    },
    {
      id: 'mental_health',
      title: 'Servicios de salud mental',
      description: 'Tienes derecho a acceder a servicios de salud mental para tratar condiciones como depresión, ansiedad o estrés postraumático.',
      details: 'Existen organizaciones que ofrecen apoyo psicológico gratuito o de bajo costo para migrantes LGBTQ+. Consulta la sección de contactos para obtener información sobre estos servicios.',
      icon: <HealingIcon color="primary" />,
    },
  ],
  housing: [
    {
      id: 'shelter',
      title: 'Derecho a alojamiento seguro',
      description: 'Tienes derecho a acceder a albergues y refugios seguros que respeten tu orientación sexual e identidad de género.',
      details: 'Existen albergues específicos para migrantes LGBTQ+ en varias ciudades de México. Estos espacios están diseñados para ofrecer un entorno seguro y libre de discriminación.',
      icon: <HomeIcon color="primary" />,
    },
  ],
  education: [
    {
      id: 'education_access',
      title: 'Acceso a la educación',
      description: 'Los niños, niñas y adolescentes migrantes tienen derecho a la educación básica, independientemente de su situación migratoria.',
      details: 'El sistema educativo mexicano debe garantizar el acceso a la educación primaria y secundaria sin solicitar documentos migratorios. Los adultos también pueden acceder a programas educativos y de capacitación.',
      icon: <SchoolIcon color="primary" />,
    },
  ],
  work: [
    {
      id: 'work_authorization',
      title: 'Autorización para trabajar',
      description: 'Si eres solicitante de asilo, puedes obtener un permiso temporal para trabajar mientras se resuelve tu solicitud.',
      details: 'La COMAR emite constancias que te permiten tramitar una CURP temporal, con la cual puedes gestionar un permiso de trabajo en el Instituto Nacional de Migración (INM).',
      icon: <WorkIcon color="primary" />,
    },
    {
      id: 'labor_rights',
      title: 'Derechos laborales',
      description: 'Una vez que tengas permiso para trabajar, gozas de los mismos derechos laborales que cualquier trabajador en México.',
      details: 'Estos derechos incluyen salario justo, jornada laboral regulada, descanso semanal, vacaciones, aguinaldo y protección contra el despido injustificado. No pueden negarte estos derechos por ser migrante o parte de la comunidad LGBTQ+.',
      icon: <WorkIcon color="primary" />,
    },
  ],
  identity: [
    {
      id: 'gender_identity',
      title: 'Reconocimiento de la identidad de género',
      description: 'En algunas entidades de México, las personas trans pueden realizar el cambio de nombre y género en sus documentos oficiales.',
      details: 'Si eres solicitante de asilo o refugiado y te identificas como persona trans, algunas organizaciones pueden ayudarte a gestionar el reconocimiento de tu identidad de género en documentos oficiales.',
      icon: <FaceIcon color="primary" />,
    },
  ],
};

const RightsPage = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Estado para las pestañas de categorías
  const [selectedCategory, setSelectedCategory] = useState('basic');
  
  // Manejar cambio de categoría
  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  return (
    <Layout>
      <PageHeader
        title="Conoce tus Derechos"
        subtitle="Información sobre los derechos de los migrantes LGBTQ+ en México y cómo protegerte durante tu trayecto"
        breadcrumbs={[{ label: 'Derechos', path: '/derechos' }]}
      />

      {/* Introducción */}
      <Box sx={{ mb: 6 }}>
        <ContentCard elevation={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
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
                INFORMACIÓN LEGAL
              </Typography>
              
              <Divider sx={{ width: 40, mb: 4 }} />
              
              <Typography variant="h4" component="h2" gutterBottom fontWeight={300}>
                Conoce tus derechos como migrante LGBTQ+
              </Typography>
              
              <Typography variant="body1" paragraph>
                En México, todas las personas migrantes, independientemente de su orientación sexual o identidad de género, tienen derechos fundamentales que deben ser respetados.
              </Typography>
              
              <Typography variant="body1" paragraph>
                En esta sección encontrarás información sobre los derechos fundamentales que tienes como migrante LGBTQ+ en México, cómo acceder a servicios básicos y qué hacer en caso de que tus derechos sean vulnerados.
              </Typography>
              
              <Button
                variant="outlined"
                color="primary"
                endIcon={<DownloadIcon />}
                sx={{ mt: 2, borderRadius: 0 }}
              >
                Descargar guía completa de derechos
              </Button>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <AlertBanner
                type="info"
                title="Información importante"
                message="Los derechos descritos en esta página son aplicables para todas las personas migrantes en México, independientemente de su situación migratoria. Sin embargo, algunos servicios específicos pueden requerir documentación adicional."
              />
              
              <Box sx={{ mt: 2 }}>
                <AlertBanner
                  type="warning"
                  title="Recuerda"
                  message="Si tus derechos han sido vulnerados, puedes presentar una queja ante la Comisión Nacional de Derechos Humanos (CNDH) o buscar asesoría legal en las organizaciones listadas en la sección de contactos."
                />
              </Box>
            </Grid>
          </Grid>
        </ContentCard>
      </Box>

      {/* Pestañas de Categorías */}
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
          CATEGORÍAS DE DERECHOS
        </Typography>
        
        <Divider sx={{ width: 40, mb: 4 }} />
      
        <StyledTabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="rights categories"
        >
          {rightCategories.map(category => (
            <StyledTab 
              key={category.id} 
              value={category.id} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 1, display: 'flex' }}>
                    {category.icon}
                  </Box>
                  {category.label}
                </Box>
              } 
            />
          ))}
        </StyledTabs>
      </Box>

      {/* Lista de Derechos */}
      <Box sx={{ mb: 6 }}>
        {rightsData[selectedCategory] && rightsData[selectedCategory].map((right, index) => (
          <StyledAccordion key={right.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${right.id}-content`}
              id={`panel-${right.id}-header`}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 2, display: 'flex' }}>
                  {right.icon}
                </Box>
                <Typography variant="h6" component="h3" fontWeight={400}>
                  {right.title}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ ml: 6 }}>
                <Typography variant="body1" paragraph>
                  <strong>Descripción:</strong> {right.description}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Detalles:</strong> {right.details}
                </Typography>
              </Box>
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Sección de Recursos Legales */}
      <Box sx={{ mb: 6 }}>
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
          RECURSOS LEGALES
        </Typography>
        
        <Divider sx={{ width: 40, mb: 4 }} />
        
        <Typography variant="h4" component="h2" gutterBottom fontWeight={300}>
          Documentos y recursos útiles
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Aquí encontrarás documentos e información que pueden ayudarte a ejercer tus derechos como migrante LGBTQ+ en México.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', borderRadius: 0, border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <LibraryBooksIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={400}>
                      Guía para Solicitantes de Asilo LGBTQ+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Un paso a paso sobre cómo solicitar asilo en México por motivos de orientación sexual o identidad de género.
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<DownloadIcon />}
                  sx={{ mt: 2, borderRadius: 0 }}
                >
                  Descargar PDF
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', borderRadius: 0, border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <GavelIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={400}>
                      Formato de Denuncia por Discriminación
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Formulario para presentar denuncias ante el CONAPRED por actos de discriminación basados en la orientación sexual o identidad de género.
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<DownloadIcon />}
                  sx={{ mt: 2, borderRadius: 0 }}
                >
                  Descargar formato
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', borderRadius: 0, border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <FamilyRestroomIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={400}>
                      Directorio de Organizaciones de Apoyo
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lista de organizaciones que brindan asesoría legal gratuita a migrantes LGBTQ+ en diferentes ciudades de México.
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<DownloadIcon />}
                  sx={{ mt: 2, borderRadius: 0 }}
                >
                  Descargar directorio
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Sección de Preguntas Frecuentes */}
      <Box sx={{ mb: 6 }}>
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
          PREGUNTAS FRECUENTES
        </Typography>
        
        <Divider sx={{ width: 40, mb: 4 }} />
        
        <Typography variant="h4" component="h2" gutterBottom fontWeight={300}>
          Situaciones comunes y sus soluciones
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-faq1-content"
                id="panel-faq1-header"
              >
                <Typography variant="subtitle1" component="h3" fontWeight={400}>
                  ¿Qué hago si soy detenido por autoridades migratorias?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" paragraph>
                  Si eres detenido por autoridades migratorias, tienes los siguientes derechos:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Ser informado del motivo de la detención y del proceso migratorio que se iniciará." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Contar con un traductor o intérprete si no hablas español." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Comunicarte con tu consulado y familiares." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Solicitar asilo si temes regresar a tu país por persecución debida a tu orientación sexual o identidad de género." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Recibir atención médica en caso de necesitarla." />
                  </ListItem>
                </List>
              </AccordionDetails>
            </StyledAccordion>
            
            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-faq2-content"
                id="panel-faq2-header"
              >
                <Typography variant="subtitle1" component="h3" fontWeight={400}>
                  ¿Puedo acceder a tratamiento hormonal como persona trans migrante?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" paragraph>
                  Sí, como persona trans migrante tienes derecho a continuar con tu tratamiento hormonal en México. El sistema de salud público cuenta con clínicas especializadas en atención a personas trans, aunque el acceso puede variar dependiendo de la ciudad donde te encuentres.
                </Typography>
                <Typography variant="body1">
                  Organizaciones como Casa Arcoíris y Clínica Especializada en Salud LGBTQ+ pueden ayudarte a acceder a estos servicios. Consulta la sección de contactos para obtener información de estas organizaciones.
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-faq3-content"
                id="panel-faq3-header"
              >
                <Typography variant="subtitle1" component="h3" fontWeight={400}>
                  ¿Cómo solicito asilo en México?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" paragraph>
                  Para solicitar asilo en México por motivos de orientación sexual o identidad de género, debes:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Presentar tu solicitud ante la Comisión Mexicana de Ayuda a Refugiados (COMAR) dentro de los primeros 30 días hábiles de tu ingreso a México." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Explicar claramente por qué temes regresar a tu país debido a tu orientación sexual o identidad de género." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Proporcionar tu información personal y documentación de identidad (si la tienes)." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Firmar la constancia de trámite, que te permitirá permanecer legalmente en México mientras se resuelve tu solicitud." />
                  </ListItem>
                </List>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  El proceso puede durar hasta 45 días hábiles, y durante este tiempo deberás presentarte semanalmente ante la COMAR para firmar.
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
            
            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-faq4-content"
                id="panel-faq4-header"
              >
                <Typography variant="subtitle1" component="h3" fontWeight={400}>
                  ¿Qué hago si sufro discriminación en un albergue o refugio?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" paragraph>
                  Si sufres discriminación en un albergue o refugio debido a tu orientación sexual o identidad de género, puedes:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Reportar el incidente a la dirección del albergue, si te sientes seguro haciéndolo." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Contactar a organizaciones especializadas como Casa Arcoíris que pueden ayudarte a encontrar un alojamiento seguro." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Presentar una queja ante el CONAPRED (Consejo Nacional para Prevenir la Discriminación)." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="En casos graves, solicitar la intervención de la Comisión Nacional de Derechos Humanos (CNDH)." />
                  </ListItem>
                </List>
              </AccordionDetails>
            </StyledAccordion>
          </Grid>
        </Grid>
      </Box>

      {/* Sección de Asistencia Legal */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          borderRadius: 0,
          border: `1px solid ${theme.palette.divider}`,
          borderTop: 'none',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 300 }}>
              ¿Necesitas asesoría legal personalizada?
            </Typography>
            <Typography variant="body1" paragraph>
              Nuestro equipo de abogados especializados puede ayudarte a comprender y ejercer tus derechos como migrante LGBTQ+ en México.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component="a"
              href="/contactos"
              sx={{ borderRadius: 0 }}
            >
              Solicitar asesoría legal
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default RightsPage;
// src/pages/ResourcesPage.jsx
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
  Chip, 
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VideocamIcon from '@mui/icons-material/Videocam';
import LanguageIcon from '@mui/icons-material/Language';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import TranslateIcon from '@mui/icons-material/Translate';

import Layout from '../components/layout/Layout';
import PageHeader from '../components/layout/PageHeader';
import ResourceCard from '../components/common/ResourceCard';
import ContentCard from '../components/common/ContentCard';
import { useLanguage } from '../context/LanguageContext';

// Estilos para los tabs de categorías
const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.875rem',
  minHeight: 48,
  minWidth: 120,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

// Datos de categorías de recursos
const categories = [
  { id: 'all', name: 'Todos', icon: <FilterListIcon /> },
  { id: 'guide', name: 'Guías', icon: <MenuBookIcon />, color: '#4caf50' },
  { id: 'legal', name: 'Documentos Legales', icon: <ArticleIcon />, color: '#2196f3' },
  { id: 'health', name: 'Salud', icon: <LocalHospitalIcon />, color: '#ff9800' },
  { id: 'video', name: 'Videos', icon: <VideocamIcon />, color: '#9c27b0' },
];

// Datos de idiomas disponibles
const languages = [
  { id: 'all', name: 'Todos los idiomas' },
  { id: 'es', name: 'Español' },
  { id: 'en', name: 'Inglés' },
  { id: 'fr', name: 'Francés' },
  { id: 'pt', name: 'Portugués' },
];

// Datos de recursos de ejemplo
const resourcesData = [
  {
    id: 1,
    title: 'Guía de Derechos Migratorios LGBTQ+',
    description: 'Un manual completo sobre los derechos de los migrantes LGBTQ+ en México, incluyendo procedimientos legales y recomendaciones.',
    resourceType: 'PDF',
    icon: <PictureAsPdfIcon />,
    category: 'guide',
    tags: ['Derechos', 'Migración', 'Legal'],
    language: 'es',
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Formularios de Solicitud de Asilo',
    description: 'Documentos oficiales y guía para completar la solicitud de asilo en México para personas LGBTQ+ en situación de vulnerabilidad.',
    resourceType: 'Documento',
    icon: <ArticleIcon />,
    category: 'legal',
    tags: ['Asilo', 'Formularios', 'Oficial'],
    language: 'es',
    downloadUrl: '#',
  },
  {
    id: 3,
    title: 'Salud Sexual para la Comunidad LGBTQ+',
    description: 'Información sobre prevención, tratamiento y cuidados de salud sexual específicos para personas LGBTQ+ migrantes.',
    resourceType: 'Guía',
    icon: <LocalHospitalIcon />,
    category: 'health',
    tags: ['Salud Sexual', 'Prevención', 'Tratamiento'],
    language: 'es',
    downloadUrl: '#',
  },
  {
    id: 4,
    title: 'Testimonios de Migrantes LGBTQ+',
    description: 'Videos con historias reales de personas LGBTQ+ que han migrado a través de México, compartiendo experiencias y consejos.',
    resourceType: 'Video',
    icon: <VideocamIcon />,
    category: 'video',
    tags: ['Testimonios', 'Experiencias', 'Historias Reales'],
    language: 'es',
    externalUrl: 'https://example.com/videos',
  },
  {
    id: 5,
    title: 'LGBTQ+ Migrant Rights Guide',
    description: 'A comprehensive guide on the rights of LGBTQ+ migrants in Mexico, including legal procedures and recommendations.',
    resourceType: 'PDF',
    icon: <PictureAsPdfIcon />,
    category: 'guide',
    tags: ['Rights', 'Migration', 'Legal'],
    language: 'en',
    downloadUrl: '#',
  },
  {
    id: 6,
    title: 'Directorio de Organizaciones LGBTQ+',
    description: 'Lista completa de organizaciones que brindan apoyo a migrantes LGBTQ+ en diferentes ciudades de México.',
    resourceType: 'Directorio',
    icon: <PeopleIcon />,
    category: 'guide',
    tags: ['Organizaciones', 'Apoyo', 'Contactos'],
    language: 'es',
    downloadUrl: '#',
  },
  {
    id: 7,
    title: 'Guía de Seguridad Personal',
    description: 'Recomendaciones prácticas para que migrantes LGBTQ+ mantengan su seguridad durante el tránsito por México.',
    resourceType: 'Guía',
    icon: <SecurityIcon />,
    category: 'guide',
    tags: ['Seguridad', 'Protección', 'Consejos'],
    language: 'es',
    downloadUrl: '#',
  },
  {
    id: 8,
    title: 'Tutoriel: Demande d\'asile au Mexique',
    description: 'Guide étape par étape pour les migrants LGBTQ+ francophones qui souhaitent demander l\'asile au Mexique.',
    resourceType: 'Document',
    icon: <ArticleIcon />,
    category: 'legal',
    tags: ['Asile', 'Procédure', 'Légal'],
    language: 'fr',
    downloadUrl: '#',
  },
];

const ResourcesPage = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Estados para filtros y búsqueda
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResources, setFilteredResources] = useState(resourcesData);
  
  // Filtrar recursos según la categoría, idioma y término de búsqueda
  useEffect(() => {
    let filtered = resourcesData;
    
    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }
    
    // Filtrar por idioma
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(resource => resource.language === selectedLanguage);
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(term) || 
        resource.description.toLowerCase().includes(term) ||
        resource.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredResources(filtered);
  }, [selectedCategory, selectedLanguage, searchTerm]);
  
  // Manejar cambio de categoría
  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };
  
  // Manejar cambio de idioma
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  
  // Manejar cambio en término de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Contar recursos por categoría
  const getCategoryCount = (category) => {
    if (category === 'all') {
      return resourcesData.length;
    }
    return resourcesData.filter(resource => resource.category === category).length;
  };

  return (
    <Layout>
      <PageHeader
        title={t('resources.title')}
        subtitle={t('resources.subtitle')}
        breadcrumbs={[{ label: t('resources.title'), path: '/recursos' }]}
      />

      {/* Sección de Filtros */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={t('resources.search')}
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="language-select-label">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TranslateIcon sx={{ mr: 1, fontSize: 20 }} />
                      {t('resources.language.filter')}
                    </Box>
                  </InputLabel>
                  <Select
                    labelId="language-select-label"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    label={t('resources.language.filter')}
                  >
                    {languages.map(language => (
                      <MenuItem key={language.id} value={language.id}>
                        {language.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLanguage('all');
                  }}
                >
                  Limpiar filtros
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs de Categorías */}
      <StyledTabs
        value={selectedCategory}
        onChange={handleCategoryChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="resource categories"
      >
        {categories.map(category => (
          <StyledTab 
            key={category.id} 
            value={category.id} 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  mr: 1, 
                  color: category.color || 'inherit',
                  display: 'flex',
                }}>
                  {category.icon}
                </Box>
                {category.name}
                <Chip 
                  label={getCategoryCount(category.id)} 
                  size="small" 
                  sx={{ 
                    ml: 1, 
                    height: 20, 
                    minWidth: 20,
                    fontSize: '0.7rem',
                  }} 
                />
              </Box>
            } 
          />
        ))}
      </StyledTabs>

      {/* Lista de Recursos */}
      {filteredResources.length > 0 ? (
        <Grid container spacing={3}>
          {filteredResources.map(resource => (
            <Grid item xs={12} md={6} lg={4} key={resource.id}>
              <ResourceCard
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                resourceType={resource.resourceType}
                tags={resource.tags}
                language={
                  resource.language === 'es' ? 'Español' :
                  resource.language === 'en' ? 'Inglés' :
                  resource.language === 'fr' ? 'Francés' :
                  resource.language === 'pt' ? 'Portugués' :
                  resource.language
                }
                downloadUrl={resource.downloadUrl}
                externalUrl={resource.externalUrl}
                onSave={() => {}}
                onShare={() => {}}
                onClick={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            bgcolor: 'background.default',
            borderRadius: 2,
            mb: 4,
          }}
        >
          <SearchIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {t('resources.noResults')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.tryAgain')}
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedLanguage('all');
            }}
          >
            Mostrar todos los recursos
          </Button>
        </Paper>
      )}

      <Divider sx={{ my: 6 }} />

      {/* Recursos Destacados */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          Recursos más descargados
        </Typography>
        
        <Typography variant="body1" paragraph color="text.secondary">
          Estos son los materiales más populares entre los migrantes LGBTQ+
        </Typography>
        
        <Grid container spacing={3}>
          {resourcesData.slice(0, 3).map(resource => (
            <Grid item xs={12} md={4} key={`featured-${resource.id}`}>
              <ResourceCard
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                resourceType={resource.resourceType}
                tags={resource.tags}
                language={
                  resource.language === 'es' ? 'Español' :
                  resource.language === 'en' ? 'Inglés' :
                  resource.language === 'fr' ? 'Francés' :
                  resource.language === 'pt' ? 'Portugués' :
                  resource.language
                }
                downloadUrl={resource.downloadUrl}
                externalUrl={resource.externalUrl}
                onSave={() => {}}
                onShare={() => {}}
                onClick={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Solicitud de Recursos */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          bgcolor: theme.palette.primary.light + '10',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              ¿No encuentras lo que buscas?
            </Typography>
            <Typography variant="body1" paragraph>
              Si necesitas información específica o recursos en otro idioma, podemos ayudarte a encontrarlos.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component="a"
              href="/contactos"
            >
              Solicitar un recurso
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default ResourcesPage;
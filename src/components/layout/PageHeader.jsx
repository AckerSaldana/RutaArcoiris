// src/components/layout/PageHeader.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Breadcrumbs, 
  Link, 
  useTheme,
  Fade,
  Container,
  alpha 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/material/styles';
import { ElegantBar, GradientText } from '../../theme/CustomStyles';
import { useLanguage } from '../../context/LanguageContext';

// Contenedor del encabezado con fondo sutil
const HeaderContainer = styled(Box)(({ 
  theme, 
  backgroundcolor,
  fullwidth = false,
  centertext = false,
  compact = false
}) => ({
  paddingTop: compact ? theme.spacing(3) : theme.spacing(6),
  paddingBottom: compact ? theme.spacing(3) : theme.spacing(6),
  backgroundColor: backgroundcolor 
    ? alpha(backgroundcolor, 0.04)
    : 'transparent',
  textAlign: centertext ? 'center' : 'left',
  width: '100%',
}));

// Texto de subtítulo refinado
const StyledSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: '800px',
  marginBottom: theme.spacing(2),
  lineHeight: 1.6,
}));

// Estilo para las migas de pan
const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiBreadcrumbs-separator': {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

// Link para migas de pan
const BreadcrumbLink = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

// Texto actual de migas de pan
const CurrentBreadcrumb = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

const PageHeader = ({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  icon,
  align = 'left',
  background,
  color,
  subtitleColor,
  gradient = false,
  fullWidth = false,
  compact = false,
  barColor = 'primary',
  barWidth = 40,
  children,
  sx = {} 
}) => {
  const theme = useTheme();
  const { t } = useLanguage();
  
  // Determinar alineación del texto
  const isCentered = align === 'center';
  
  // Determinar color para el título
  const titleColor = color || 'text.primary';
  
  // Determinar color para el subtítulo
  const textColorSubtitle = subtitleColor || 'text.secondary';
  
  return (
    <HeaderContainer 
      backgroundcolor={background}
      fullwidth={fullWidth ? 1 : 0}
      centertext={isCentered ? 1 : 0}
      compact={compact ? 1 : 0}
      sx={sx}
    >
      <Container maxWidth={fullWidth ? false : 'lg'} disableGutters={fullWidth}>
        <Fade in={true} timeout={800}>
          <Box>
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <StyledBreadcrumbs 
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                sx={{ 
                  ...((isCentered) && { justifyContent: 'center' }),
                  alignItems: 'center',
                  mx: isCentered ? 'auto' : 0, 
                }}
              >
                <BreadcrumbLink 
                  component={RouterLink} 
                  to="/" 
                  underline="none"
                >
                  {t('nav.home')}
                </BreadcrumbLink>
                
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index === breadcrumbs.length - 1 ? (
                      <CurrentBreadcrumb color="text.primary">
                        {crumb.label}
                      </CurrentBreadcrumb>
                    ) : (
                      <BreadcrumbLink 
                        component={RouterLink} 
                        to={crumb.path} 
                        underline="none"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </React.Fragment>
                ))}
              </StyledBreadcrumbs>
            )}
            
            {/* Título */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: subtitle ? 1 : 0 }}>
              {icon && !isCentered && (
                <Box sx={{ mr: 1.5, color: gradient ? 'inherit' : titleColor }}>
                  {icon}
                </Box>
              )}
              
              {gradient ? (
                <GradientText 
                  variant={barColor}
                  component="h1"
                  fontWeight={700}
                  sx={{ mb: subtitle ? 1 : 0 }}
                >
                  {title}
                </GradientText>
              ) : (
                <Typography 
                  variant="h3" 
                  component="h1" 
                  color={titleColor}
                  fontWeight={700}
                  sx={{ mb: subtitle ? 1 : 0 }}
                >
                  {title}
                </Typography>
              )}
            </Box>
            
            {/* Subtítulo */}
            {subtitle && (
              <StyledSubtitle 
                variant="subtitle1" 
                color={textColorSubtitle}
                sx={{ 
                  maxWidth: isCentered ? '650px' : '800px',
                  mx: isCentered ? 'auto' : 0, 
                }}
              >
                {subtitle}
              </StyledSubtitle>
            )}
            
            {/* Barra decorativa */}
            {!compact && (
              <ElegantBar 
                width={barWidth} 
                height={3} 
                variant={barColor}
                sx={{ 
                  mt: 2, 
                  mb: 1,
                  mx: isCentered ? 'auto' : 0,
                  borderRadius: '2px',
                }} 
              />
            )}
            
            {/* Contenido adicional */}
            {children && (
              <Box sx={{ mt: 3 }}>
                {children}
              </Box>
            )}
          </Box>
        </Fade>
      </Container>
    </HeaderContainer>
  );
};

export default PageHeader;
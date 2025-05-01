// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Container, 
  Menu, 
  MenuItem, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  useScrollTrigger, 
  useMediaQuery,
  ListItemButton
} from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TranslateIcon from '@mui/icons-material/Translate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WarningIcon from '@mui/icons-material/Warning';

// Importación del ElegantBar
import { ElegantBar, GradientText } from '../../theme/CustomStyles';
import { useLanguage } from '../../context/LanguageContext';

// Navbar con estilo minimalista
const StyledAppBar = styled(AppBar)(({ theme, trigger }) => ({
  backgroundColor: trigger ? theme.palette.background.default : 'transparent',
  backdropFilter: trigger ? 'blur(8px)' : 'none',
  boxShadow: 'none',
  borderBottom: trigger ? `1px solid ${theme.palette.divider}` : 'none',
  transition: 'all 0.3s ease',
}));

// Logo de texto elegante y minimalista - Reproduce exactamente la imagen
const Logo = () => {
  return (
    <Box component={RouterLink} to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 500, 
          letterSpacing: 1,
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          fontSize: { xs: '1.125rem', md: '1.25rem' },
        }}
      >
        RED <Typography 
          component="span" 
          sx={{ 
            fontWeight: 500, 
            letterSpacing: 1,
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            background: 'linear-gradient(90deg, #E91E63, #FF5722, #FFC107, #4CAF50, #2196F3, #9C27B0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            ml: 0.5,
          }}
        >
          ARCOÍRIS
        </Typography>
      </Typography>
    </Box>
  );
};

// Botón de navegación minimalista
const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  textTransform: 'none',
  letterSpacing: '0.02em',
  fontWeight: active ? 500 : 400,
  position: 'relative',
  padding: '6px 12px',
  borderRadius: 0,
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '1px',
    backgroundColor: theme.palette.primary.main,
    transition: 'all 0.3s ease',
  } : {},
  '&:hover': {
    backgroundColor: 'transparent',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '1px',
      backgroundColor: alpha(theme.palette.primary.main, 0.6),
    },
  },
}));

// Botón de idioma minimalista
const LanguageButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.text.secondary,
  fontWeight: 400,
  minWidth: 'auto',
  padding: theme.spacing(1),
  borderRadius: 0,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
}));

// Botón de emergencia
const EmergencyButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  fontWeight: 400,
  borderRadius: 0,
  padding: '6px 16px',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const Header = () => {
  const theme = useTheme();
  const { t, changeLanguage, currentLanguage, availableLanguages } = useLanguage();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Efecto para elegancia del scroll
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  // Links de navegación - como en la imagen de referencia
  const navigationLinks = [
    { text: 'Inicio', path: '/' },
    { text: 'Rutas Seguras', path: '/rutas' },
    { text: 'Contactos', path: '/contactos' },
    { text: 'Recursos', path: '/recursos' },
    { text: 'Derechos', path: '/derechos' },
    { text: 'Ayuda', path: '/ayuda' },
  ];

  // Estado para menú de idiomas
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  
  const handleLanguageMenuOpen = (event) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    handleLanguageMenuClose();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Comprobación de ruta activa
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Obtener el nombre del idioma actual
  const getCurrentLanguageName = () => {
    const currentLang = availableLanguages?.find(lang => lang.code === currentLanguage);
    return currentLang ? currentLang.name : 'Español';
  };

  return (
    <>
      <StyledAppBar position="fixed" color="default" trigger={trigger ? 1 : 0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 64 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Logo />
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', mx: 2 }}>
                  {navigationLinks.map((link) => (
                    <NavButton
                      key={link.path}
                      component={RouterLink}
                      to={link.path}
                      active={isActive(link.path) ? 1 : 0}
                      sx={{ mx: 1 }}
                    >
                      {link.text}
                    </NavButton>
                  ))}
                </Box>

                {/* Language Selector - Como en la imagen */}
                <LanguageButton 
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleLanguageMenuOpen}
                  sx={{ mx: 1 }}
                >
                  Español
                </LanguageButton>
                <Menu
                  anchorEl={languageMenuAnchor}
                  open={Boolean(languageMenuAnchor)}
                  onClose={handleLanguageMenuClose}
                  elevation={0}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    '& .MuiPaper-root': {
                      borderRadius: 0,
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                      border: `1px solid ${theme.palette.divider}`,
                    }
                  }}
                >
                  {availableLanguages?.map((option) => (
                    <MenuItem 
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code)}
                      selected={currentLanguage === option.code}
                      sx={{ 
                        minWidth: 140,
                        py: 1.5,
                        px: 2,
                      }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>

                {/* Emergency Button */}
                <EmergencyButton 
                  variant="contained"
                  startIcon={<WarningIcon />}
                  component={RouterLink}
                  to="/emergencia"
                  size="small"
                  sx={{ ml: 2 }}
                >
                  Emergencia
                </EmergencyButton>
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ 
                  ml: 1,
                  color: 'text.primary',
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: 340,
            boxSizing: 'border-box',
            borderRadius: 0,
          },
        }}
        variant="temporary"
        elevation={0}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo />
          <IconButton onClick={toggleDrawer} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ py: 0 }}>
          {navigationLinks.map((link) => (
            <ListItem 
              key={link.path}
              disablePadding
            >
              <ListItemButton
                component={RouterLink}
                to={link.path}
                onClick={toggleDrawer}
                selected={isActive(link.path)}
                sx={{
                  py: 1.5,
                  borderLeft: isActive(link.path) ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                  backgroundColor: isActive(link.path) ? alpha(theme.palette.primary.main, 0.04) : 'transparent',
                }}
              >
                <ListItemText 
                  primary={link.text} 
                  primaryTypographyProps={{
                    fontWeight: isActive(link.path) ? 500 : 400,
                    color: isActive(link.path) ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Language Selection */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Selecciona un idioma
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {availableLanguages?.map((lang) => (
                <Button 
                  key={lang.code}
                  variant={currentLanguage === lang.code ? "contained" : "outlined"}
                  color={currentLanguage === lang.code ? "primary" : "inherit"}
                  size="small"
                  onClick={() => changeLanguage(lang.code)}
                  sx={{ 
                    minWidth: 'auto',
                    px: 1.5,
                    py: 0.5,
                    fontSize: '0.75rem',
                    textTransform: 'none',
                    borderRadius: 0,
                  }}
                >
                  {lang.name}
                </Button>
              ))}
            </Box>
          </Box>
          
          {/* Emergency Button */}
          <EmergencyButton 
            variant="contained"
            color="error"
            fullWidth
            startIcon={<WarningIcon />}
            component={RouterLink}
            to="/emergencia"
            onClick={toggleDrawer}
          >
            Emergencia
          </EmergencyButton>
        </Box>
      </Drawer>
      
      {/* Offset para que el contenido no quede debajo del AppBar */}
      <Toolbar />
    </>
  );
};

export default Header;
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
  Fade,
  ListItemButton
} from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TranslateIcon from '@mui/icons-material/Translate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WarningIcon from '@mui/icons-material/Warning';

// Importación correcta de ElegantBar
import { ElegantBar } from '../../theme/CustomStyles';
import { useLanguage } from '../../context/LanguageContext';

// Navbar con estilo minimalista
const StyledAppBar = styled(AppBar)(({ theme, trigger }) => ({
  backgroundColor: trigger ? theme.palette.background.default : 'transparent',
  backdropFilter: trigger ? 'blur(8px)' : 'none',
  boxShadow: 'none',
  borderBottom: trigger ? `1px solid ${theme.palette.divider}` : 'none',
  transition: 'all 0.3s ease',
}));

// Logo de texto elegante
const Logo = () => {
  const theme = useTheme();
  
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
        <Box component="span" sx={{ fontWeight: 700, mr: 0.5 }}>Red</Box>
        <Box 
          component="span" 
          sx={{ 
            background: theme.palette.primary.main,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
          }}
        >
          Arcoíris
        </Box>
      </Typography>
    </Box>
  );
};

// Botón de navegación elegante
const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  textTransform: 'none',
  letterSpacing: '0.02em',
  fontWeight: active ? 600 : 500,
  position: 'relative',
  '&::after': active ? {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '16px',
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '1px',
    transition: 'all 0.3s ease',
  } : {},
  '&:hover': {
    backgroundColor: 'transparent',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '16px',
      height: '2px',
      backgroundColor: alpha(theme.palette.primary.main, 0.6),
      borderRadius: '1px',
    },
  },
}));

// Botón de idioma elegante
const LanguageButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  minWidth: 'auto',
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

// Botón de emergencia elegante
const EmergencyButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.error.main, 0.9),
  color: theme.palette.common.white,
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: theme.palette.error.main,
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

  // Links de navegación
  const navigationLinks = [
    { text: t('nav.home'), path: '/' },
    { text: t('nav.routes'), path: '/rutas' },
    { text: t('nav.contacts'), path: '/contactos' },
    { text: t('nav.resources'), path: '/recursos' },
    { text: t('nav.rights'), path: '/derechos' },
    { text: t('nav.help'), path: '/ayuda' },
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
        <ElegantBar 
          height={trigger ? 0 : 3} 
          variant={trigger ? 'rainbow' : 'rainbowSubtle'} 
          opacity={trigger ? 0 : 1}
          sx={{ transition: 'all 0.3s ease' }}
        />
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
                      sx={{ mx: 0.5 }}
                    >
                      {link.text}
                    </NavButton>
                  ))}
                </Box>

                {/* Language Selector */}
                <LanguageButton 
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleLanguageMenuOpen}
                  startIcon={<TranslateIcon />}
                >
                  {getCurrentLanguageName()}
                </LanguageButton>
                <Menu
                  anchorEl={languageMenuAnchor}
                  open={Boolean(languageMenuAnchor)}
                  onClose={handleLanguageMenuClose}
                  TransitionComponent={Fade}
                  elevation={2}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
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
                  {t('nav.emergency')}
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
                  borderLeft: isActive(link.path) ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                  backgroundColor: isActive(link.path) ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                }}
              >
                <ListItemText 
                  primary={link.text} 
                  primaryTypographyProps={{
                    fontWeight: isActive(link.path) ? 600 : 500,
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
              {t('common.selectLanguage')}
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
            {t('nav.emergency')}
          </EmergencyButton>
        </Box>
      </Drawer>
      
      {/* Offset para que el contenido no quede debajo del AppBar */}
      <Toolbar />
    </>
  );
};

export default Header;
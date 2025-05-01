// src/components/layout/Footer.jsx
import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  TextField, 
  Button, 
  IconButton, 
  Divider,
  useTheme,
  InputAdornment,
  alpha
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

import { ElegantBar, GradientText } from '../../theme/CustomStyles';
import { useLanguage } from '../../context/LanguageContext';

// Footer con estilo minimalista
const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
}));

// Enlace minimalista
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  fontWeight: 400,
  fontSize: '0.9rem',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

// Icono social minimalista
const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: 'all 0.2s ease',
  padding: theme.spacing(1),
  backgroundColor: 'transparent',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
}));

// Campo de texto minimalista para el boletín
const NewsletterTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    backgroundColor: alpha(theme.palette.background.default, 0.8),
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.default,
      boxShadow: 'none',
      '& fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '1px',
      },
    },
  },
}));

const Footer = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 400, 
                  letterSpacing: 1,
                  display: 'flex',
                  alignItems: 'center',
                  mb: 0.5,
                }}
              >
                RED<GradientText variant="rainbow" sx={{ ml: 0.5 }}>ARCOÍRIS</GradientText>
              </Typography>
              <Divider sx={{ width: 40, mt: 1, mb: 2 }} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 300 }}>
              {t('footer.about')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
              <SocialIconButton size="small" aria-label="facebook">
                <FacebookOutlinedIcon fontSize="small" />
              </SocialIconButton>
              <SocialIconButton size="small" aria-label="twitter">
                <TwitterIcon fontSize="small" />
              </SocialIconButton>
              <SocialIconButton size="small" aria-label="instagram">
                <InstagramIcon fontSize="small" />
              </SocialIconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight={400} gutterBottom color="text.primary" sx={{ letterSpacing: '0.05em' }}>
              {t('footer.quickLinks')}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1.5 }}>
                <FooterLink component={RouterLink} to="/">
                  {t('nav.home')}
                </FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <FooterLink component={RouterLink} to="/rutas">
                  {t('nav.routes')}
                </FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <FooterLink component={RouterLink} to="/contactos">
                  {t('nav.contacts')}
                </FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <FooterLink component={RouterLink} to="/recursos">
                  {t('nav.resources')}
                </FooterLink>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <FooterLink component={RouterLink} to="/derechos">
                  {t('nav.rights')}
                </FooterLink>
              </Box>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight={400} gutterBottom color="text.primary" sx={{ letterSpacing: '0.05em' }}>
              {t('footer.contact')}
            </Typography>
            <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
              <EmailOutlinedIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1, fontSize: 16 }} />
              <Typography variant="body2" color="text.secondary">
                info@redarcoiris.org
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <PhoneOutlinedIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1, fontSize: 16 }} />
              <Typography variant="body2" color="text.secondary">
                +52 55 1234 5678
              </Typography>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={400} gutterBottom color="text.primary" sx={{ letterSpacing: '0.05em' }}>
              {t('footer.newsletter')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('footer.newsletterDescription')}
            </Typography>
            <NewsletterTextField
              fullWidth
              placeholder={t('footer.emailPlaceholder')}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="small"
                      sx={{ 
                        minWidth: 'unset', 
                        p: '6px',
                        borderRadius: 0,
                        mr: '-2px',
                      }}
                    >
                      <SendIcon fontSize="small" />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, opacity: 0.6 }} />
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ mb: { xs: 1.5, sm: 0 } }}
          >
            © {currentYear} Red Arcoíris. {t('footer.allRightsReserved')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FooterLink variant="body2" component={RouterLink} to="/privacy">
              {t('footer.privacy')}
            </FooterLink>
            <FooterLink variant="body2" component={RouterLink} to="/terms">
              {t('footer.terms')}
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
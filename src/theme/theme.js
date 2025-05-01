// src/theme/theme.js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Paleta refinada y minimalista inspirada en diseño de arquitectura con sutiles toques LGBTQ+
const palette = {
  // Colores primarios y secundarios más sutiles
  primary: {
    main: '#222222',    // Negro casi puro para el diseño minimalista
    light: '#424242',
    dark: '#000000',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#7E57C2',    // Púrpura suave como acento LGBTQ+
    light: '#B085F5',
    dark: '#4D2C91',
    contrastText: '#FFFFFF',
  },
  // Colores para acentos LGBTQ+ (suaves y elegantes)
  accent1: '#EC407A',  // Rosa
  accent2: '#FF7043',  // Naranja
  accent3: '#FFCA28',  // Amarillo
  accent4: '#66BB6A',  // Verde
  accent5: '#42A5F5',  // Azul
  
  // Escala de grises refinada para diseño arquitectónico
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Colores de texto minimalistas
  text: {
    primary: '#212121',    // Casi negro
    secondary: '#757575',  // Gris medio
    disabled: '#9E9E9E',   // Gris claro
  },
  
  // Fondos limpios y minimalistas
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
    light: '#FAFAFA',
    subtle: '#F8F9FA',
  },
  
  // Colores de estado
  error: {
    main: '#E53935',
    light: '#EF5350',
    dark: '#C62828',
  },
  warning: {
    main: '#FFB300',
    light: '#FFCA28',
    dark: '#FF8F00',
  },
  info: {
    main: '#1E88E5',
    light: '#42A5F5',
    dark: '#1565C0',
  },
  success: {
    main: '#43A047',
    light: '#66BB6A',
    dark: '#2E7D32',
  },
  
  divider: 'rgba(0, 0, 0, 0.08)',
};

// Tipografía elegante y moderna para diseño arquitectónico
const typography = {
  fontFamily: [
    'Inter', 
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  
  // Tamaños y pesos refinados
  h1: {
    fontWeight: 300, // Más ligero para aspecto arquitectónico
    fontSize: '3rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: 300,
    fontSize: '2.5rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 400,
    fontSize: '2rem',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontWeight: 400,
    fontSize: '1.75rem',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h5: {
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  h6: {
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: 1.4,
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  subtitle2: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0.01em',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  button: {
    textTransform: 'none',
    fontWeight: 400,
    fontSize: '0.875rem',
    letterSpacing: '0.02em',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
  },
  overline: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: 500,
    letterSpacing: '0.08em',
  },
};

// Componentes personalizados con estilo elegante y minimalista
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: palette.grey[300],
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-track': {
          background: palette.grey[100],
        },
      },
    },
  },
  
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0, // Esquinas cuadradas para diseño arquitectónico
        padding: '10px 24px',
        fontWeight: 400,
        boxShadow: 'none',
        transition: 'all 0.2s ease-in-out',
        textTransform: 'none',
        letterSpacing: '0.02em',
      },
      contained: {
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: palette.grey[900],
        },
      },
      outlined: {
        borderWidth: '1px',
        '&:hover': {
          borderWidth: '1px',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
        },
      },
      text: {
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
        },
      },
    },
  },
  
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        borderBottom: `1px solid ${palette.divider}`,
        backgroundColor: palette.background.default,
      },
    },
  },
  
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 0, // Esquinas cuadradas para diseño arquitectónico
        boxShadow: 'none',
        border: `1px solid ${palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
        },
        overflow: 'hidden',
      },
    },
  },
  
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 24,
        '&:last-child': {
          paddingBottom: 24,
        },
      },
    },
  },
  
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: '20px 24px',
      },
      title: {
        fontSize: '1.125rem',
        fontWeight: 500,
      },
      subheader: {
        fontSize: '0.875rem',
        color: palette.text.secondary,
      },
    },
  },
  
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 0, // Esquinas cuadradas
        height: 30,
        fontSize: '0.75rem',
        fontWeight: 400,
      },
      filled: {
        backgroundColor: palette.grey[100],
        color: palette.grey[800],
        '&:hover': {
          backgroundColor: palette.grey[200],
        },
      },
      outlined: {
        borderColor: palette.grey[300],
      },
    },
  },
  
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: palette.divider,
      },
    },
  },
  
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        borderRadius: 0, // Esquinas cuadradas para diseño arquitectónico
      },
      elevation1: {
        boxShadow: 'none',
        border: `1px solid ${palette.divider}`,
      },
      elevation2: {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
      },
      elevation3: {
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
      },
      elevation4: {
        boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  
  MuiAccordion: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
        borderBottom: `1px solid ${palette.divider}`,
        borderRadius: 0,
      },
    },
  },
  
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        padding: '0 16px',
        minHeight: 56,
      },
      content: {
        margin: '12px 0',
      },
    },
  },
  
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        padding: '8px 16px 16px',
      },
    },
  },
  
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 0, // Esquinas cuadradas
          '& fieldset': {
            borderColor: palette.grey[300],
            transition: 'all 0.2s ease',
          },
          '&:hover fieldset': {
            borderColor: palette.grey[400],
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px',
            borderColor: palette.primary.main,
          },
        },
      },
    },
  },
  
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: 'none',
        fontWeight: 400,
        color: palette.primary.main,
        '&:hover': {
          color: palette.secondary.main,
          textDecoration: 'none',
        },
      },
    },
  },
  
  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: 48,
      },
      indicator: {
        height: 2,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
    },
  },
  
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 400,
        minHeight: 48,
        padding: '0 16px',
      },
    },
  },
  
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: '16px',
        borderBottom: `1px solid ${palette.divider}`,
      },
      head: {
        fontWeight: 500,
        backgroundColor: palette.background.light,
      },
    },
  },
};

// Crear tema base
let theme = createTheme({
  palette,
  typography,
  components,
  shape: {
    borderRadius: 0, // Esquinas cuadradas para diseño arquitectónico
  },
  // Sombras más sutiles
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.04)',
    '0px 2px 6px rgba(0, 0, 0, 0.06)',
    '0px 3px 8px rgba(0, 0, 0, 0.08)',
    '0px 4px 12px rgba(0, 0, 0, 0.08)',
    '0px 5px 16px rgba(0, 0, 0, 0.10)',
    ...Array(19).fill('none'),
  ],
});

// Hacer que las fuentes sean responsive
theme = responsiveFontSizes(theme);

// Gradientes elegantes para elementos visuales
export const elegantGradients = {
  primary: `linear-gradient(135deg, ${palette.primary.light} 0%, ${palette.primary.main} 100%)`,
  secondary: `linear-gradient(135deg, ${palette.secondary.light} 0%, ${palette.secondary.main} 100%)`,
  subtle: `linear-gradient(135deg, ${palette.grey[100]} 0%, ${palette.grey[200]} 100%)`,
  rainbow: `linear-gradient(90deg, 
    ${palette.accent1} 0%, 
    ${palette.accent2} 20%, 
    ${palette.accent3} 40%, 
    ${palette.accent4} 60%, 
    ${palette.accent5} 80%, 
    ${palette.secondary.main} 100%)`,
  rainbowSubtle: `linear-gradient(90deg, 
    ${palette.accent1}20 0%, 
    ${palette.accent2}20 20%, 
    ${palette.accent3}20 40%, 
    ${palette.accent4}20 60%, 
    ${palette.accent5}20 80%, 
    ${palette.secondary.main}20 100%)`,
};

export default theme;
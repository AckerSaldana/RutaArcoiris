// src/components/common/ContentCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardActions, 
  Divider, 
  Box,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled card con estilo minimalista
const StyledContentCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'accentPosition' && prop !== 'accentColor'
})(({ theme, accentPosition, accentColor }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 0,
  boxShadow: 'none',
  ...(accentPosition === 'left' && {
    borderLeft: `2px solid ${accentColor || theme.palette.primary.main}`,
    borderTop: 'none',
    borderRight: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  ...(accentPosition === 'top' && {
    borderTop: `2px solid ${accentColor || theme.palette.primary.main}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  ...(accentPosition === 'right' && {
    borderRight: `2px solid ${accentColor || theme.palette.primary.main}`,
    borderTop: 'none',
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  ...(accentPosition === 'bottom' && {
    borderBottom: `2px solid ${accentColor || theme.palette.primary.main}`,
    borderTop: 'none',
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
  }),
  ...(!accentPosition && {
    border: `1px solid ${theme.palette.divider}`,
    borderTop: 'none',
  }),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
}));

const ContentCard = ({
  title,
  titleIcon,
  subheader,
  children,
  actions,
  elevation = 0,
  accentPosition,
  accentColor,
  headerProps = {},
  contentProps = {},
  divider = false,
  sx = {},
}) => {
  const theme = useTheme();

  return (
    <StyledContentCard 
      elevation={elevation} 
      accentPosition={accentPosition}
      accentColor={accentColor}
      sx={sx}
    >
      {title && (
        <>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {titleIcon && <Box sx={{ mr: 1 }}>{titleIcon}</Box>}
                {title}
              </Box>
            }
            subheader={subheader}
            sx={{ 
              '& .MuiCardHeader-title': { 
                fontWeight: 400,
                letterSpacing: '0.02em',
              }
            }}
            {...headerProps}
          />
          {divider && <Divider />}
        </>
      )}
      
      <CardContent sx={{ flexGrow: 1, ...contentProps }}>
        {children}
      </CardContent>
      
      {actions && (
        <>
          {divider && <Divider />}
          <CardActions>
            {actions}
          </CardActions>
        </>
      )}
    </StyledContentCard>
  );
};

export default ContentCard;
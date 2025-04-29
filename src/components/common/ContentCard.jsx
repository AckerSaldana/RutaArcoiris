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

// Styled card with optional accent border
const StyledContentCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'accentPosition' && prop !== 'accentColor'
})(({ theme, accentPosition, accentColor }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  ...(accentPosition === 'left' && {
    borderLeft: `4px solid ${accentColor || theme.palette.primary.main}`,
  }),
  ...(accentPosition === 'top' && {
    borderTop: `4px solid ${accentColor || theme.palette.primary.main}`,
  }),
  ...(accentPosition === 'right' && {
    borderRight: `4px solid ${accentColor || theme.palette.primary.main}`,
  }),
  ...(accentPosition === 'bottom' && {
    borderBottom: `4px solid ${accentColor || theme.palette.primary.main}`,
  }),
}));

const ContentCard = ({
  title,
  titleIcon,
  subheader,
  children,
  actions,
  elevation = 1,
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
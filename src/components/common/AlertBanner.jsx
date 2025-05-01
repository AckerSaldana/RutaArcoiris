// src/components/common/AlertBanner.jsx
import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Link, 
  Button,
  useTheme 
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const AlertBanner = ({
  title,
  message,
  type = 'info',
  icon,
  action,
  actionText,
  actionLink,
  onActionClick,
  sx = {},
}) => {
  const theme = useTheme();
  
  // Define styles based on alert type
  const alertStyles = {
    info: {
      bg: 'transparent',
      color: theme.palette.info.main,
      borderColor: theme.palette.info.main,
      icon: icon || <InfoIcon />,
    },
    success: {
      bg: 'transparent',
      color: theme.palette.success.main,
      borderColor: theme.palette.success.main,
      icon: icon || <CheckCircleIcon />,
    },
    warning: {
      bg: 'transparent',
      color: theme.palette.warning.main,
      borderColor: theme.palette.warning.main,
      icon: icon || <WarningIcon />,
    },
    error: {
      bg: 'transparent',
      color: theme.palette.error.main,
      borderColor: theme.palette.error.main,
      icon: icon || <ErrorIcon />,
    },
  };
  
  const style = alertStyles[type] || alertStyles.info;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: style.bg,
        color: 'text.primary',
        borderRadius: 0,
        borderLeft: `2px solid ${style.borderColor}`,
        display: 'flex',
        ...sx
      }}
    >
      <Box sx={{ mr: 2, display: 'flex', alignItems: 'flex-start', color: style.color }}>
        {style.icon}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {title && (
          <Typography variant="subtitle1" component="div" fontWeight={400} gutterBottom letterSpacing="0.02em">
            {title}
          </Typography>
        )}
        <Typography variant="body2" component="div" color="text.secondary">
          {message}
        </Typography>
        
        {(actionText && (actionLink || onActionClick)) && (
          <Box sx={{ mt: 2 }}>
            {actionLink ? (
              <Link 
                component={Button}
                variant="text"
                href={actionLink}
                color={type}
                underline="none"
                sx={{ 
                  fontWeight: 400,
                  textTransform: 'none',
                  p: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  }
                }}
              >
                {actionText}
              </Link>
            ) : (
              <Button 
                variant="text" 
                color={type} 
                onClick={onActionClick}
                sx={{ 
                  fontWeight: 400,
                  textTransform: 'none',
                  p: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  }
                }}
              >
                {actionText}
              </Button>
            )}
          </Box>
        )}
      </Box>
      {action && (
        <Box sx={{ ml: 2 }}>
          {action}
        </Box>
      )}
    </Paper>
  );
};

export default AlertBanner;
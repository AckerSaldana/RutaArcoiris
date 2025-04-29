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
      bg: theme.palette.info.light,
      color: theme.palette.info.dark,
      borderColor: theme.palette.info.main,
      icon: icon || <InfoIcon />,
    },
    success: {
      bg: theme.palette.success.light,
      color: theme.palette.success.dark,
      borderColor: theme.palette.success.main,
      icon: icon || <CheckCircleIcon />,
    },
    warning: {
      bg: theme.palette.warning.light,
      color: theme.palette.warning.dark,
      borderColor: theme.palette.warning.main,
      icon: icon || <WarningIcon />,
    },
    error: {
      bg: theme.palette.error.light,
      color: theme.palette.error.dark,
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
        color: style.color,
        borderRadius: 2,
        borderLeft: `4px solid ${style.borderColor}`,
        display: 'flex',
        ...sx
      }}
    >
      <Box sx={{ mr: 2, display: 'flex', alignItems: 'flex-start' }}>
        {style.icon}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {title && (
          <Typography variant="subtitle1" component="div" fontWeight={600} gutterBottom>
            {title}
          </Typography>
        )}
        <Typography variant="body2" component="div">
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
                sx={{ fontWeight: 500 }}
              >
                {actionText}
              </Link>
            ) : (
              <Button 
                variant="text" 
                color={type} 
                onClick={onActionClick}
                sx={{ fontWeight: 500 }}
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
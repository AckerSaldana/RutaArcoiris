// src/components/common/ResourceCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Box, 
  Button, 
  Chip, 
  IconButton,
  useTheme
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { styled } from '@mui/material/styles';

// Styled tag chip
const TagChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ResourceCard = ({
  title,
  description,
  icon,
  resourceType,
  tags = [],
  language,
  downloadUrl,
  externalUrl,
  isSaved = false,
  onSave,
  onShare,
  onClick,
  sx = {},
}) => {
  const theme = useTheme();
  
  // Color based on resource type
  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
      case 'document':
        return theme.palette.error.main;
      case 'video':
        return theme.palette.warning.main;
      case 'link':
        return theme.palette.info.main;
      case 'guide':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };
  
  const typeColor = getTypeColor(resourceType);
  
  return (
    <Card 
      elevation={1} 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-4px)',
        },
        ...sx
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }} onClick={onClick}>
        {/* Header with icon and type */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon && (
              <Box 
                sx={{ 
                  mr: 1.5, 
                  color: typeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </Box>
            )}
            <Typography variant="h6" component="h3" fontWeight={600}>
              {title}
            </Typography>
          </Box>
          
          {resourceType && (
            <Chip 
              label={resourceType} 
              size="small"
              sx={{
                backgroundColor: `${typeColor}20`,
                color: typeColor,
                fontWeight: 500,
              }}
            />
          )}
        </Box>
        
        {/* Description */}
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        
        {/* Tags */}
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {tags.map((tag, index) => (
              <TagChip key={index} label={tag} size="small" />
            ))}
          </Box>
        )}
        
        {/* Language if applicable */}
        {language && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
              Idioma:
            </Typography>
            <Chip 
              label={language} 
              size="small" 
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          {downloadUrl && (
            <Button
              size="small"
              startIcon={<GetAppIcon />}
              href={downloadUrl}
              download
              color="primary"
            >
              Descargar
            </Button>
          )}
          
          {externalUrl && !downloadUrl && (
            <Button
              size="small"
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              Ver recurso
            </Button>
          )}
        </Box>
        
        <Box>
          <IconButton size="small" onClick={onShare} aria-label="Compartir recurso">
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onSave} aria-label={isSaved ? "Guardado" : "Guardar recurso"}>
            {isSaved ? <BookmarkIcon fontSize="small" color="primary" /> : <BookmarkBorderIcon fontSize="small" />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResourceCard;
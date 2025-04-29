// src/components/layout/Layout.jsx
import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, maxWidth = 'lg', disablePadding = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          py: disablePadding ? 0 : 4,
        }}
      >
        {maxWidth ? (
          <Container maxWidth={maxWidth} sx={{ py: disablePadding ? 0 : 2 }}>
            {children}
          </Container>
        ) : (
          children
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
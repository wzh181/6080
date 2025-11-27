import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HostPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Become a Host
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Host management functionality will be implemented here
        </Typography>
      </Box>
    </Container>
  );
};

export default HostPage;



import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const ListingDetailPage = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Listing Detail Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Details for listing ID: {id}
        </Typography>
      </Box>
    </Container>
  );
};

export default ListingDetailPage;



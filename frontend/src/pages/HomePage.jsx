import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  ButtonGroup,
} from '@mui/material';
import ListingCard from '../components/ListingCard';
import FilterListIcon from '@mui/icons-material/FilterList';

// Static mock data for listings
const mockListings = [
  {
    id: 1,
    title: 'Cozy Beach House',
    address: 'Bondi Beach, Sydney, Australia',
    thumbnail: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop',
    price: 250,
    rating: 4.8,
    reviews: 127,
    propertyType: 'House',
    bedrooms: 3,
  },
  {
    id: 2,
    title: 'Modern City Apartment',
    address: 'CBD, Melbourne, Australia',
    thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    price: 180,
    rating: 4.9,
    reviews: 89,
    propertyType: 'Apartment',
    bedrooms: 2,
  },
  {
    id: 3,
    title: 'Luxury Penthouse',
    address: 'Darling Harbour, Sydney, Australia',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    price: 450,
    rating: 5.0,
    reviews: 234,
    propertyType: 'Penthouse',
    bedrooms: 4,
  },
  {
    id: 4,
    title: 'Charming Studio',
    address: 'Surry Hills, Sydney, Australia',
    thumbnail: 'https://images.unsplash.com/photo-1502672260066-6bc35f0a1d5c?w=400&h=300&fit=crop',
    price: 120,
    rating: 4.6,
    reviews: 56,
    propertyType: 'Studio',
    bedrooms: 1,
  },
  {
    id: 5,
    title: 'Family Villa with Pool',
    address: 'Gold Coast, Queensland, Australia',
    thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    price: 380,
    rating: 4.7,
    reviews: 145,
    propertyType: 'Villa',
    bedrooms: 5,
  },
  {
    id: 6,
    title: 'Rustic Cottage',
    address: 'Blue Mountains, NSW, Australia',
    thumbnail: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop',
    price: 200,
    rating: 4.8,
    reviews: 98,
    propertyType: 'Cottage',
    bedrooms: 2,
  },
  {
    id: 7,
    title: 'Waterfront Apartment',
    address: 'Manly, Sydney, Australia',
    thumbnail: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
    price: 280,
    rating: 4.9,
    reviews: 167,
    propertyType: 'Apartment',
    bedrooms: 2,
  },
  {
    id: 8,
    title: 'Downtown Loft',
    address: 'Brisbane CBD, Queensland, Australia',
    thumbnail: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop',
    price: 220,
    rating: 4.5,
    reviews: 73,
    propertyType: 'Loft',
    bedrooms: 1,
  },
];

const HomePage = () => {
  return (
    <Box sx={{ minHeight: '80vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#484848' }}
          >
            Find Your Perfect Stay
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Discover unique homes and experiences around the world
          </Typography>
        </Box>

        {/* Filter Section */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <ButtonGroup variant="outlined" aria-label="filter buttons">
            <Button>All</Button>
            <Button>House</Button>
            <Button>Apartment</Button>
            <Button>Villa</Button>
            <Button>Studio</Button>
          </ButtonGroup>
          
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ borderColor: '#ddd' }}
          >
            More Filters
          </Button>
        </Box>

        {/* Listings Grid */}
        <Grid container spacing={3}>
          {mockListings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={listing.id}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
        </Grid>

        {/* Load More Section */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderColor: '#FF5A5F',
              color: '#FF5A5F',
              '&:hover': {
                borderColor: '#FF5A5F',
                backgroundColor: 'rgba(255, 90, 95, 0.04)',
              },
            }}
          >
            Load More Listings
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;



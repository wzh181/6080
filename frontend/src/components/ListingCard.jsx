import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        }
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={listing.thumbnail}
        alt={listing.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ mb: 0, flex: 1 }}>
            {listing.title}
          </Typography>
          {listing.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ fontSize: '1rem', color: '#FFD700' }} />
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {listing.rating}
              </Typography>
            </Box>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {listing.address}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
          <Chip label={listing.propertyType} size="small" color="primary" variant="outlined" />
          <Chip label={`${listing.bedrooms} bedrooms`} size="small" variant="outlined" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            ${listing.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            / night
          </Typography>
        </Box>

        {listing.reviews && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {listing.reviews} reviews
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ListingCard;



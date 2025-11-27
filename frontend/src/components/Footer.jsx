import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f7f7f7',
        py: 6,
        mt: 8,
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              About
            </Typography>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              How AirBrB works
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Newsroom
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Investors
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Careers
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Community
            </Typography>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Diversity & Belonging
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Accessibility
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              AirBrB Associates
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Guest Referrals
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Host
            </Typography>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Host your home
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Host an experience
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Responsible hosting
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Resource Center
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Support
            </Typography>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Help Center
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Cancellation options
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Neighborhood Support
            </Link>
            <Link href="#" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Trust & Safety
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 AirBrB, Inc. All rights reserved
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              aria-label="facebook"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="twitter"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              aria-label="instagram"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              aria-label="linkedin"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;



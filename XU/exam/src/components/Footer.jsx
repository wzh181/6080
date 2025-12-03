import React from 'react';
import { Container, Grid } from '@material-ui/core';

const Footer = () => {
  return (
    <Container
      component="footer"
      style={{
        backgroundColor: '#999999',
        height: '50px',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        padding: 0,
      }}
    >
      <Grid container spacing={4} justify="space-evenly">
        {/* Footer content */}
      </Grid>
    </Container>
  );
};

export default Footer;


import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Products from './Product/Products';
import PorductFilt from './Product/PorductFilt';


export default function FullWidthGrid() {
  return (
    <Box>
      <Grid container spacing={1}>
        <PorductFilt />
        <Grid item xs={6} md={8}>
          <Products />
        </Grid>
      </Grid>
    </Box>
  );
}

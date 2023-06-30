import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardProduct from './CardProduct';


// tiene que ser una array deberia importan todos los datos de la base de datos
import data from '../../data';


export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>

        {
          data.products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CardProduct key={product.id} product={product} />
            </Grid>
          ))
        }

        {/* <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardProduct />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardProduct />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardProduct />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardProduct />
        </Grid> */}

      </Grid>
    </Box>
  );
}

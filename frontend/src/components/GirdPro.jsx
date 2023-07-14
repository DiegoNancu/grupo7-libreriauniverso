import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Products from './Product/Products';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


export default function FullWidthGrid() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={3} md={2}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={6} md={8}>
          <Products />
        </Grid>
      </Grid>
    </Box>
  );
}

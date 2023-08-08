import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardProduct from './CardProduct';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

export default function Products({ selectedCategory, priceRange }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/listPro/');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const filteredProducts = Array.isArray(data.products)
    ? data.products.filter((product) => {
        const categoryMatch = selectedCategory ? product.categoria.includes(selectedCategory) : true;
        const priceMatch =
          product.precio_venta >= priceRange[0] && product.precio_venta <= priceRange[1];
        return categoryMatch && priceMatch;
      })
    : [];

  // Divide los productos en grupos de tres
  const productGroups = [];
  for (let i = 0; i < filteredProducts.length; i += 3) {
    productGroups.push(filteredProducts.slice(i, i + 3));
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      {loading ? (
        <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
      ) : (
        <Grid container spacing={2}>
          {productGroups.length > 0 ? (
            productGroups.map((group, index) => (
              <Grid container item key={index}  >
                {group.map((product) => (
                  <Grid item  key={product.id} paddingRight={2}>
                    <CardProduct product={product}/>
                  </Grid>
                ))}
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                No hay productos que coincidan con los filtros seleccionados.
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
}

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

  // Filtrar los productos basados en la categoría seleccionada y el rango de precios
  const filteredProducts = Array.isArray(data.products)
    ? data.products.filter((product) => {
        const categoryMatch = selectedCategory ? product.categoria.includes(selectedCategory) : true;
        const priceMatch =
          product.precio_venta >= priceRange[0] && product.precio_venta <= priceRange[1];
        return categoryMatch && priceMatch;
      })
    : [];

  return (
    <Box sx={{ flexGrow: 1, marginTop: 2 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {loading ? (
          <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
        ) : (
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* Verificar si hay productos filtrados */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item xs={11} sm={6} md={4} lg={3} key={product.id}>
                  <CardProduct product={product} />
                </Grid>
              ))
            ) : (
              // Si no hay productos filtrados, mostrar mensaje de "No hay productos"
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                  No hay productos que coincidan con los filtros seleccionados.
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

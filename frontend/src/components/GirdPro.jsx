import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Products from './Product/Products';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button'; // Importa el componente Button de Material-UI

function valuetext(value) {
  return `${value}°C`;
}

export default function FullWidthGrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([20, 37]);

  const getCategory = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/listCat');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  const [value, setValue] = React.useState([0, 100000]);

  const applyFilters = () => {
    // Aquí puedes utilizar "selectedCategory" y "priceRange" para filtrar los productos
    // Llama a una función o realiza una petición para obtener los productos filtrados y actualizar la vista.
    // Por ejemplo:
    // Filtrar productos basados en la categoría seleccionada y el rango de precios
    // Luego, actualiza el estado de los productos filtrados y muestra la vista actualizada
  };

  return (
    <Box>
      <Grid container spacing={1}>
        <Stack
          direction={{ xs: 'column' }}
          spacing={2}
          alignItems="center"
          sx={{
            backgroundColor: '#ffffff',
            marginTop: '8px',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            padding: '8px',
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="category-label">Categoría</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              autoWidth
              displayEmpty
              sx={{
                backgroundColor: '#ffffff',
                '& .MuiSelect-icon': {
                  color: '#555555',
                },
              }}
            >
              {loading ? (
                <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
              ) : (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {data.categories &&
                    data.categories.map((category, index) => (
                      <MenuItem key={index} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Grid>
              )}
            </Select>
          </FormControl>

          <Box sx={{ width: 190 }}>
            <InputLabel>Precio</InputLabel>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </Box>

          <Button variant="contained" onClick={applyFilters}>
            Aplicar filtros
          </Button>
        </Stack>

        <Grid item marginLeft={4}>
          <Products />
        </Grid>
      </Grid>
    </Box>
  );
}

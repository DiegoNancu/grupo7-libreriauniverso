import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Products from './Product/Products';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function valuetext(value) {
  return `${value}°C`;
}

export default function FullWidthGrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200000]); // Aumentar el rango del slider a [0, 500]

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
    setSelectedCategory(event.target.value); // Usar directamente el value del evento
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 200000]); // Restablecer el rango del slider a [0, 500]
    // Aquí puedes restablecer los demás estados relacionados con los filtros si los hay
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
                <MenuItem value="">
                  <em>Seleccione una categoría</em>
                </MenuItem>
              )}
              {data.categories &&
                data.categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}> {/* Usar directamente el _id como value */}
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Box sx={{ width: 150 }}> {/* Reducir la anchura del slider */}
            <InputLabel>Precio</InputLabel>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0} // Establecer el valor mínimo del slider a 0
              max={200000} // Establecer el valor máximo del slider a 500
            />
          </Box>

          <Button variant="contained" onClick={clearFilters} color="error" startIcon={<DeleteIcon />}>
            Borrar filtros
          </Button>
        </Stack>

        <Grid item marginLeft={4}>
          <Products selectedCategory={selectedCategory} priceRange={priceRange} />
        </Grid>
      </Grid>
    </Box>
  );
}

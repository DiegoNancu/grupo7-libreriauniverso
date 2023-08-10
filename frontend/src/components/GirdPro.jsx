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
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function valuetext(value) {
  return `${value}°C`;
}

// Crear un tema personalizado
const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <FullWidthGrid />
    </ThemeProvider>
  );
}

function FullWidthGrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

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

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 200000]);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Box>
      <Grid container spacing={1} >
        {!isLargeScreen && (
          <Button onClick={toggleDrawer}>
            {isDrawerOpen ? 'Cerrar filtros' : 'Abrir filtros'}
          </Button>
        )}
        {isLargeScreen ? (
          // Filtros mostrados normalmente en la página grande
          <Box sx={{ width: 250, marginRight: '16px' }}>
            <Stack
              direction={{ xs: 'column' }}
              spacing={2}
              alignItems="center"
              sx={{
                backgroundColor: '#ffffff',
                marginTop: '8px',
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
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <Box sx={{ width: 150 }}>
                <InputLabel>Precio</InputLabel>
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={0}
                  max={200000}
                />
              </Box>

              <Button
                variant="contained"
                onClick={clearFilters}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Borrar filtros
              </Button>
            </Stack>
          </Box>
        ) : (
          // Filtros en el Drawer para pantallas pequeñas
          <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
            <Stack
              direction={{ xs: 'column' }}
              spacing={2}
              alignItems="center"
              sx={{
                backgroundColor: '#ffffff',
                marginTop: '8px',
                padding: '8px',
                width: 250,
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
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <Box sx={{ width: 150 }}>
                <InputLabel>Precio</InputLabel>
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={0}
                  max={200000}
                />
              </Box>

              <Button
                variant="contained"
                onClick={clearFilters}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Borrar filtros
              </Button>
            </Stack>
          </Drawer>
        )}

        <Grid item xs={12} sm={isLargeScreen ? 8 : 12}>
            {/* Productos */}
          <Products selectedCategory={selectedCategory} priceRange={priceRange} />
        </Grid>


      </Grid>
        
    </Box>
  );
}

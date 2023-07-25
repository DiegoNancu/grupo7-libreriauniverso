import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Products from './Product/Products';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import { TextField } from '@mui/material';

function valuetext(value) {
  return `${value}°C`;
}

export default function FullWidthGrid() {

  const libraryCategories = ['Fantasía', 'Ciencia ficción', 'Romance', 'Misterio', 'Aventura'];

  const [selectedCategory, setSelectedCategory] = React.useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  return (
    <Box>
      <Grid container spacing={1}>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '8px',
          }}
        >
          <Grid width={200}>
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
                {libraryCategories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ width: 190, marginTop: 5 }} >
              <InputLabel>Precio</InputLabel>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </Box>
          </Grid>




        </Box>



        <Grid item xs={6} md={8}>
          <Products />
        </Grid>
      </Grid>
    </Box>
  );
}

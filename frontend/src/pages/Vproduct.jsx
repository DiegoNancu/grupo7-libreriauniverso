import React, { useState } from 'react';
import '../App.css';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import NavBar from "../components/NavBar"

const Product = () => {
  const [availability, setAvailability] = useState(true);
  const [quantity, setQuantity] = useState(1); // Estado para almacenar la cantidad del producto

  const addToCart = () => {
    if (availability) {
      // Lógica para agregar al carrito (no implementada en este ejemplo)
      alert(`Se agregaron ${quantity} producto(s) al carrito`);
    } else {
      alert('Producto agotado');
    }
  };

  const increaseQuantity = () => {
    if (availability) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <Card className="Product">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="div" 
            style={{ width: '80%', height: '400px' }} 
            image="https://www.village.cl/cdn/shop/products/376145_1.jpg" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h6">Lápiz punta fina Stabilo</Typography>
            <div style={{ margin: '10px 0' }}>
              <Typography variant="body2">
                Dale color a tus apuntes y trabajos con los Tiralíneas Stabilo
              </Typography>
            </div>
            <div style={{ margin: '10px 0' }}>
              <Typography variant="body2">
                Precio: $ {21990}
              </Typography>
            </div>
            <div style={{ margin: '10px 0' }}>
              <Typography variant="body2">
                Disponibilidad: {availability ? 'Disponible' : 'Agotado'}
              </Typography>
            </div>
            <div style={{ margin: '10px 0' }}>
              <Button variant="outlined" color="primary" onClick={decreaseQuantity}>
                -
              </Button>
              <span style={{ margin: '0 10px' }}>{quantity}</span>
              <Button variant="outlined" color="primary" onClick={increaseQuantity}>
                +
              </Button>
            </div>
            <div style={{ margin: '10px 0' }}>
              <Button variant="contained" color="primary" onClick={addToCart}>
                Agregar {quantity} al Carrito
              </Button>
            </div>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

function App() {
  return (
    <div className="App">
      <NavBar />
      <div style={{ marginTop: '80px' }}>
        <Product />
      </div>
    </div>
  );
}

export default App; 
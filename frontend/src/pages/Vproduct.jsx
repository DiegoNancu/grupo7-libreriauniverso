import React, { useEffect, useState, useCallback } from 'react';
import '../App.css';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import NavBar from "../components/NavBar"
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Product = () => {
  const [availability, setAvailability] = useState(true);
  const [quantity, setQuantity] = useState(1); // Estado para almacenar la cantidad del producto
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useNavigate();

  const getCategory = async () => {
    try {
      const response = await axios.get(`http://146.83.198.35:1338/api/listPro/search/${id}`);
      setData(response.data.product);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);





  const addToCart = (quantity) => {
    if (quantity <= data.stock) {
      history(`/cart/${data._id}/${quantity}`)
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'Has seleccionado muchos productos, el stock es de ' + data.stock + ' unidades.',
        confirmButtonText: 'Entendido',
      });
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

  console.log(data.stock)

  return (
    <Card className="Product">
      <Grid container >
        <Grid item xs={12} md={6}
          justifyContent="center"  // Centra horizontalmente
          alignItems="center"     // Centra verticalmente
          display={'flex'}
        >
          <CardMedia
            component="div" 
            style={{ width: '90%', height: '500px', margin: 'auto' }} 
            image="https://www.village.cl/cdn/shop/products/376145_1.jpg" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h5" paddingBottom={4} paddingTop={10}>{data.nombre}</Typography>
            <div style={{ margin: '10px 0' }}>
              {/* <Typography variant="body2">
                Dale color a tus apuntes y trabajos con los Tiralíneas Stabilo
              </Typography> */}
            </div>
            <div style={{ margin: '10px 0' }}>
              <Typography variant="body2">
                Precio: $ {data.precio_venta}
              </Typography>
            </div>
            <div style={{ margin: '10px 0' }}>
              <Typography variant="body2">
                Disponibilidad: {data.stock > 0 ? 'Disponible' : 'Agotado'}
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
              <Button variant="contained" color="primary" onClick={() => addToCart(quantity)} disabled={data.stock === 0}>
                Comprar {quantity}
              </Button>
            </div>
            {/* <div style={{ margin: '10px 0' }}>
              <Button variant="contained" color="primary" onClick={addToCart} disabled={data.stock === 0}>
                Agregar {quantity} al Carrito
              </Button>
            </div> */}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

function Vproduct() {
  return (
    <div className="App" >
      <NavBar />
      <div style={{ marginTop: '80px'}}>
        <Product />
      </div>
    </div>
  );
}

export default Vproduct; 
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import NavBar from "../components/NavBar"
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CompraPro = () => {

  const { id } = useParams();
  const { cantidad } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setRut] = useState('');



  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rut : '',
    quantity: cantidad,
  });


  const getCategory = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/listPro/search/${id}`);
      
      setData(response.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRutChange = (e) => {
    setRut(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para enviar los datos del formulario y confirmar la compra
    console.log('Formulario enviado:', formData);
  };

  return (
    <Container>
      <NavBar />
      <Typography variant="h4" gutterBottom marginTop={'80px'}>
        Confirmación de Compra
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">{data.nombre}</Typography>
              <Typography variant="subtitle1">Precio: ${data.precio_venta}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={()=>handleSubmit}>
            <TextField
              margin='normal'
              label="Nombre"
              name="name"
              onChange={()=>handleNameChange}
              fullWidth
              required
            />
            <TextField
              margin='normal'
              label="Correo Electrónico"
              name="email"
              type="email"
              onChange={()=>handleEmailChange}
              fullWidth
              required
            />
            <TextField
              margin='normal'
              label="rut"
              name="rut"
              onChange={ ()=>handleRutChange}
              fullWidth
              required
            />
            <TextField
              margin='normal'
              label="Cantidad"
              name="quantity"
              type="number"
              defaultValue={formData.quantity}
              fullWidth
              required
              disabled
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Confirmar Compra
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompraPro;

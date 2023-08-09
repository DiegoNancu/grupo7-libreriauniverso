import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Grid, Card, CardContent, TextField, Button,FormControl } from '@mui/material';
import NavBar from "../components/NavBar"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CompraPro = () => {

  const { id } = useParams();
  const { cantidad } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const currentDate = new Date();
  const [isLogged, setIsLogged] = useState(Cookies.get('logged') === 'true');

  const [formData, setFormData] = useState({
    nombreProducto: '',
    nombre: '',
    emailUsuario: '',
    rut : '',
    quantity: cantidad,
  });
 
  const [compra, setCompra] = useState({
    id_user: '',
    id_producto: '',
    fecha_compra: '',
  });

  const getCategory = useCallback(async () => {
    try {
      const response = await axios.get(`http://146.83.198.35:1338/api/listPro/search/${id}`);
      const userId = await axios.get(`http://146.83.198.35:1338/api/getUserByEmail/${Cookies.get('email')}`);
      setData(response.data.product);
      
      if(formData.nombreProducto === ''){
        setFormData({
          ...formData,
          nombreProducto: response.data.product.nombre,
        })

        setCompra({
          id_user: userId.data._id,
          id_producto: response.data.product._id,
          fecha_compra: currentDate.toISOString(),
        });

    }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [currentDate, formData, id]);


  useEffect(() => {
    getCategory();
  }, [compra.id_user, getCategory, isLogged]);


	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(isLogged)
    if(isLogged === false){
      Swal.fire({
        title: 'Error',
        text: 'Debes iniciar sesión para realizar la compra',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          history(`/Login`);
        }
      })
    }else{
      Swal.fire({
        title: 'Confirmar compra',
        text: '¿Deseas confirmar la compra y enviar el correo electrónico?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(formData)
          console.log(compra)
          axios.post('http://146.83.198.35:1338/api/sendEmail/', formData).then((response) => {
            axios.post('http://146.83.198.35:1338/api/createCompra/', compra).then((response) => {
              Swal.fire({
                title: 'Compra realizada',
                text: 'La compra se ha realizado exitosamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.isConfirmed) {
                  history(`/`);
                }
              })
            })
          })
      }});
    }
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

            <TextField
              autoFocus
              margin='normal'
              label="Nombre"
              name="nombre"
              variant="outlined"
              inputProps={{ 'aria-label': 'search' }}
              onInput={onChange}
              required
            />
          
            <TextField    
              margin='normal'
              label="Correo Electrónico"
              name="emailUsuario"
              type="email"
              variant="outlined"
              onChange={onChange}
              required
            />
          
            <TextField    
              margin='normal'
              label="Rut"
              name="rut"
              variant="outlined"
              onChange={onChange}
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
            <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Confirmar Compra
            </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompraPro;

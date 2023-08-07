import React, { useState, useEffect } from 'react';
import { Stack, Button, Card, CardHeader, Typography, CardContent, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Compras = () => {
  const [compras, setCompras] = useState([]);
  const [user, setUser] = useState({ user: null, loading: false });
  const [isLogged, setIsLogged] = useState(Cookies.get('logged') === 'true');

  const getUser = async () => {
    const response = await axios.get(`${process.env.API_URL}/getUserByEmail/${Cookies.get('email')}`);
    setUser(response.data);
  };

  useEffect(() => {
    if (isLogged) {
      getUser();
    }
  }, [isLogged]);

  useEffect(() => {
    if (user.user !== null) {
      getComprasByUser();
    }
  }, [user]);

  const getComprasByUser = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/getComprasByUser/${user._id}`);
      setCompras(response.data);
    } catch (error) {}
  };

  const reclamos = (id) => {
    Cookies.set('idCompras', id);
  };

  const showCompras = () => {
    if (compras.length === 0) {
      return (
        <Card sx={{ boxShadow: 'lg', marginLeft: 30, marginTop: 4, border: '1px solid', borderColor: '#AEDBC4' }}>
          <CardHeader>
            <Typography variant='h4' component='i'>
              No se han realizado compras.
            </Typography>
          </CardHeader>
          <CardContent>
            <Typography variant='h6'>Al realizar compras podrás ver cada una de ellas aquí</Typography>
          </CardContent>
        </Card>
      );
    } else {
      return compras.map((compra) => {
        return (
          <Card
            key={compra._id}
            sx={{ boxShadow: 'lg', marginLeft: 30, marginTop: 4, border: '1px solid', borderColor: '#80DEEA' }}
          >
            <CardHeader textAlign={'center'}>
              <Typography variant='h6'>{compra.id_producto}</Typography>
              <Typography>Fecha de compra: {compra.fecha_compra}</Typography>
              <Button color='primary' size='medium' variant='contained' component={Link}
                to={"/reclamos"} onClick={() => reclamos(compra._id)}>
                Gestionar Reclamo
              </Button>
            </CardHeader>
          </Card>
        );
      });
    }
  };

  return (
    <Stack alignItems={'center'} textAlign={'center'}>
      <NavBar></NavBar>
      <Grid container columns={compras.length < 2 ? 1 : 4}>
        {showCompras()}
      </Grid>
    </Stack>
  );
};

export default Compras;

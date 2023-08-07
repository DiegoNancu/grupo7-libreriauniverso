import React, { useState } from 'react';
import { Button, Container, FormControl, FormLabel, Stack, InputAdornment, Input, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const SignUp = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [values, setValues] = useState({
    name: '',
    rut: '',
    email: '',
    password: '',
    number: '',
    id_Companys: '',
  });

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      const response = await axios.post(`${process.env.API_URL}/sign_up`, values);
      console.log(response);
      if (response.status === 201) {
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario se ha registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/login');
          }
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al ingresar los parametros',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'No se ha podido crear el usuario',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Stack p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
        <Container maxWidth="md" center>
          <Typography variant="h3" align="center" mt={4}>
            Registrar
          </Typography>
          <Stack my={4} spacing={4}>
            <FormControl fullWidth>
              <FormLabel fontSize="32px">Nombre.</FormLabel>
              <Input placeholder="Ej: Pedro Martinez" maxLength={100} onChange={onChange} name="name" />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel fontSize="32px">Rut.</FormLabel>
              <Input placeholder="Ej: 9.999.999-k" maxLength={12} onChange={onChange} name="rut" />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel fontSize="32px">Email.</FormLabel>
              <Input placeholder="Ej: pedro.martinez@gmail.com" type="email" maxLength={100} onChange={onChange} name="email" />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel fontSize="32px">Contraseña.</FormLabel>
              <TextField
                variant="outlined"
                type={show ? 'text' : 'password'}
                onChange={onChange}
                name="password"
                placeholder="Contraseña"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button size="small" onClick={handleClick}>
                        {show ? 'Ocultar' : 'Mostrar'}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel fontSize="32px">Número de telefono.</FormLabel>
              <Input
                placeholder="Ej: 987564321"
                type="number"
                maxLength={9}
                onChange={onChange}
                name="number"
                startAdornment={<InputAdornment position="start">+56</InputAdornment>}
              />
            </FormControl>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Agregar
            </Button>
            <Button variant="contained" color="secondary" component={Link} to={"/"}>
              Cancelar
            </Button>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
};

export default SignUp;
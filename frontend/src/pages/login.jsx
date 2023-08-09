import React, { useState } from 'react';
import { Button, Checkbox, Container, FormControl, FormLabel, Stack, Input, InputAdornment, IconButton, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import FormHelperText from '@mui/material/FormHelperText';
import ErrorIcon from '@mui/icons-material/Error';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const registrar = () => {
    navigate('/SignUp');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(values.email)) {
        Swal.fire({
            title: 'Error',
            text: 'El correo electrónico no tiene un formato válido.',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
        return;
    }
    try {
      const response = await axios.post(`http://localhost:3001/api/login`, values);
      Cookies.set('email', response.data.person);
      Cookies.set('logged', 'true');
      if (response.status === 201) {
        Swal.fire({
          title: 'Inicio de sesion',
          text: 'Se ha iniciado sesión correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al iniciar sesión',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Error al iniciar sesión',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const [validFields, setValidFields] = useState({
    email: true,
});

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setValidFields((prevValidFields) => ({
          ...prevValidFields,
          email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      }));
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Stack sx={{ minHeight: '100vh', flexDirection: { xs: 'column', md: 'row' } }}>
      <Stack p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
        <Container maxWidth="md" center>
          <Typography variant="h3" align="center" mt={4}>
            Iniciar sesión
          </Typography>
          <Stack my={4} spacing={4}>
            <FormControl fullWidth id="email">
            <FormLabel fontSize="32px">Email.</FormLabel>
    <Input
        placeholder="Ej: pedro.martinez@gmail.com"
        type="email"
        maxLength={100}
        onChange={onChange}
        name="email"
        sx={{ backgroundColor: validFields.email ? 'white' : '#FFC0CB' }}
    />
    {!validFields.email && (
        <FormHelperText error>
            <ErrorIcon sx={{ marginRight: 1 }} />
            El correo electrónico no tiene un formato válido.
        </FormHelperText>
    )}
            </FormControl>
            <FormControl fullWidth id="password">
              <FormLabel fontSize="30">Contraseña</FormLabel>
              <Input
                onChange={onChange}
                name="password"
                placeholder="contraseña"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox color="primary">Recordar Cuenta</Checkbox>
                <RouterLink to="/forgot_password" style={{ color: 'blue' }}>
                  ¿Olvidó su Contraseña?
                </RouterLink>
              </Stack>
              <Button onClick={onSubmit} variant="contained" color="primary">
                Iniciar sesión
              </Button>
              <Button onClick={registrar} variant="contained" color="primary">
                Aún no tengo una cuenta
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
};

export default Login;

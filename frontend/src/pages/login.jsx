import React, { useState } from 'react';
import { Button, Checkbox, Container, FormControl, FormLabel, Stack, Input, InputAdornment, IconButton, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const goToSignUp = () => {
    router.push('/sign_up');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      const response = await axios.post(`${process.env.API_URL}/login`, values);
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
            router.push('/main_view');
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

  const onChange = (e) => {
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
              <FormLabel fontSize="30">Correo</FormLabel>
              <Input onChange={onChange} name="email" placeholder="correo@gmail.com" type="email" />
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
              <Button onClick={goToSignUp} variant="contained" color="primary">
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

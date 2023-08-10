import React, { useState } from 'react';
import { Button, Container, FormControl, FormLabel, Stack, InputAdornment, Input, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Link,  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormHelperText from '@mui/material/FormHelperText';
import ErrorIcon from '@mui/icons-material/Error';

const SignUp = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [values, setValues] = useState({
    name: '',
    rut: '',
    email: '',
    password: '',
    number: '',
  });
  const [email1, setEmail] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    //Validar el largo del número telefónico
    if (values.number.length != 9) {
      Swal.fire({
          title: 'Error',
          text: 'El número de teléfono debe tener 9 dígitos.',
          icon: 'error',
          confirmButtonText: 'Ok',
      });
      return;
  }
  //Validar Contraseña
  if (!values.password || values.password.trim() === '') {
    Swal.fire({
        title: 'Error',
        text: 'La contraseña no puede estar vacía.',
        icon: 'error',
        confirmButtonText: 'Ok',
    });
    return;
}
  //Validar el tamaño del rut
  if (values.rut.length > 12 || values.rut.length < 11) {
    Swal.fire({
        title: 'Error',
        text: 'El rut ingresado es incorrecto, por favor ingrese el rút en el siguiente formato "XX.XXX.XXX-X"',
        icon: 'error',
        confirmButtonText: 'Ok',
    });
    return;
  }
   // Validar el nombre (permitir solo letras)
  const nameRegex = /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/;

  if (!nameRegex.test(values.name)) {
    Swal.fire({
        title: 'Error',
        text: 'El nombre solo debe contener letras.',
        icon: 'error',
        confirmButtonText: 'Ok',
    });
    return;
    }
    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(values.email)) {
        Swal.fire({
            title: 'Error',
            text: 'El correo electrónico no tiene un formato válido.',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
        return; // Detener el proceso de envío
    }
    //console.log(values);
    try {
      const response = await axios.post(`http://localhost:3001/api/sign_up`, values);
      if (response.status === 201) {
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario se ha registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then((result) => {
          console.log(email1);
          axios.post(`http://localhost:3001/api/sendEmailSingUp`, email1);
          if (result.isConfirmed) {
            navigate('/Login');
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

  const [validFields, setValidFields] = useState({
    name: true,
    rut: true,
    email: true,
    password: true,
    number: true,
});


  const onChange = (e) => {
    const { name, value } = e.target;

    // Validar el valor y actualizar validFields
    if (name === 'name') {
        setValidFields((prevValidFields) => ({
            ...prevValidFields,
            name: /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(value),
        }));
    } else if (name === 'rut') {
        setValidFields((prevValidFields) => ({
            ...prevValidFields,
            rut: /^(\d{1,3}(\.\d{3}){2}-[\dkK])|([\dkK])$/.test(value),
        }));
    } else if (name === 'email') {
        setValidFields((prevValidFields) => ({
            ...prevValidFields,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        }));
    }else if (name === 'password') {
      setValidFields((prevValidFields) => ({
          ...prevValidFields,
          password: value.trim() !== '', // Validar que no esté vacía
      }));
    }else if (name === 'number') {
        setValidFields((prevValidFields) => ({
            ...prevValidFields,
            number: value.length == 9,
        }));
    }

    setValues({
        ...values,
        [name]: value,
    });
        setEmail({
            ...values,
            [e.target.name]: e.target.value,
        })
    console.log(email1);
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
    <Input
        placeholder="Ej: Pedro Martinez"
        maxLength={100}
        onChange={onChange}
        name="name"
        sx={{ backgroundColor: validFields.name ? 'white' : '#FFC0CB' }}
    />
    {!validFields.name && (
        <FormHelperText error>
            <ErrorIcon sx={{ marginRight: 1 }} />
            El nombre solo debe contener letras.
        </FormHelperText>
    )}
</FormControl>
<FormControl fullWidth>
    <FormLabel fontSize="32px">Rut.</FormLabel>
    <Input
        placeholder="Ej: 9.999.999-k"
        maxLength={12}
        onChange={onChange}
        name="rut"
        sx={{ backgroundColor: validFields.rut ? 'white' : '#FFC0CB' }}
    />
    {!validFields.rut && (
        <FormHelperText error>
            <ErrorIcon sx={{ marginRight: 1 }} />
            El rut no tiene un formato válido.
        </FormHelperText>
    )}
</FormControl>
<FormControl fullWidth>
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
        sx={{ backgroundColor: validFields.password ? 'white' : '#FFC0CB' }}
    />
    {!validFields.password && (
        <FormHelperText error>
            <ErrorIcon sx={{ marginRight: 1 }} />
            La contraseña no puede estar vacía.
        </FormHelperText>
    )}
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
        sx={{ backgroundColor: validFields.number ? 'white' : '#FFC0CB' }}
    />
    {!validFields.number && (
        <FormHelperText error>
            <ErrorIcon sx={{ marginRight: 1 }} />
            El número de teléfono debe tener 9 dígitos.
        </FormHelperText>
    )}
            </FormControl>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Agregar
            </Button>
            <Button variant="contained" color="secondary" component={Link} to={"/Login"}>
              Cancelar
            </Button>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
};

export default SignUp;
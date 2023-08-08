import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Stack, Radio, RadioGroup, FormControlLabel, Select, MenuItem, InputLabel, Input } from '@mui/material';

const Reclamos = () => {
  const [reclamo, setReclamo] = useState('');
  const [tipoReclamo, setTipoReclamo] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [imagen, setImagen] = useState(null); // Variable de estado para almacenar la imagen seleccionada

  const handleInputChange = (e) => {
    setReclamo(e.target.value);
  };

  const handleTipoReclamoChange = (e) => {
    setTipoReclamo(e.target.value);
    setMostrarMensaje(e.target.value === 'cancelar');
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0]; // Obtenemos el archivo seleccionado
    setImagen(file); // Almacenamos el archivo en la variable de estado
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el reclamo y la imagen al servidor o realizar cualquier otra acción necesaria
    console.log('Tipo de Reclamo:', tipoReclamo);
    console.log('Reclamo:', reclamo);
    console.log('Imagen:', imagen);
    setTipoReclamo('');
    setReclamo('');
    setMostrarMensaje(false);
    setImagen(null); // Reinicia la variable de estado de la imagen después de enviarla
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 3 }}>
        Formulario de Reclamos
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <InputLabel>Motivo de Reclamo</InputLabel>
          <Select
            required
            fullWidth
            value={tipoReclamo}
            onChange={handleTipoReclamoChange}
          >
            <MenuItem value="noRecibido">No he recibido el producto.</MenuItem>
            <MenuItem value="cancelar">Quiero cancelar esta compra.</MenuItem>
            <MenuItem value="productoNoCumple">El producto no cumple con lo que promete.</MenuItem>
            <MenuItem value="otros">Otros (Explica el problema en "Descripción del Problema")</MenuItem>
          </Select>
          <InputLabel>Descripción del Problema</InputLabel>
          <TextField
            required
            fullWidth
            id="reclamo"
            multiline
            rows={4}
            variant="outlined"
            value={reclamo}
            onChange={handleInputChange}
          />
          {mostrarMensaje && (
            <Typography variant="body2" color="secondary">
              Importante: El período para cancelar esta compra es de 24 horas.
            </Typography>
          )}
          <Input
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={handleImagenChange}
            sx={{ display: 'none' }}
            id="imagenInput"
          />
          <label htmlFor="imagenInput">
            <Button variant="contained" component="span">
              Agregar Foto
            </Button>
          </label>
          {imagen && <Typography variant="body2">{imagen.name}</Typography>}
          <Button type="submit" variant="contained" color="primary">
            Enviar Reclamo
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Reclamos;

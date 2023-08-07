import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '4px',
});

export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleAddProduct = () => {
    // En este ejemplo, simplemente imprimimos los datos en la consola
    // Aquí puedes enviar los datos al servidor utilizando axios u otra biblioteca para guardarlos en la base de datos
    console.log('Nombre del producto:', productName);
    console.log('Precio del producto:', productPrice);

    // Puedes realizar una solicitud HTTP al servidor aquí para guardar los datos en la base de datos
    // Por ejemplo:
    // axios.post('http://localhost:3001/api/addProduct', {
    //   name: productName,
    //   price: productPrice,
    // }).then((response) => {
    //   console.log(response.data);
    // }).catch((error) => {
    //   console.error('Error al agregar el producto:', error);
    // });
  };

  return (
    <Container>
      <FormContainer>
        <TextField
          label="Nombre del producto"
          value={productName}
          onChange={handleProductNameChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Precio del producto"
          value={productPrice}
          onChange={handleProductPriceChange}
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddProduct} color="primary">
          Agregar Producto
        </Button>
      </FormContainer>
    </Container>
  );
}

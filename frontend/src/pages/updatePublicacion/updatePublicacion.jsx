import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../../components/NavBar';
import { Stack, Container, FormControl, FormLabel, Typography, Button, Card, MenuItem, Select, CircularProgress, OutlinedInput} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdatePro = (data) => {
    const navigate = useNavigate();

    const location = useLocation();

    const [valcat, setValcat] = useState([]);

    const [loading, setLoading] = useState(true);

    let [values, setProducto] = useState(location.state)

    const categorias = async () => {
        const cat  = await axios.get('http://localhost:3001/api/listCat')
        setValcat(cat.data)
        setLoading(false);
    }

    useEffect(() => {
        categorias();
    }, []);

    const onSubmit = async (e) =>  {
        e.preventDefault()
        for(const key in values) {
            if(values[key] === '') {
                values[key] = values[key]
            }
        }

        try {
            const response = await axios.put(`http://localhost:3001/api/updatePro/${values._id}`, values)
            if (response.status === 200) {
                Swal.fire({
                    title: 'Publicacion actualizada',
                    text: 'La publicacion se ha actualizado correctamente',
                    icon: 'success',
                    confirmButtontext: 'OK'
                }).then((result) => {
                    if(result.isConfirmed) {
                        navigate('/AdminPubli')
                    }
                })
            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Error al ingresar los nuevos parametros',
                    icon: 'error',
                    confirmButtontext: 'OK'
                })
            }
        }catch{
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido actualizar la publicacion',
                icon: 'Error',
                confirmButtontext: 'OK'
            })
        }
    }

    const onChange = (e) => {
        setProducto({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div>
            <NavBar />
        <Stack alignItems="center" textAlign="center" spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Card sx={{ backgroundColor: 'white', borderRadius: 10, boxShadow: 'md' }}>
            </Card>
            <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" my={4}>Actualización de Producto</Typography>
            <Stack my={4} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <OutlinedInput
                        type="text"
                        name="nombre"
                        defaultValue={values.nombre}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Costo</FormLabel>
                    <OutlinedInput
                        type="Number"
                        name= "costo"
                        defaultValue={values.costo}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Precio venta</FormLabel>
                    <OutlinedInput
                        type="Number"
                        name= "precio_venta"
                        defaultValue={values.precio_venta}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl variant='filled'>
                    <FormLabel>Stock</FormLabel>
                    <OutlinedInput
                        type="Number"
                        name="stock"
                        defaultValue={values.stock}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl>
                <Select
                        labelId="category-label"
                        onChange={onChange}
                        name="categoria"
                        autoWidth
                        sx={{
                        width: "300px",
                        backgroundColor: '#fffff',
                        '& .MuiSelect-icon': {
                        color: '#555555',
                        },
                    }}
                    >
                    {loading ? (
                    <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
                    ) : (
                    <MenuItem value="">
                        <em>Seleccione una categoría</em>
                    </MenuItem>
                    )}
                    {valcat.categories &&
                    valcat.categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                            {category.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" p={2}>
                    <Button variant="contained" color="success"onClick={onSubmit}>Actualizar </Button>
                    <Button variant="contained" color="error"onClick={() => navigate('/AdminPubli')}>Cancelar</Button>
                </Stack>
            </Stack>
            </Container>
        </Stack>
        </div>
    )
}

export default UpdatePro;
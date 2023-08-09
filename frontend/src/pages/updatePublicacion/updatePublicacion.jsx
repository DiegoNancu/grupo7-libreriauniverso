import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Stack, Container, FormControl, Typography, Button, Card, MenuItem, Select, CircularProgress, OutlinedInput, InputLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdatePro = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const [valcat, setValcat] = useState([]);

    const [loading, setLoading] = useState(true);

    let [values, setValues] = useState(location.state);

    const categorias = async () => {
        const cat = await axios.get('http://localhost:3001/api/listCat')
        setValcat(cat.data)
        setLoading(false);
    }

    useEffect(() => {
        categorias();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault()
        for (const key in values) {
            if (values[key] === '') {
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
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/AdminPubli')
                    }
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al ingresar los nuevos parametros',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        } catch {
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido actualizar la publicacion',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div>
            <Stack alignItems="center" textAlign="center" spacing={{ xs: 1, sm: 2, md: 4 }} marginTop={"80px"}>
                <Card sx={{ backgroundColor: '#F9F9F9', borderRadius: 10, boxShadow: 'md' }}>
                    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" my={4}>Actualización de Producto</Typography>
                        <Stack my={4} spacing={{ xs: 1, sm: 2, md: 4 }}>
                            <FormControl>
                                <InputLabel id="nombre-label">Nombre</InputLabel>
                                <OutlinedInput
                                    label="Nombre"
                                    labelId="nombre-label"
                                    type="text"
                                    name="nombre"
                                    defaultValue={values.nombre}
                                    onChange={onChange}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel id="costo-label">Costo</InputLabel>
                                <OutlinedInput
                                    label="costo"
                                    labelId="costo-label"
                                    type="number"
                                    name="costo"
                                    defaultValue={values.costo}
                                    onChange={onChange}
                                    inputProps={{ min: 0 }}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel id="precio-label">Precio Venta</InputLabel>
                                <OutlinedInput
                                    label="precio venta"
                                    labelId="precio-label"
                                    type="number"
                                    name="precio_venta"
                                    defaultValue={values.precio_venta}
                                    onChange={onChange}
                                    inputProps={{ min: 0 }}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel id="stock-label">Stock</InputLabel>
                                <OutlinedInput
                                    label="Stock"
                                    labelId="stock-label"
                                    type="number"
                                    name="stock"
                                    defaultValue={values.stock}
                                    onChange={onChange}
                                    inputProps={{ min: 0 }}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel id="category-label">Categoría</InputLabel>
                                <Select
                                    label="Categoria"
                                    labelId="category-label"
                                    onChange={onChange}
                                    name="categoria"
                                    value={values.categoria} // Establecer el valor seleccionado aquí
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
                                <Button variant="contained" color="success" onClick={onSubmit}>Actualizar</Button>
                                <Button variant="contained" color="error" onClick={() => navigate('/AdminPubli')}>Cancelar</Button>
                            </Stack>
                        </Stack>
                    </Container>
                </Card>
            </Stack>
        </div>
    )
}

export default UpdatePro;

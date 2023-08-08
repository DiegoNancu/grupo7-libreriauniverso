import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, Typography, Button, Stack, Grid, Container, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import logo from "../../assets/logo.jpg";

const PublicacionAdmin = () => {
    const navigate = useNavigate();
    const [publicaciones, setPublicacion] = useState([]);

    const getPublicacion = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/listPro');
            setPublicacion(response.data.products);
        } catch (error) {
        }
    };

    useEffect(() => {
        getPublicacion();
    }, []);

    const deleteId = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Estas seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarlo!',
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3001/api/deletePro/${id}`);
                getPublicacion();
            }
        } catch (error) {
        }
    };

    const showPublicaciones = () => {
        try {
            return (
                <Grid container spacing={2} marginTop={"80px"}>
                    {publicaciones.map((publi) => (
                        <Grid item xs={12} sm={6} md={4} key={publi._id}>
                            <Card
                                boxShadow="1"
                                ml={30}
                                my={4}
                                variant="outlined"
                                overflow="hidden"
                                alignItems="center"
                                borderRadius={20}
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={logo}
                                    alt="Product"
                                />
                                <CardHeader
                                    title={<Typography variant="h6">{publi.nombre}</Typography>}
                                    subheader={
                                        <>
                                            <Typography variant="body2">{"Costo:$"}{publi.costo}</Typography>
                                            <Typography variant="body2">{"Precio:$"}{publi.precio_venta}</Typography>
                                            <Typography variant="body2">{"Cantidad:"}{publi.stock}</Typography>
                                        </>
                                    }
                                />
                                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" p={2} flex={1}>
                                    <Button startIcon={<EditIcon />} color="primary" variant="contained" onClick={() => { navigate("/UpdatePubli", { state: publi }) }}>Editar</Button>
                                    <Button startIcon={<DeleteIcon />} color="error" variant="contained" onClick={() => deleteId(publi._id)}>Eliminar</Button>
                                </Stack>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            );
        } catch (err) {
            // Handle error
        }
    };

    return (
        <div>
            <Stack alignItems="center" textAlign="center" marginTop={"80px"}>
                <Stack my={4}>
                    <Link to="/CreatePubli">
                        <Button
                            startIcon={<AddIcon/>}
                            variant="contained"
                            color="primary"
                            size="medium">
                            Crear Publicación
                        </Button>
                    </Link>
                </Stack>
                <Container maxWidth="md">
                    {showPublicaciones()}
                </Container>
            </Stack>
        </div>
    );
};

export default PublicacionAdmin;


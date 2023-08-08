import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardHeader, Typography, Button, Stack, Grid, Container } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Swal from 'sweetalert2'
import NavBar from '../../components/NavBar';

const PublicacionAdmin = () => {

    const navigate = useNavigate();

    const [publicaciones, setPublicacion] = useState([])

    const getPublicacion = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/listPro`)
            setPublicacion(response.data.products)
            console.log(response.data.products)
        }catch (error){
        }
    }

    useEffect(() => {
        getPublicacion()
    }, [])

    const deleteId = async (id) => {
        try{
            Swal.fire({
                title: 'Estas seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Eliminado',
                        'Publicacion eliminada.',
                        'OK'
                    ).then( async (result) => {
                        if (result.isConfirmed) {
                            await axios.delete(`http://localhost:3001/api/deletePro/${id}`)
                            getPublicacion()
                        }
                    })
                }
            })
        }catch (error) {

        }
    }

    const showPublicaciones = () => {
        try{
            return publicaciones.map(publi => {
                return (
                    <Stack key={publi._id} direction="row" spacing={2} justifyContent="center" alignItems="center" useFlexGap flexWrap="wrap" p={2}>
                        <Card boxShadow="1" ml={30} my={4} variant="outlined" overflow="hidden" alignItems="center" spacing={{ xs: 1, sm: 2, md: 4 }} borderRadius={20}>
                        <CardHeader
                            title={<Typography variant="h6">{publi.nombre}</Typography>}
                            subheader={
                            <>
                                <Typography variant="body2">{"Costo:"}{publi.costo}</Typography>
                                <Typography variant="body2">{"Precio:"}{publi.precio_venta}</Typography>
                                <Typography variant="body2">{"Cantidad:"}{publi.stock}</Typography>
                            </>
                            }
                        />
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" useFlexGap flexWrap="wrap" p={2}>
                            <Button startIcon={<EditIcon />} color="primary" variant="contained" onClick={() => {navigate("/UpdatePubli",{state:publi})}}>Editar</Button>
                            <Button startIcon={<DeleteIcon />} color="error" variant="contained" onClick={() => deleteId(publi._id)}>Eliminar</Button>
                        </Stack>
                        </Card>
                    </Stack>
                )
            })
        }catch(err){
        }
    }

    return (
        <div>
        <Stack alignItems="center" textAlign="center">
        <Stack my={4}>
            <Link to="/CreatePubli">
            <Button
                variant="contained"
                color="primary"
                size="medium">
                Crear Publicación
            </Button>
            </Link>
        </Stack>
        <Container maxWidth="md">
            <Grid container spacing={2}>
                {showPublicaciones()}
            </Grid>
        </Container>
        </Stack>
        </div>
    )
}

export default PublicacionAdmin